const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const { DATABASE_URL } = require("./config")
const router = require("./routes")

// router handlers
const app = express()

// Middlewares
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: false }))


// router  middlewares
app.get("/", (req, res) => {
    res.send(`
        welcome
    `)
})


app.use("/api/resume", router)

const PORT = process.env.PORT || 8080

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then((res) => {
    console.log("MONGODB CONNECTED")
    return app.listen(PORT, () => {
        console.log(`Server listening @ http://localhost:${PORT}`);
    })

}).catch((err) => {
    console.log(`Error connecting database: ${err.message}`);
})
