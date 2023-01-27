const express = require('express');
const path = require('path');
const fs = require('fs');
const { PDFNet } = require('@pdftron/pdfnet-node');
const multer = require("multer")



const app=express();
app.get('/',(req,res)=>{
    console.log(req.query);
    res.send('<!DOCTYPE html><html><head><title>FILE UPLOAD DEMO</title></head><body><h1>Single File Upload Demo</h1><form action="/uploadProfilePicture" enctype="multipart/form-data" method="POST"><span>Upload Profile Picture:</span>  <input type="file" name="mypic" required/> <br><input type="submit" value="submit"> </form></body></html>');
});

// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
	
var storage = multer.diskStorage({
	destination: function (req, file, cb) {

		// Uploads is the Upload_folder_name
		cb(null, "files")
	},
	filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        let filename= Date.now() + ext
        cb(null,filename)
        myfunction(filename)
    	}
})
	
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function (req, file, cb){
	
		// Set the filetypes, it is optional
		// var filetypes = /xlsx|docs/;
		// var mimetype = filetypes.test(file.mimetype);

		// var extname = filetypes.test(path.extname(
		// 			file.originalname).toLowerCase());
		
		// if (mimetype && extname) {
			return cb(null, true);
		// }
	
		// cb("Error: File upload only supports the "
		// 		+ "following filetypes - " + filetypes);
	}

// mypic is the name of file attribute
}).single("mypic");	


	
app.post("/uploadProfilePicture",function (req, res, next) {
		
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the image would not be uploaded!
	upload(req,res,function(err) {

		if(err) {

			// ERROR occurred (here it can be occurred due
			// to uploading image of size greater than
			// 1MB or uploading different file type)
			res.send(err)
		}
		else {

			// SUCCESS, image successfully uploaded
			res.send("Success, file uploaded!")
		}
	})
})
	





function myfunction(filename){

 
    const inputPath = path.resolve(__dirname,'./files/',filename);
    const outputPath = path.resolve(__dirname,'./files/'+filename+'.pdf');
    console.log(outputPath)
    const main=async()=>{
        const pdfdoc=await PDFNet.PDFDoc.create();
        await pdfdoc.initSecurityHandler();
        await PDFNet.Convert.toPdf(pdfdoc,inputPath);
        pdfdoc.save(outputPath,PDFNet.SDFDoc.SaveOptions.e_linearized);
    }

    PDFNet.runWithCleanup(main, 'demo:1674645870600:7d5f62d303000000008d8b5c582d98d055928a5190ecd90d8f71389e57').catch(function(error) {
        console.log('Error: ' + JSON.stringify(error));
      }).then(function(){ PDFNet.shutdown(); });


};
app.listen(4000,()=>{
    console.log(`nodejs-convert-file-server listening at http://localhost:4000`);
});