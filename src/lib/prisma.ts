import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

// The URL uses prisma+postgres protocol, so we must use accelerateUrl
const url = process.env.DATABASE_URL?.replace(/^"|"$/g, '');
const prisma = new PrismaClient({
    accelerateUrl: url
})

export default prisma
