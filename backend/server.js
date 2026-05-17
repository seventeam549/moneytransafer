const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

if(!fs.existsSync("uploads")){
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },

  filename:(req,file,cb)=>{
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({storage});

app.post("/api/transfer", upload.single("receipt"), (req,res)=>{

  const trackingCode = "TRX" + Date.now();

  res.json({
    success:true,
    trackingCode
  });

});

app.listen(3000,()=>{
  console.log("Server running on port 3000");
});
