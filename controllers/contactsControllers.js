import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  try {
    const result = await contactsService.listContacts();

    console.table(result);

    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.id);

    if (!result) {
      throw HttpError(404);
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

// console.log("\x1B[33m req.method ---> \x1b[0m ", req.method);
// console.log("\x1B[33m req.url ---> \x1b[0m ", req.url);
// console.log("\x1B[33m req.params ---> \x1b[0m ", req.params);
// console.log("\x1B[33m req.body ---> \x1b[0m ", req.body);
