const express = require("express");
const router = express.Router();
const { download, saveForm, getAllForm, regenerate, getAllFormEmployee } = require("../controllers/user");
const { saveFormValidator } = require("../middleware/validator");
const { protect } = require("../middleware/auth");

router.route("/download-ppt/:form_id").post(protect, download);
router.route("/get-all-form").post(protect, getAllForm);
router.route("/save-form").post(protect, saveFormValidator, saveForm);
router.route("/regenerate").get(regenerate);

router.route("/get-all-form-employee").post(protect, getAllFormEmployee);

module.exports = router;
