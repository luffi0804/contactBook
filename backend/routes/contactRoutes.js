import express from "express";
import contactController from "../controllers/contactController.js"
import contactValidate from "../middlewares/contactValidate.js";

const router = express.Router();

const validateInfo = contactValidate.validateInfo;
const deleteCon = contactValidate.deleteContact;
const validateCon = contactValidate.validateContact;
const validateFull = contactValidate.contactFull;


router.post("/registerContact", validateInfo, validateFull, validateCon, contactController.registerContact);
router.get("/listContact", contactController.listContact);
router.get("/listContact/:name?", contactController.listContact);
router.delete("/deleteContact/:name?", deleteCon, contactController.deleteContact);
router.get("/existingContact", contactController.existingContact);
router.get("/fullContact", contactController.directoryFull);
router.put("/updateContact", validateInfo, contactController.updateContact);

export default router;