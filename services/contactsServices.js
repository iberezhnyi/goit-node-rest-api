import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function getAllContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function createNewContactsList(newContactsList) {
  return fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
}

async function listContacts() {
  return await getAllContacts();
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();

  const contactById = contacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
}

async function addContact({ name, email, phone }) {
  const contacts = await getAllContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await createNewContactsList(contacts);

  return newContact;
}

async function updateContactById(contactId, data) {
  const contacts = await getAllContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...contacts[idx], ...data };

  await createNewContactsList(contacts);

  return contacts[idx];
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const deletedContact = contacts[idx];

  contacts.splice(idx, 1);

  await createNewContactsList(contacts);

  return deletedContact;
}

export default {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
