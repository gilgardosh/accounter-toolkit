import { init } from '..';

const testRun = async () => {
  const app = await init('00b4e6ba7e71095891c89a35ff9ab664', 'contact@the-guild.dev');

  const data = await app.sdk.getExpenses_query({ input: {} });
  if (!data.getExpenses?.expenses) {
    throw new Error(data.getExpenses?.description);
  }
  console.log(data.getExpenses.expenses.map(e => e?.provider + ' - ' + e?.file_name));
};

testRun().catch(e => {
  console.error(e);
  process.exit(1);
});
