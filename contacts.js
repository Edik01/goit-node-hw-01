import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return data.toString();
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const allContact = await listContacts();
    const parsedAllContact = JSON.parse(allContact);
    const contact = parsedAllContact.find(({ id }) => contactId === id);
    return contact || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const removedContact = await getContactById(contactId);
    if (!removedContact) return null;
    const allContacts = await listContacts();
    const result = JSON.parse(allContacts).filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { name, email, phone, id: nanoid() };
    const allContacts = await listContacts();
    const result = [...JSON.parse(allContacts), newContact];
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

export { listContacts, getContactById, removeContact, addContact };
