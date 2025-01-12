const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const upload = require("../upload");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../utils/s3");

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    // const command = new PutObjectCommand({
    //   Bucket: process.env.BUCKET_NAME,
    //   Key: req.file.originalname.replace(/\s/g, ""),
    //   Body: req.file.buffer,
    //   ContentType: req.file.mimetype
    // });

    // await s3.send(command);

    if (process.env.ENABLE_CLOUD === "false") {
      const img = new Image({
        name: req.file.originalname.replace(/\s/g, "")
      });

      const savedImg = await img.save();

      const image = {
        ...savedImg.toObject(),
        url: `${req.protocol}://${req.get("host")}/images/${savedImg.name}`
      };

      console.log({ image });

      res.status(201).send({ success: true, result: image });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/images", async (req, res, next) => {
  try {
    const images = await Image.find({}).sort({ createdAt: -1 }).lean();

    // for (const image of images) {
    //   const getObjectParams = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: image.name
    //   };
    //   const command = new GetObjectCommand(getObjectParams);
    //   const url = await getSignedUrl(s3, command, { expiresIn: 60 });
    //   image.imageUrl = url;
    // }

    for (const image of images) {
      image.url = `${req.protocol}://${req.get("host")}/images/${image.name}`;
    }

    res.send(images);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "INternal Server Error" });
  }
});

module.exports = router;
