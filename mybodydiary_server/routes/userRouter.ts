import { Request, Response } from 'express'
import { User } from '../models/user'

let express = require('express')
let router = express.Router()

router.get('/', function(req: Request, res: Response) {
  User.findAll({
    attributes: ['id', 'email']
  }).then((users) => {
    res.json(users)
  })
})

router.post('/', function(req: Request, res: Response) {
  User.create({
    id: req.body.id,
    email: req.body.email,
    password: req.body.password
  }).then((result) => {
    res.json({ 'result': 0, 'msg': 'ID가 생성되었습니다.'})
  }).catch(err => {
    console.log('console : '+ err)
    res.json({ 'result': -100, 'msg': err.name })
  }) 
})

module.exports = router