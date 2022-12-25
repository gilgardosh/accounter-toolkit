/* eslint-disable @typescript-eslint/no-explicit-any */
// import type {
//   getBankPageRecordsResponse,
//   queryInput_getBankPageRecords_input_Input,
// } from '../mesh-artifacts/index.js';
import { bankPageRecordsDataFile } from './data-files/index.js';

const handleBankPageRecordsParameters = (args: any = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'long',
      name: 'id',
      defVal: args.idMin || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'long',
      name: 'id1',
      defVal: args.idMax || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'long',
      name: 'bankPageId',
      defVal: args.bankPageIdMin || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'long',
      name: 'bankPageId1',
      defVal: args.bankPageIdMax || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'date',
      name: 'date',
      defVal: `"${args.dateMin || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'date',
      name: 'date1',
      defVal: `"${args.dateMax || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return parametersArray;
};

// eslint-disable-next-line import/no-default-export
export default function (next) {
  return (root, args, context, info) => {
    const parameters = handleBankPageRecordsParameters(args.input);
    args.input = {
      parameters,
      datafile: bankPageRecordsDataFile,
    };
    return next(root, args, context, info).then((data: any) => {
      if (data.status?.repdata?.length && !data.status.repdata[0].id) {
        return null;
      }
      return data;
    });
  };
}
