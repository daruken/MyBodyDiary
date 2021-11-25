import { User } from '../models/user'

let bcrypt = require('bcrypt')
let express = require('express')
let router = express.Router()

router.post('/', async function (req: any, res: any, next: any) {
  let body = req.body
  if (!body.id) {
    res.json({ 'result': -200, 'msg': 'Not exist login id.' })
  }

  const user = await User.findOne({
    where: {
      id: body.id
    }
  }).then((user: any) => {
    if (user === null) {
      res.json({ 'result': -201, 'msg': '존재하지 않는 ID 입니다.'})
    }

    const dbPassword = user.password
    if (bcrypt.compareSync(body.password, dbPassword)) {
      res.json({ 'result': 0, 'msg': 'Login success.'})
    }
    else {
      res.json({ 'result': -202, 'msg': '비밀번호가 일치하지 않습니다.'})
    }
  }).catch((err: any) => {
    res.json({ 'result': -200, 'msg': err})
  })
})

module.exports = router