const { Router } = require("express")

const app = Router()

app.get("/", App.Core.AuthRoute, App.Core.AdminRoute, async (req, res) => {
	try {
		const articles = await App.Services.Article.list()
		res.status(200).send(articles)
	} catch (e) {
		console.log(e)

		res.status(e.status || 500).send(e.payload)
	}
})

app.post("/", App.Core.AuthRoute, App.Core.AdminRoute, async (req, res) => {
	try {
		const article = await App.Services.User.addArticle(
			req.body,
			req.body.authorId
		)
		res.status(200).send(article)
	} catch (e) {
		console.log(e)
		res.status(e.status || 500).send(e.payload)
	}
})

app.get("/:id", App.Core.AuthRoute, App.Core.AdminRoute, async (req, res) => {
	try {
		const article = await App.Services.Article.getInfo(req.params.id)
		res.status(200).send(article)
	} catch (e) {
		res.status(e.status || 500).send(e.payload)
	}
})

app.put("/:id", App.Core.AuthRoute, App.Core.AdminRoute, async (req, res) => {
	try {
		const article = await App.Services.User.editArticle(
			req.params.id,
			req.body
		)
		res.status(200).send(article)
	} catch (e) {
		res.status(e.status || 500).send(e.payload)
	}
})

app.delete(
	"/:id",
	App.Core.AuthRoute,
	App.Core.AdminRoute,
	async (req, res) => {
		try {
			await App.Services.User.deleteArticle(req.params.id)
			res.status(200).send()
		} catch (e) {
			res.status(e.status || 500).send(e.payload)
		}
	}
)

module.exports = app
