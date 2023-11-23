const multer = require("multer");
const fs = require("fs");

module.exports = {
    uploader : (directory) => {
        const defaultDir = "./public";

        const storageUploader = multer.diskStorage({
            destination : (req, file, cb) => {
                const pathDir = directory ? defaultDir + directory : defaultDir;
                if (fs.existsSync(pathDir)) {
                    console.log(`Directory ${defaultDir} EXIST!!! ----->`);
                    cb(null, pathDir);
                }
                else {
                    fs.mkdir(pathDir, (err) => {
                        console.log("error create directory ----->", err);
                    });
                    return cb(err, pathDir);
                };
            },
            filename : (req, file, cb) => {
                cb(null, `${Date.now()}--${file.originalname}`);
            },
        });

        const fileFilter = (req, file, cb) => {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(new Error("Your File Extension Are Denied. Only .jpeg or .png", false));
            };
        };

        return multer({
            storage : storageUploader,
            fileFilter
        });
    },
};