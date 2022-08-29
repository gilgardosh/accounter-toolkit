import { config } from 'dotenv';

import { init } from '../';

config();

const test = async () => {
  const token = process.env.HASHAVSHEVET_MESH_AUTH_TOKEN as string;
  const key = process.env.HASHAVSHEVET_MESH_KEY as string;
  const url = process.env.HASHAVSHEVET_MESH_URL as string;
  const { sdk } = await init(token, key, url);

  // const temp = await sdk.importBankPage_mutation({
  //   input: {
  //     rows: [
  //       {
  //         AccountKey: 'עוש',
  //         Reference: 47950,
  //         CreditDebit: '_1',
  //         SuF: 198315,
  //         Details: 'העברה/הפקדה',
  //         DatF: '19/10/2020',
  //       },
  //     ],
  //   },
  // });

  // console.log(temp);

  const res = await sdk.getCompanies_query();

  console.log(JSON.stringify(res, null, 2));

  const res2 = await sdk.getBankPageRecords_query();

  console.log(JSON.stringify(res2, null, 2));
};

test();
