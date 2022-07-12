const { Resume } = require("../models")
const { compareHash } = require("../helpers/index")
const sendResponse = require("../helpers/response")

async function DeleteResume(res, payload) {

    if (Object.entries(payload).length === 0) {
        return sendResponse(res, 400, false, "expected a valid payload creating resume.")
    }

    const { documentId } = payload;

    if (documentId === undefined || documentId === "")
        return sendResponse(res, 400, false, "expected Resume 'documentId' but got none.")

    try {

        // before updating, check if user has permission to the document.

        let getResume = await Resume.findOne({ id: documentId });

        if (getResume === null) {
            return sendResponse(res, 404, true, "Failed to delete resume. document no longer exists.")
        }

        const { hash, locked } = getResume;

        // check if password is valid
        if (locked === true) {
            if (payload.password === "" || typeof payload.password === "undefined")
                return sendResponse(res, 400, false, "expected resume document 'password'.")
        }


        if (locked === true && compareHash(payload.password, hash) === false) {
            return sendResponse(res, 403, false, "You dont have permission to delete document. password is incorrect.")
        }

        const resultData = await Resume.findOneAndDelete({ id: documentId })

        return sendResponse(res, 200, true, "Resume document deleted successfully.", resultData)

    } catch (e) {
        sendResponse(res, 500, false, "Something went wrong while deleting resume document. ")
        console.log(e);
        throw new Error(e)
    }

}


module.exports = DeleteResume