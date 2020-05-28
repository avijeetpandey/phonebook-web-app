// defining contact schema
const mongoose=require('mongoose');

/** Schema fields Structure
 * Name (required)
 * phone number
 * email
 * DOB ( not necessary )
 */

let contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        trim:true
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique: true,
    },

});


module.exports=mongoose.model('Contact',contactSchema);
