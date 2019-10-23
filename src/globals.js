require("dotenv").config()

const { performance } = require("perf_hooks")
const { EventEmitter } = require("events")
const AWS = require("aws-sdk")
const S3 = require("aws-sdk/clients/s3")
const Bucket = "e-wine"

AWS.config.update({ region: "sa-east-1" })
const S3Client = new AWS.S3({
	apiVersion: "2006-03-01",
	accessKeyId: process.env.AWS_API_KEY_ID,
	secretAccessKey: process.env.AWS_API_KEY
})

const Storage = {
	filesDownload({ path }) {
		return new Promise((resolve, reject) =>
			S3Client.getObject(
				{
					Bucket,
					Key: path
				},
				(err, data) => {
					if (err) return reject(err)
					resolve(data)
				}
			)
		)
	},
	filesCreateFolder({ path }) {
		return new Promise((resolve, reject) =>
			S3Client.putObject(
				{
					Bucket,
					Key: path
				},
				(err, data) => {
					if (err) return reject(err)
					resolve(data)
				}
			)
		)
	},
	filesUpload({ path, contents }) {
		return new Promise((resolve, reject) =>
			S3Client.upload(
				{
					Bucket,
					Key: path,
					Body: contents
				},
				{},
				(err, data) => {
					if (err) return reject(err)
					resolve(data)
				}
			)
		)
	},
	filesDelete({ path }) {
		return new Promise((resolve, reject) =>
			S3Client.deleteObject(
				{
					Bucket,
					Key: path
				},
				(err, data) => {
					if (err) return reject(err)
					resolve(data)
				}
			)
		)
	}
}

/** @type {Array<() => Promise>} */
const operationQueue = []

const queueEventEmitter = new EventEmitter()

global.__executingOperation = false

queueEventEmitter.on("operation:enqueue", () => {
	if (global.__executingOperation) {
		return
	}
	global.__executingOperation = true
	queueEventEmitter.emit("operation:exec")
})

queueEventEmitter.on("operation:exec", () => {
	const operation = operationQueue.pop()
	if (typeof operation !== "function") {
		global.__executingOperation = false
		return
	}
	operation()
		.then(result =>
			queueEventEmitter.emit("operation:done", result, operation._t)
		)
		.catch(err =>
			queueEventEmitter.emit("operation:error", err, operation._t)
		)
})

queueEventEmitter.on("operation:done", (result, _t) => {
	queueEventEmitter.emit(`done-${_t}`, result)
	queueEventEmitter.emit("operation:exec")
})

queueEventEmitter.on("operation:error", (error, _t) => {
	queueEventEmitter.emit(`error-${_t}`, error)
	queueEventEmitter.emit("operation:exec")
})

const App = {
	get Core() {
		return require("./core")
	},
	get Models() {
		return require("./models")
	},
	get Services() {
		return require("./services")
	},
	get Storage() {
		return Storage
	},

	/**
	 *
	 * @param {() => Promise} operation
	 */
	enqueueOperation(operation) {
		return new Promise((resolve, reject) => {
			operation._t = performance.now()
			operationQueue.unshift(operation)
			function doneCb(result) {
				queueEventEmitter.off(`done-${operation._t}`, doneCb)
				queueEventEmitter.off(`error-${operation._t}`, errorCb)
				resolve(result)
			}
			function errorCb(err) {
				queueEventEmitter.off(`done-${operation._t}`, doneCb)
				queueEventEmitter.off(`error-${operation._t}`, errorCb)
				reject(err)
			}
			queueEventEmitter.on(`done-${operation._t}`, doneCb)
			queueEventEmitter.on(`error-${operation._t}`, errorCb)

			queueEventEmitter.emit("operation:enqueue")
		})
	}
}

global.App = App

module.exports = App
