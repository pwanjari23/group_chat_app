const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const s3 = require("../config/s3");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const file = req.file;
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `chat/${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    res.status(200).json({
      url: fileUrl,
      type: file.mimetype,
    });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};
