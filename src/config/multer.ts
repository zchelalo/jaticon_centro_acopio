import fs from 'fs/promises'
import multer from 'multer'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { v4 } from 'uuid'

export const uploadDir = join(dirname(fileURLToPath(import.meta.url)), '../../uploads')

// Usa fs.promises para una creación de directorio asincrónica
async function ensureUploadDir() {
  try {
    await fs.mkdir(uploadDir, { recursive: true })
  } catch (error) {
    console.error('Error creating upload directory:', error)
  }
}

ensureUploadDir()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${v4()}${extname(file.originalname.trim())}`
    cb(null, uniqueSuffix)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limitar el tamaño del archivo a 5 MB (ajusta según sea necesario)
  }
})

export { upload }
