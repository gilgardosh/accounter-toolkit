/* eslint-disable @typescript-eslint/no-explicit-any */
// import type {
//   getAccountsResponse,
//   queryInput_getAccounts_input_Input,
// } from '../mesh-artifacts/index.js';
import { accountsDataFile } from './data-files.js';

const handleAccountsParameters = (args: any = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'txt',
      name: 'id',
      defVal: `"${args.idMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'txt',
      name: 'id1',
      defVal: `"${args.idMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'txt',
      name: 'isActive',
      defVal: `"${args.isActiveMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'isActive1',
      defVal: `"${args.isActiveMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'txt',
      name: 'name',
      defVal: `"${args.nameMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'txt',
      name: 'name1',
      defVal: `"${args.nameMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];

  return parametersArray;
};

// eslint-disable-next-line import/no-default-export
export default function (next) {
  return (root, args, context, info) => {
    const parameters = handleAccountsParameters(args.input);
    args.input = {
      parameters,
      datafile: accountsDataFile,
    };
    return next(root, args, context, info).then((data: any) => {
      if (data.repdata?.length && !data.repdata?.[0].id) {
        return null;
      }
      return data;
    });
  };
}
