const { Resume } = require("../models")
const { genId, genHash, compareHash } = require("../helpers/index")
const sendResponse = require("../helpers/response")

async function UpdateResume(res, payload) {

    if (Object.entries(payload).length === 0) {
        return sendResponse(res, 400, false, "expected a valid payload creating resume.")
    }

    const { documentId, username, profileImg, jobType, phone, email, address, workExp, education, hobbies, famousQuote, locked, lockedPassword, professionalSkills, personalSkills, socials } = payload;

    const tempImg = typeof profileImg === "undefined" || profileImg === "" ? `https://avatars.dicebear.com/api/micah/${username}.svg` : profileImg;

    const tempLocked = typeof locked === "undefined" || locked === "" ? false : locked;

    const tempWorkExp = typeof workExp === "undefined" || workExp === "" ? [] : workExp;

    const tempEducation = typeof workExp === "undefined" || workExp === "" ? [] : education;

    const tempProSkill = typeof professionalSkills === "undefined" || professionalSkills === "" ? [] : professionalSkills;

    const tempPersonalSkill = personalSkills.length === 0 || Array.isArray(personalSkills) === false ? [] : personalSkills;

    const tempSocials = socials.length === 0 || Array.isArray(socials) === false ? [] : socials;

    if (documentId === undefined || documentId === "")
        return sendResponse(res, 400, false, "expected Resume 'documentId' but got none.")

    if (username === undefined || username === "")
        return sendResponse(res, 400, false, "expected Resume 'full name' but got none.")

    if (jobType === undefined || jobType === "")
        return sendResponse(res, 400, false, "expected Resume 'Job Type' but got none.")

    if (phone === undefined || phone === "")
        return sendResponse(res, 400, false, "expected Resume 'phone' but got none.")

    if (email === undefined || email === "")
        return sendResponse(res, 400, false, "expected Resume 'email address' but got none.")

    if (address === undefined || address === "")
        return sendResponse(res, 400, false, "expected Resume 'location address' but got none.")

    if (workExp === undefined || workExp === "")
        return sendResponse(res, 400, false, "expected Resume 'work experience' but got none.")

    if (education === undefined || education === "")
        return sendResponse(res, 400, false, "expected Resume 'education' but got none.")

    if (hobbies === undefined || hobbies === "")
        return sendResponse(res, 400, false, "expected Resume 'hobbies' but got none.")

    if (famousQuote === undefined || famousQuote === "")
        return sendResponse(res, 400, false, "expected Resume 'famousQuote' but got none.")

    if (tempLocked === true && lockedPassword === "")
        return sendResponse(res, 400, false, "expected Resume 'document password' but got none.")

    if (tempPersonalSkill.length === 0)
        return sendResponse(res, 400, false, "expected Resume 'personal skills' but got none.")

    if (tempProSkill.length === 0)
        return sendResponse(res, 400, false, "expected Resume 'professional skills' but got none.")

    if (tempSocials.length === 0)
        return sendResponse(res, 400, false, "expected Resume 'socials' but got none.")

    if (tempWorkExp.length === 0)
        return sendResponse(res, 400, false, "expected Resume 'work experience' but got none.")

    if (tempEducation.length === 0)
        return sendResponse(res, 400, false, "expected Resume 'education' but got none.")


    // validate work exp, education, skills, socials
    let isValidProSkill = true;
    let isValidEdu = true;
    let isValidWorkExp = true;


    tempProSkill.forEach((list) => {
        if (typeof list.name === "undefined") {
            isValidProSkill = false;
        }
    })

    tempWorkExp.forEach((list) => {
        if (typeof list.title === "undefined" || typeof list.description === "undefined" || typeof list.date === "undefined" || typeof list.location === "undefined") {
            isValidWorkExp = false;
        }
    })

    tempEducation.forEach((list) => {
        if (typeof list.title === "undefined" || typeof list.description === "undefined" || typeof list.date === "undefined") {
            isValidEdu = false;
        }
    })

    if (education.length > 0 && isValidEdu === false)
        return sendResponse(res, 400, false, "expected a valid resume 'education data'.")

    if (workExp.length > 0 && isValidWorkExp === false)
        return sendResponse(res, 400, false, "expected a valid resume 'work experience data'.")

    if (professionalSkills.length > 0 && isValidProSkill === false)
        return sendResponse(res, 400, false, "expected a valid resume 'professional skills data'.")

    try {
        const savedData = {
            fullName: username,
            profileImage: profileImg,
            jobType,
            phone,
            email,
            address,
            workExp: tempWorkExp,
            education: tempEducation,
            hobbies,
            famousQuote,
            locked: tempLocked,
            hash: tempLocked ? genHash(lockedPassword) : "",
            professionalSkills: tempProSkill,
            personalSkills: tempPersonalSkill,
            socials: tempSocials
        }

        // before updating, check if user has permission to the document.

        let getResume = await Resume.findOne({ id: documentId });

        if (getResume === null) {
            return sendResponse(res, 404, true, "Failed to update resume. resume document no longer exists.")
        }

        const { hash, locked } = getResume;

        // check if hash is valid
        if (locked === true) {
            if (payload.password === "" || typeof payload.password === "undefined")
                return sendResponse(res, 400, false, "expected resume document 'password'.")
        }

        if (locked === true && compareHash(payload.password, hash) === false) {
            return sendResponse(res, 401, false, "You dont have permission to update document. password is incorrect.")
        }

        const saveResume = await Resume.findOneAndUpdate({ id: documentId }, savedData)

        return sendResponse(res, 200, true, "Resume document updated successfully.", saveResume)

    } catch (e) {
        sendResponse(res, 500, false, "Something went wrong while updating resume document. ")
        console.log(e);
        throw new Error(e)
    }

}


module.exports = UpdateResume