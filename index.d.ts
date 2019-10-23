import AppContainer from "./src/globals"
import { Model } from "@types/sequelize"

import User from "./src/models/User"

import Category from "./src/models/Category"
import Config from "./src/models/Config"
import Client from "./src/models/Client"
import Product from "./src/models/Product"

import { AxiosInstance } from "axios"

declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			PORT: string
			DROPBOX_TOKEN: string
			DROPBOX_TEST_TOKEN: string
			AWS_API_KEY_ID: string
			AWS_API_KEY: string
		}
	}

	type AppModels = typeof import("./src/models") & {
		user: Model<any, any, typeof User.types>

		plan: Model<any, any, typeof Plan.types>
		category: Model<any, any, typeof Category.types>
		config: Model<any, any, typeof Config.types>
		client: Model<any, any, typeof Client.types>
		product: Model<any, any, typeof Product.types>
	}

	let App: typeof AppContainer & {
		Models: AppModels
	}

	let api: AxiosInstance
	let withToken: (token: string) => AxiosInstance

	namespace Types {
		export interface Client extends ClientInfo {
			name: string

			email: string
			thumbnail: string
		}

		export interface PartnerInfo {
			document: Document
			occupation: string

			address: string
			cep: string
			city: string
			country: string
			phone_first: string
			phone_second: string
		}

		export interface Document {
			type: "CPF" | "CNPJ"
			number: string
		}
	}
}
