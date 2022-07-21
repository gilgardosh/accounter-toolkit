import { config } from 'dotenv';
import fs from 'fs';
import { lookup } from 'mime-types';

import { init } from '../src';

config();

const base64Encode = (path: string) => {
  return fs.readFileSync(path, 'base64');
};

const getBase64Prefix = (path: string) => {
  const mimeType = lookup(path);
  return mimeType ? `data:${lookup(path)};base64,` : '';
};

const testRun = async () => {
  const id = process.env.GREEN_INVOICE_ID as string;
  const secret = process.env.GREEN_INVOICE_SECRET as string;
  const app = await init(id, secret);

  /* add draft file */
  const path = './dev-tests/assets/dummy_receipt4.jpeg';

  const file = `${getBase64Prefix(path)}${base64Encode(path)}`;

  const data = await app.sdk.addExpenseDraftByFile_mutation({ input: { file } });
  if (!data.addExpenseDraftByFile) {
    throw new Error('no response data');
  }
  console.log(JSON.stringify(data));

  /* get expense by id */
  const data2 = await app.sdk.getExpense_query({ id: 'dbfb61b2-579c-42d0-b1ba-a3637e20eb6c' });
  console.log(data2);

  /* search drafts */
  const data3 = await app.sdk.searchExpenseDrafts_query({
    input: {
      fromDate: '1900-01-01',
      toDate: '2022-01-01',
      pageSize: 10,
    },
  });
  console.log(JSON.stringify(data3));
};

testRun().catch((e) => {
  console.error(e);
  process.exit(1);
});
