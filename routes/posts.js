const router = require('express').Router();
const verify = require('../service/verifyToken');

//Private route only user with customer role can access.
router.get('/read_post', verify, (req, res) => {
    res.send('Read Post Api Response!');
})

//Private route only user with admin role can access.
router.get('/write_post', verify, (req, res) => {
    res.send('Write Post Api Response!');
})

module.exports = router;