const listController = require('../controllers/uploadController')

const router = require("express").Router();
const upload = listController.upload;

//router.post("/upload/images", listController.postUploadImage)
router.post("/upload/listings", upload.array('images', 5), listController.uploadListing);
router.post("/get/listings", listController.retrievePage);
router.post("/get/listing", listController.retrieveListing);
router.post("/edit/listings", listController.retrieveHostListing);

module.exports = router;