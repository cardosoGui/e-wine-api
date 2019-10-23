const fs = require("fs")
const { promisify } = require("util")
const readFile = promisify(fs.readFile.bind(fs))

/**
 * @param {*} videoInfo
 * @param {File} fileDescriptor
 * @param {File} thumbnailDescriptor
 * @param { "ADMIN" | "PARTNER" } mode
 * @param {object} opts
 */
module.exports = async function addVideo(
	{
		filename,
		description,
		title,
		categories = "",
		publication_date,
		sub_category_ids,
		key_word_ids,
		premium,
		partnerId,
		audio
	},
	fileDescriptor,
	thumbnailDescriptor,
	mode = "ADMIN",
	opts
) {
	const ext = filename.split(".").pop()

	let resolvedFileName = ""
	let resolvedThumbName = ""

	try {
		;[resolvedFileName] = fileDescriptor.path.match(/[^\\\/:*?\"<>|]+$/)
		if (!resolvedFileName) throw new Error()
	} catch (e) {
		const err = new Error()
		err.status = 400
		err.payload = { message: "Nome do vídeo inválido." }
	}

	try {
		;[resolvedThumbName] = thumbnailDescriptor.path.match(
			/[^\\\/:*?\"<>|]+$/
		)
		if (!resolvedThumbName) throw new Error()
	} catch (e) {
		const err = new Error()
		err.status = 400
		err.payload = { message: "Nome da miniatura inválido." }
	}

	categories = categories
		.split(",")
		.map(Number)
		.filter(Boolean)

	const video = await App.Models.video.create({
		filename: resolvedFileName,
		thumbnail: resolvedThumbName,
		description,
		premium,
		audio,
		publication_date,
		sub_category_ids,
		key_word_ids,
		title,
		ext
	})

	await video.setCategories(categories)

	// partnerId = parseInt(partnerId) || null

	if (partnerId) {
		App.Models.partner.findByPk(partnerId).then(partner => {
			if (partner) {
				video.setPartner(partner)
			}
		})
	}

	const contents = await readFile(fileDescriptor.path)
	const thumb_contents = await readFile(thumbnailDescriptor.path)

	await App.enqueueOperation(async () => {
		await Promise.all([
			App.Storage.filesUpload({
				path: `videos/${resolvedFileName}`,
				contents
			})
				.then(res => console.log(res))
				.catch(e => console.log({ e })),
			App.Storage.filesUpload({
				path: `thumbnails/${resolvedThumbName}`,
				contents: thumb_contents
			}).catch(e => console.log({ e }))
		])
	})

	video.dataValues.categories = categories

	return video
}
