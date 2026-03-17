import cloudinary from "../config/cloudinary.js";

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
};

export default uploadImage;
