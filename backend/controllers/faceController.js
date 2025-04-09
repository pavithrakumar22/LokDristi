// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const { v4: uuidv4 } = require('uuid');
// const FaceCapture = require('../models/FaceCapture');
// const s3 = require('../config/s3');

// exports.uploadFace = async (req, res) => {
//   try {
//     const { voterId, image } = req.body;
//     const base64Data = Buffer.from(image.split(',')[1], 'base64');
//     const fileName = `${uuidv4()}.jpg`;

//     const uploadParams = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `faces/${fileName}`,
//       Body: base64Data,
//       ContentEncoding: 'base64',
//       ContentType: 'image/jpeg',
//     };

//     await s3.send(new PutObjectCommand(uploadParams));

//     const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/faces/${fileName}`;

//     const faceDoc = await FaceCapture.findOneAndUpdate(
//       { voterId },
//       { imageUrl },
//       { upsert: true, new: true }
//     );

//     res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to upload image' });
//   }
// };



import Face from '../models/Face.js';

export const uploadFace = async (req, res) => {
  try {
    const { voterId } = req.body;

    if (!voterId || !req.file || !req.file.location) {
      return res.status(400).json({ message: 'Missing voterId or image' });
    }

    const newFace = new Face({
      voterId,
      imageUrl: req.file.location,
    });

    await newFace.save();

    res.status(201).json({ message: 'Face uploaded successfully', data: newFace });
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
