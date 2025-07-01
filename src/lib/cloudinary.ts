import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export const uploadToCloudinary = async (
  buffer: Buffer,
  filename: string,
  folder: string
) => {
  const base64 = buffer.toString('base64')
  const dataURI = `data:image/jpeg;base64,${base64}`

  return await cloudinary.uploader.upload(dataURI, {
    folder,
    public_id: filename,
    resource_type: 'image',
  })
}
