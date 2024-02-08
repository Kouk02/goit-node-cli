const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

async function invokeAction() {
  const options = program.opts();
  const action = options.action;
  
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case 'get':
      const contact = await getContactById(options.id);
      console.log(contact);
      break;
    case 'add':
      const newContact = await addContact(options.name, options.email, options.phone);
      console.log(newContact);
      break;
    case 'remove':
      const removedContact = await removeContact(options.id);
      console.log(removedContact);
      break;
    default:
      console.warn('\x1b[31m', 'Unknown action type!');
  }
}

invokeAction();
