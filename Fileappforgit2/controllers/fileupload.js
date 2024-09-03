const cloudinary= require("cloudinary").v2; 

exports.localFileUpload= async (req, res)=>{
    try{
        const file= req.files.file; 
        console.log("file agyi jee->", file);


        let path= __dirname+ "/files/"+ Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->", path);
        file.mv(path, (err)=>{
            console.log(err);
        });
        res.json({
            success:true, 
            message:'local file uploaded successfully',
        });
    }
    catch (error){
        console.log("not able to upload the file on server");
        console.log(error);
    }
}

function isFileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}
async function uploadFileToCloudinary(file, folder, quality){
    // IDK KNOW HOW IS THIS WHY IS THIS KAL DEKHNA H 
}

exports.imageUpload= async(req, res)=>{
    try{
        const {name, tags, email}= req.body; 
        console.log(name, tags, email);

        const imageFile= req.files.imageFile; 
        console.log(imageFile);

        const supportedTypes= ["png", "jpg", "jpeg"];
        const fileType= imageFile.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false, 
                message: "file type not supported"
            })
        }
        const response= await uploadFileToCloudinary(imageFile, "FileApp");
        console.log(response);

        const fileData= await File.create({
            name, 
            tags, 
            email, 
            fileUrl: response.secure_url
        })
    }

    catch(err){
        console.log(error);
        res.status(400).json({
            success: false, 
            message: "something went wrong"
        })
    }
}

exports.videoUpload= async (req, res)=>{
    try{
        const {name, tags, email}= req.body; 
        console.log(name, tags, email);

        const videoFile= req.files.videoFile; 

        const supportedTypes= ["mp4", "mov"];
        const fileType= videoFile.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                success:false, 
                message: "file type not supported"
            })
        }

        const response= await uploadFileToCloudinary(videoFile, "FileApp");

        const vidFile= new File({
            name, 
            tags, 
            email,
            fileUrl: response.secure_url
        })

        const file = await vidFile.save(); 
        res.status(200).json({
            success:true, 
            message: "video file uploaded successfully",
            file: file
        })
    }
    catch(err){
        console.error(err); 
        res.status(400).json({
            success:false, 
            message: "something went wrong"
        })
    }
}

exports.imageReducer= async (req, res)=>{
    try{
        const {name, tags, email}= req.body; 
        console.log(name,tags, email); 
        const imageFile= req.files.imageFile; 
        console.log(imageFile); 

        const supportedTypes= ["png", "jpg", "jpeg"];
        const fileType= imageFile.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false, 
                message: "file type not supported"
            })
        }

        const response= await uploadFileToCloudinary(imageFile, "Fileapp", 50); 
        console.log(response); 

        const fileData= await File.create({
            name, 
            tags, 
            email, 
            fileUrl: response.secure_url
        })

        res.status(200).json({
            success:true, 
            message: "file uploaded successfully", 
            file: fileData
        })
    }
    catch (error){
        console.log(error); 
        res.status(400).json({
            success:false,
            message: "something went wrong"
        })
    }
}