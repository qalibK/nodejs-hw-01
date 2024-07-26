import { PATH_DB } from '../constants/contacts.js';
import * as fs from 'node:fs/promises';

export const removeLastContact = async () => {
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

    if (data.length > 0) {
      data.pop();
      await fs.writeFile(PATH_DB, JSON.stringify(data, null, 2));
      console.log('Last contact removed.');
    } else {
      console.log('There are no contacts to remove.');
    }
  } catch (error) {
    console.error('Something went wrong:', error);
  }
};

removeLastContact();
