const express=require('express');
const router=express.Router();

const {
    createContact,
    getAllContacts,
    updateContact,
    deleteContact,
    getContactByName
} = require("../controllers/contact");


// extracting required parameteres from the url
router.param("contactName",getContactByName);

/** routes **/
// create contact
router.post("/contacts/",createContact);

// read contacts
router.get("/contacts/",getAllContacts);

// update contacts
router.put("/contacts/update/:name",updateContact);

// delete contacts
router.post("/contacts/delete/:name",deleteContact);

module.exports = router;
