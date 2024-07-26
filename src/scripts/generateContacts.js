import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import * as fs from 'node:fs/promises';

export const generateContacts = async (number) => {
  const data = Array.from({ length: number }, createFakeContact);

  try {
    let fileData = [];

    try {
      const exData = await fs.readFile(PATH_DB, 'utf-8');
      fileData = exData ? JSON.parse(exData) : [];
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        console.error('Something went wrong:', readError);
        return;
      }
    }

    const updatedData = [...fileData, ...data];
    await fs.writeFile(PATH_DB, JSON.stringify(updatedData, null, 2));
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};

generateContacts(5);
