import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {auth} from './auth/auth.js'
import userRouter from './routers/user.route.js'
import productRouter from './routers/product.route.js'

//calling express and storing in variable
const app = express()


//port number
const PORT = process.env.PORT || 4000



// connecting to database (mongodb)
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)
await client.connect()



//using cors to send a respone to front end
app.use(cors())

// using expeess.json to convert a datas to json 
app.use(express.json())

// hashing a password
async function genHashedPassword (password){
    const NO_OF_ROUND = 10
    const salt = await bcrypt.genSalt(NO_OF_ROUND)
    const hashed_password =await bcrypt.hash(password,salt)
    return hashed_password
    }

//connecting with product.router file
app.use('/product',productRouter)

//connecting with user.router file
app.use('/user',userRouter)

//starting app with port number
app.listen(PORT)

export {client,jwt,auth,genHashedPassword,bcrypt}