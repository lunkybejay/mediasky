export default async function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  const { imageUrl } = req.body
  if (!process.env.CLOUDINARY_URL) return res.status(500).json({ message: 'Cloudinary not configured' })
  const cloudinary = require('cloudinary').v2
  cloudinary.config({ url: process.env.CLOUDINARY_URL })

  try{
    // Accept either a URL (remote fetch) or base64 data (not implemented here)
    const result = await cloudinary.uploader.upload(imageUrl, { folder: 'mediasky/products' })
    return res.status(200).json({ url: result.secure_url })
  }catch(e){
    console.error(e)
    return res.status(500).json({ message: 'Upload failed' })
  }
}
