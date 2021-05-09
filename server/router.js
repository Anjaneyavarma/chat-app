const express = require('express');
const router = express.Router();
const {addUser} = require('./users');

router.get('/', (req,res)=>{
    res.send('hello world');
    res.send(users)
})

module.exports = router;