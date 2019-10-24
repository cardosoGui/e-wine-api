const fs = require('fs')
const path = require('path')
const formidableMiddleware = require('express-formidable')

const uploadDir = path.join(__dirname, '..', '..', 'storage')
try {
	try {
		fs.mkdirSync(uploadDir)
	} catch (e) {}
	App.enqueueOperation(() => App.Storage.filesCreateFolder({ path: '/images' })).catch(() => void 0)

	App.enqueueOperation(() => App.Storage.filesCreateFolder({ path: '/avatars' })).catch(() => void 0)
} catch (e) {}

const FormDataRoute = formidableMiddleware({ uploadDir })

module.exports = FormDataRoute
