import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const createValidation = validateBody(createContactSchema);
const updateValidation = validateBody(updateContactSchema);

// const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.post("/", createValidation, createContact);

contactsRouter.put("/:id", updateValidation, updateContact);

contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
