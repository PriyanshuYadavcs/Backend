const mongoose= require("mongoose"); 
const nodemailer= require("nodemailer"); 

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }, 
    fileUrl:{
        type:String,
    }, 
    tags: {
        type:String, 
    }, 
    email:{ 
        type: String, 
    }
});

require("dotenv").config(); 

fileSchema.post("save", async function (doc) {
    try{
        console.log("DOC: ", doc); 
        const transporter= nodemailer.createTransport({
            host : process.env.MAIL_HOST, 
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS, 
            }
        })
        const info= await transporter.sendMail({
            from: 'FROM PRIYANSH', 
            to: doc.email, 
            subject: "NEW FILE UPLOADED TO CLOUDINARY", 
            html: `<h2>File Uploaded </h2> <br> view now- <a href= "${doc.fileUrl}">Click here </a>`
        })

        console.log("info: ", info); 
    }
    catch(error){
        console.log(error); 
    }

})

const File= mongoose.model("File", fileSchema); 
module.exports= File; 