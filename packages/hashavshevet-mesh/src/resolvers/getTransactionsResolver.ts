/* eslint-disable camelcase */
import { getTransactionsResponse, queryInput_getTransactions_Input } from '../../.mesh';
import { transactionsDataFile } from './dataFiles';

const handleTransactionsFilterParameters = (args: queryInput_getTransactions_Input = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'txt',
      name: 'creditorId',
      defVal: `"${args.creditorIdMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'txt',
      name: 'creditorId1',
      defVal: `"${args.creditorIdMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'txt',
      name: 'debtorId',
      defVal: `"${args.debtorIdMin || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'debtorId1',
      defVal: `"${args.debtorIdMax || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'float',
      name: 'shekelSum',
      defVal: args.shekelSumMin || -999999999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'float',
      name: 'shekelSum1',
      defVal: args.shekelSumMax || 999999999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P8__',
      id: '3',
      type: 'date',
      name: 'valueDate',
      defVal: `"${args.valueDateMin || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P9__',
      id: '503',
      type: 'date',
      name: 'valueDate1',
      defVal: `"${args.valueDateMax || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P10__',
      id: '4',
      type: 'date',
      name: 'dueDate',
      defVal: `"${args.dueDateMin || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P11__',
      id: '504',
      type: 'date',
      name: 'dueDate1',
      defVal: `"${args.dueDateMax || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P12__',
      id: '5',
      type: 'long',
      name: 'id',
      defVal: args.idMin || -999999999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P13__',
      id: '505',
      type: 'long',
      name: 'id1',
      defVal: args.idMax || 999999999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P14__',
      id: '6',
      type: 'long',
      name: 'batchId',
      defVal: args.batchIdMin || -999999999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P15__',
      id: '506',
      type: 'long',
      name: 'batchId1',
      defVal: args.batchIdMax || 999999999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];

  return parametersArray;
};

module.exports = (next) => async (root, args, context, info) => {
  const parameters = handleTransactionsFilterParameters(args.input);
  args.input = {
    parameters,
    datafile: transactionsDataFile,
  };
  return next(root, args, context, info).then((data: getTransactionsResponse) => {
    if (data.repdata?.length && !data.repdata?.[0].id) {
      return null;
    }
    return data;
  });
};
