import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

export const countContacts = async () => {
  try {
    const exData = await fs.readFile(PATH_DB, 'utf-8');
    const data = exData ? JSON.parse(exData) : [];
    return data.length;
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};

console.log(await countContacts());
