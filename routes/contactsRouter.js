import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { isValidId } from "../helpers/isValidId.js";

const createValidation = validateBody(createContactSchema);
const updateValidation = validateBody(updateContactSchema);
const updateFavoriteValidation = validateBody(updateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.post("/", createValidation, createContact);

contactsRouter.put("/:id", isValidId, updateValidation, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  updateFavoriteValidation,
  updateStatusContact
);

contactsRouter.delete("/:id", deleteContact);

export default contactsRouter;
