import { User } from '../models/user'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const jwtSecret = 'mybodydiarysecret'

router.get('/', async function (req: Request, res: Response){
  const userToken = req.query.token

  jwt.verify(<string>userToken, jwtSecret, (err: any, encode: any) => {
    if (err) {
      res.json({ 'result': -300, 'msg': err })
    } else {
      res.json({ 'result': 0, 'msg': 'Auth success. encode : ' + encode })
    }
  })
})

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
  let body = req.body
  if (!body.id) {
    res.json({ 'result': -200, 'msg': 'Not exist login id.' })
  }

  const user = await User.findOne({
    where: {
      id: body.id
    }
  }).then((user) => {
    if (user === null) {
      res.json({ 'result': -201, 'msg': '존재하지 않는 ID 입니다.'})
      return
    }

    const dbPassword = user.password
    if (bcrypt.compareSync(body.password, dbPassword)) {
      const jwtToken = jwt.sign({id: body.id}, jwtSecret,{
        expiresIn : 60 * 60
      })

      res.json({ 'result': 0, 'msg': 'Login success.', 'token': jwtToken})
    }
    else {
      res.json({ 'result': -202, 'msg': '비밀번호가 일치하지 않습니다.'})
    }
  }).catch((err) => {
    res.json({ 'result': -200, 'msg': err})
  })
})

module.exports = router