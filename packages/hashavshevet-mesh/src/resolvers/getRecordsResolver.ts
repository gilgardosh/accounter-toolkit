/* eslint-disable camelcase */
import { getRecordsResponse, queryInput_getRecords_Input } from '../../.mesh';
import { recordsDataFile } from './dataFiles';

const handleRecordsFilterParameters = (args: queryInput_getRecords_Input = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'long',
      name: 'id',
      defVal: args.idMin || -999999999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'long',
      name: 'id1',
      defVal: args.idMax || 999999999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'long',
      name: 'transactionId',
      defVal: args.transactionIdMin || -999999999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'long',
      name: 'transactionId1',
      defVal: args.transactionIdMax || 999999999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'txt',
      name: 'accountId',
      defVal: `"${args.accountIdMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'txt',
      name: 'accountId1',
      defVal: `"${args.accountIdMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P6__',
      id: '3',
      type: 'txt',
      name: 'counterAccountId',
      defVal: `"${args.ounterAccountIdMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P7__',
      id: '503',
      type: 'txt',
      name: 'counterAccountId1',
      defVal: `"${args.ounterAccountIdMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P8__',
      id: '4',
      type: 'long',
      name: 'debitOrCreditNumber',
      defVal: args.debitOrCreditNumberMin || -999999999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P9__',
      id: '504',
      type: 'long',
      name: 'debitOrCreditNumber1',
      defVal: args.debitOrCreditNumberMax || 999999999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return parametersArray;
};

module.exports = (next) => async (root, args, context, info) => {
  const parameters = handleRecordsFilterParameters(args.input);
  args.input = {
    parameters,
    datafile: recordsDataFile,
  };
  return next(root, args, context, info).then((data: getRecordsResponse) => {
    if (data.repdata?.length && !data.repdata?.[0].id) {
      return null;
    }
    return data;
  });
};
