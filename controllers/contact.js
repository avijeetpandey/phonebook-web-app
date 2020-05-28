const Contact=require("../models/contact"); // Contact Schema

exports.getContactByName=(req,res,next,name)=>{
    Contact.findOne({name:name}).exec((err,contact)=>{
        if(err || !contact){
            return res.status(401).json({
                error:"Name not found"
            });
        }
        req.name=name;
        next();
    });
};

// Function to handle creation of a contact
exports.createContact=(req,res)=>{
    const contact = new Contact(req.body);
    contact.save((err,contact)=>{
        if ( err || !contact){
            return res.status(401).json({
                error : "Contact can't be created ",
            });
        }
        res.redirect('/');
    });
};

// function to get one specific contact
exports.getContact=(req,res)=>{
    return req.json(req.contact);
};

// function to get all the contacts
exports.getAllContacts=(req,res)=>{
    Contact.find().exec((err,contacts) => {
        if(err || !contacts){
            return res.status(401).json({
                error : "contacts not found "
            });
        }
        res.render('home',{contacts:contacts});
    });
};

//functio to delete the contact
exports.deleteContact=(req,res)=>{
    const q=req.name;
    Contact.findOneAndRemove(q,(err,removedContact)=>{
        if(err || !removedContact){
            return res.status(400).json({
                error : 'Unable to delete'
            });
        }
        res.redirect('/');
    });
};

//function to update the contact
exports.updateContact=(req,res)=>{
    const contact=req.contact;
    contact.name=req.body.name;
    contact.save((err,updatedContact)=>{
        if(err || !updatedContact){
            return res.status(400).json({
                error : 'Cant Update'
            });
        }
        return res.json(updatedContact);
    });
};
