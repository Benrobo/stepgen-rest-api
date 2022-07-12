
const express = require("express")
const router = express.Router()
const CreateResume = require("../controller/createResume.controller")
const UpdateResume = require("../controller/updateResume.controller")
const DeleteResume = require("../controller/deleteResume.controller")
const GetResume = require("../controller/getResume.controller")


// get all resume
router.get("/documents", (req, res) => {
    return GetResume(res)
})

// create resume
router.post("/create", (req, res) => {
    const body = req.body;
    return CreateResume(res, body)
})

// update resume
router.put("/update", (req, res) => {
    const body = req.body;
    return UpdateResume(res, body)
})

// delete resume

router.delete("/delete", (req, res) => {
    const body = req.body;
    return DeleteResume(res, body)
})


module.exports = router

