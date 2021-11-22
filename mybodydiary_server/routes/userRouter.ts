import { User } from '../models/user'

let express = require('express')
let router = express.Router()

/* GET users listing. */
router.get('/', function(req: any, res: any) {
  User.findAll({
    attributes: ['id', 'email']
  }).then((users) => {
    res.json(users)
  })
})

module.exports = router
