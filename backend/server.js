const express = require("express");
const fileUpload = require("express-fileupload")
const { appendFile, fstat } = require("fs");
const path = require("path");
const app = express(); 

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());

app.get("/", getFunction);
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));
app.use("/public", express.static(`${__dirname}/../frontend/public`));

const uploads = path.join(`${__dirname}/../frontend/upload`)

app.post("/", (req, res) => {
    
    const picture = req.files.picture;
    const answer = {}

    if(picture){
       
        picture.mv(`${uploads}${picture.name}`);
    }

    answer.pictureName = picture.name

    res.send(answer)

   /*  const formData = req.body
    formData.image_name = picture.name
    jsonData.push(formData)

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if(error){
            console.log(error)
        }
    }) */
})

const port = 9000;
const ipAddress = `http://127.0.0.1:9000`;
app.listen(port, () => {
    console.log(ipAddress)
});
