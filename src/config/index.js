const dotenv = require("dotenv")

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    DATABASE_URL,
    JWT_SECRET
}