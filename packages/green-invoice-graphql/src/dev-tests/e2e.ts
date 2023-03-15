import { config } from 'dotenv';
import { init } from '../index.js';

config({ path: `../../.env` });

const testRun = async () => {
  const id = process.env['GREEN_INVOICE_ID'] as string;
  const secret = process.env['GREEN_INVOICE_SECRET'] as string;
  const app = await init(id, secret);

  /* search drafts */
  const data = await app.sdk.searchExpenses_query();
  if (!data.searchExpenses) {
    throw new Error('no response data');
  }
  console.log(`Successfully searched, found ${data.searchExpenses.total} expensesJSON.`);
};

testRun().catch(e => {
  console.error(e);
  process.exit(1);
});
