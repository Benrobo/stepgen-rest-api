const { Resume } = require("../models")
const sendResponse = require("../helpers/response")

async function GetResume(res) {
    try {
        const resultData = await Resume.find()

        return sendResponse(res, 200, true, "Resume document fetched successfully.", resultData)

    } catch (e) {
        sendResponse(res, 500, false, "Something went wrong while fetching resume document. ")
        console.log(e);
        throw new Error(e)
    }

}


module.exports = GetResume