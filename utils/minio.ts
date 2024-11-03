import * as Minio from 'minio'
import { getEnv } from './env'
import { getFileExtension } from './file'

const BUCKET_NAME = 'snapplace' as const

const minioClient = new Minio.Client({
  endPoint: getEnv('MINIO_URL'),
  useSSL: true,
  accessKey: getEnv('MINIO_ACCESS_KEY'),
  secretKey: getEnv('MINIO_SECRET_KEY'),
})

export async function uploadFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer())
  const extension = getFileExtension(file)

  await minioClient.putObject(BUCKET_NAME, `${file.name}.${extension}`, buffer, file.size)

  return `https://${getEnv('MINIO_URL')}/${BUCKET_NAME}/${file.name}.${extension}`
}
