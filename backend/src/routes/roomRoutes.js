const express = require("express");
const roomControler = require('../controllers/roomControler')

const router = express.Router()
//Dinh nghia cac router
router.get('/', roomControler.getRoom)
router.post('/createRoom', roomControler.createRoom)
router.post("/edit/:maphong", roomControler.editRoom)
router.delete('/delete/:maphong', roomControler.deleteRoom)

router.get('/typeRoom', roomControler.getTypeRoom)

module.exports = router;