import { Router } from "express";
import { createContact } from "../controller/contact.js";

const router = Router();

router.post("/", createContact);

export default router;