import { program } from "commander";
import { listContacts, getContactById, removeContact, addContact } from "./contacts.js";

program
  .option("-a, --action <type>", "виберіть дію")
  .option("-i, --id <type>", "ідентифікатор користувача")
  .option("-n, --name <type>", "ім'я користувача")
  .option("-e, --email <type>", "електронна адреса користувача")
  .option("-p, --phone <type>", "телефон користувача");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      console.log(await addContact(name, email, phone));
      break;

    case "remove":
      console.log(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Невідомий тип дії!");
  }
}

invokeAction(options);
