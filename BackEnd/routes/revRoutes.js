const revController = require('../controllers/revControllers')

const router = require("express").Router();

router.post("/upload/reservation", revController.uploadReservation);
router.post("/allReservations", revController.retrieveReservations);
//router.post("/reservation", revController.retrieveOneReservation);

// Use for confirming / declining 
router.post("/edit/reservation", revController.editReservation);

module.exports = router;