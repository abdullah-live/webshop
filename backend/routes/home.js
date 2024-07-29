const express = require("express")
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Halllo Server is Running")
})

module.exports = router;
