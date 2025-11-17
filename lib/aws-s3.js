// lib/aws-s3.js
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

export const uploadToS3 = async (file, folder = 'images') => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${folder}/${Date.now()}-${file.name}`,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    ACL: 'public-read'
  }

  try {
    const result = await s3.upload(params).promise()
    return result.Location
  } catch (error) {
    console.error('S3 upload error:', error)
    throw error
  }
}

export const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key
  }

  try {
    await s3.deleteObject(params).promise()
  } catch (error) {
    console.error('S3 delete error:', error)
    throw error
  }
}