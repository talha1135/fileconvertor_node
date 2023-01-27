const https = require("https");
const fs = require("fs");
this.ping= function(latest){
// URL of the image
const url = latest.webViewLink;

https.get(url, (res) => {
   const path = "./files/"+latest.name;
   const writeStream = fs.createWriteStream(path);

   res.pipe(writeStream);

   writeStream.on("finish", () => {
      writeStream.close();
      var filedownload = require("./index.js");
      output = filedownload.myfunction(latest.name);
   })
})
}