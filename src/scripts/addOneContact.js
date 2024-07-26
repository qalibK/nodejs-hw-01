import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import * as fs from 'node:fs/promises';

const addContact = async () => {
  const newContact = createFakeContact();

  try {
    let data = [];

    try {
      const exData = await fs.readFile(PATH_DB, 'utf-8');
      data = exData ? JSON.parse(exData) : [];
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        console.error('Something went wrong:', readError);
        return;
      }
    }

    data.push(newContact);
    await fs.writeFile(PATH_DB, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};

addContact();
