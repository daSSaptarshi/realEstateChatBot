const express = require('express');
const cors = require('cors');
const router = express.Router();


router.use(cors());
router.use(function(req, res, next)
{
    // console.log("Logged");
    next();
})
router.use('/chat', require('./router/chatRouter'));
router.use('/user', require('./router/userRouter'));
router.use('/query', require('./router/queryRouter'))


module.exports = router;