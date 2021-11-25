import * as dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { sequelize } from './models'
import express = require('express')
import cors = require('cors')

dotenv.config()

const PORT:number = parseInt(process.env.PORT as string, 10) || 8080
const HOST:string = process.env.HOST || 'localhost'
const app = express()

app.use(cors())
app.use(express.json());
app.use((req:Request,res:Response,next:NextFunction) => {
  console.log(`Request Occur! ${req.method}, ${req.url}`)
  next()
})

const models = require('./models/index')
models.sequelize.sync().then(() => {
  console.log('DB schema sync.')
}).catch((err: string) => {
  console.log(err)
})

const userRouter = require('./routes/userRouter')
app.use('/api/users', userRouter)

const loginRouter = require('./routes/loginRouter')
app.use('/api/login', loginRouter)

app.listen(PORT,HOST,async () => {
  console.log(`Server Listening on ${HOST}:${PORT}`);

  await sequelize.authenticate().then(async () => {
    console.log("DB connection success")
  }).catch((e) => {
    console.log('Exception : ', e)
  })
})