module.exports = async function deleteVideo(id) {
	const video = await App.Models.video.findByPk(id)
	await App.Models.video.destroy({ where: { id } })

	await App.enqueueOperation(() =>
		App.Storage.filesDelete({
			path: `videos/${video.dataValues.filename}`
		})
	)
	await App.enqueueOperation(() =>
		App.Storage.filesDelete({
			path: `thumbnails/${video.dataValues.thumbnail}`
		})
	)
}
