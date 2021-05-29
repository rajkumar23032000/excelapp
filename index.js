require("dotenv").config();
const express = require("express");
const excelToJson = require('convert-excel-to-json');
const multer = require("multer");
var upload = multer({ dest: 'uploads/' });
const cors = require("cors");

const path = require("path");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

app.post('/home', upload.single('excel'), function (req, res, next) {
    const file = req.file;
    //res.send(file["path"]);
    const result = excelToJson({
        sourceFile: file["path"],
        header: {
            rows: 1
        },
        columnToKey: {
            A: 'Question',
            B: 'Answer'
        },
        sheets: ['Sheet1']
    });

    if (!result) {
        return res.status(400).json({
            error: "Could not convert the uploaded file"
        })
    }
    else {
        result1 = result["Sheet1"];
        //console.log(result1);
        res.send(result1);

    }

})

const port = process.env.PORT || 8000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(port, () => {
    console.log(`App running in port ${port}`);
});


