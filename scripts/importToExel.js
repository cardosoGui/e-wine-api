process.env.NODE_ENV = 'production'

require('../src')

/** @type {import('../src/models/Partner').types} */
let partner_types

const path = require("path")

const XLSX = require("xlsx")

const filePath = path.join(__dirname, "partners.xlsx")

const workbook = XLSX.readFile(filePath)

const to_json = function to_json(workbook) {
	const result = {}

	workbook.SheetNames.forEach(function(sheetName) {
		const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
			header: 1
		})

		rows.forEach(row => {
			const [ _, agenda, specialist, name, soc, artisticName, photo, cpf, cnpj ] = row
			console.log({ agenda, specialist, name, soc, artisticName, photo })
		})

		App.Models.partner.create({ name, email, info: JSON.stringify({}) })
	})

	return JSON.stringify(result, 2, 4)
}

to_json(workbook)
