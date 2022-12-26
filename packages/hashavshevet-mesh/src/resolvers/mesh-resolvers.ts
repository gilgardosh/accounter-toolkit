/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Account,
  getAccountsResponse,
  getRecordsResponse,
  getSortCodesResponse,
  getTransactionsResponse,
  RecordType,
  Resolvers,
  SortCode,
  Transaction,
} from '../mesh-artifacts/index.js';
import {
  accountsDataFile,
  bankPageRecordsDataFile,
  batchDataFile,
  recordsDataFile,
  sortCodesDataFile,
  transactionsDataFile,
} from './data-files/index.js';

const adjustGetAccountsInputToRaw = (args: Record<string, any> = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'txt',
      name: 'id',
      defVal: `"${args['idMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'txt',
      name: 'id1',
      defVal: `"${args['idMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'txt',
      name: 'name',
      defVal: `"${args['nameMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'name1',
      defVal: `"${args['nameMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'long',
      name: 'sortCode',
      defVal: `"${args['sortCodeMin'] || '-999999999'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'long',
      name: 'sortCode1',
      defVal: `"${args['sortCodeMax'] || '999999999'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];

  return {
    parameters: parametersArray,
    datafile: accountsDataFile,
  };
};

const adjustGetRecordsInputToRaw = (args: Record<string, any> = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'long',
      name: 'id',
      defVal: args['idMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'long',
      name: 'id1',
      defVal: args['idMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'long',
      name: 'transactionId',
      defVal: args['transactionIdMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'long',
      name: 'transactionId1',
      defVal: args['transactionIdMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'txt',
      name: 'accountId',
      defVal: `"${args['accountIdMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'txt',
      name: 'accountId1',
      defVal: `"${args['accountIdMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P6__',
      id: '3',
      type: 'txt',
      name: 'counterAccountId',
      defVal: `"${args['ounterAccountIdMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P7__',
      id: '503',
      type: 'txt',
      name: 'counterAccountId1',
      defVal: `"${args['ounterAccountIdMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P8__',
      id: '4',
      type: 'long',
      name: 'debitOrCreditNumber',
      defVal: args['debitOrCreditNumberMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P9__',
      id: '504',
      type: 'long',
      name: 'debitOrCreditNumber1',
      defVal: args['debitOrCreditNumberMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return {
    parameters: parametersArray,
    datafile: recordsDataFile,
  };
};

const adjustGetTransactionsInputToRaw = (args: Record<string, any> = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'txt',
      name: 'creditorId',
      defVal: `"${args['creditorIdMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'txt',
      name: 'creditorId1',
      defVal: `"${args['creditorIdMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'txt',
      name: 'debtorId',
      defVal: `"${args['debtorIdMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'debtorId1',
      defVal: `"${args['debtorIdMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'float',
      name: 'shekelSum',
      defVal: args['shekelSumMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'float',
      name: 'shekelSum1',
      defVal: args['shekelSumMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P8__',
      id: '3',
      type: 'date',
      name: 'valueDate',
      defVal: `"${args['valueDateMin'] || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P9__',
      id: '503',
      type: 'date',
      name: 'valueDate1',
      defVal: `"${args['valueDateMax'] || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P10__',
      id: '4',
      type: 'date',
      name: 'dueDate',
      defVal: `"${args['dueDateMin'] || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P11__',
      id: '504',
      type: 'date',
      name: 'dueDate1',
      defVal: `"${args['dueDateMax'] || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P12__',
      id: '5',
      type: 'long',
      name: 'id',
      defVal: args['idMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P13__',
      id: '505',
      type: 'long',
      name: 'id1',
      defVal: args['idMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P14__',
      id: '6',
      type: 'long',
      name: 'batchId',
      defVal: args['batchIdMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P15__',
      id: '506',
      type: 'long',
      name: 'batchId1',
      defVal: args['batchIdMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];

  return { parameters: parametersArray, datafile: transactionsDataFile };
};

const adjustGetBatchInputToRaw = (args: Record<string, any> = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'long',
      name: 'id',
      defVal: args['idMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'long',
      name: 'id1',
      defVal: args['idMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'txt',
      name: 'status',
      defVal: `"${args['statusMin'] || ''}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'txt',
      name: 'status1',
      defVal: `"${args['statusMax'] || 'תתתתתתתתתתתתתתת'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'date',
      name: 'initDate',
      defVal: `"${args['initDateMin'] || '1990/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'date',
      name: 'initDate1',
      defVal: `"${args['initDateMax'] || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return { parameters: parametersArray, datafile: batchDataFile };
};

const adjustGetBankPageRecordsInputToRaw = (args: Record<string, any> = {}) => {
  const parametersArray = [
    {
      p_name: '__MUSTACH_P0__',
      id: '0',
      type: 'long',
      name: 'id',
      defVal: args['idMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P1__',
      id: '500',
      type: 'long',
      name: 'id1',
      defVal: args['idMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P2__',
      id: '1',
      type: 'long',
      name: 'bankPageId',
      defVal: args['bankPageIdMin'] || -999_999_999,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P3__',
      id: '501',
      type: 'long',
      name: 'bankPageId1',
      defVal: args['bankPageIdMax'] || 999_999_999,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
    {
      p_name: '__MUSTACH_P4__',
      id: '2',
      type: 'date',
      name: 'date',
      defVal: `"${args['dateMin'] || '2000/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'from',
    },
    {
      p_name: '__MUSTACH_P5__',
      id: '502',
      type: 'date',
      name: 'date1',
      defVal: `"${args['dateMax'] || '2030/01/01'}"`,
      opName: 'מ..עד',
      opOrigin: 'to',
    },
  ];
  return { parameters: parametersArray, datafile: bankPageRecordsDataFile };
};

const resolvers: Resolvers = {
  Query: {
    getSortCodes: async (root, _, context, info) => {
      const args = {
        input: {
          datafile: sortCodesDataFile,
          parameters: [],
        },
      };
      return context.Hashavshevet.Query.getSortCodesRaw({ root, context, info, args });
    },
    getAccounts: async (root, args, context, info) => {
      const adjustedArgs = {
        input: adjustGetAccountsInputToRaw(args),
      };
      return context.Hashavshevet.Query.getAccountsRaw({
        root,
        context,
        info,
        args: adjustedArgs,
      }).then((data: any) => {
        if (data.status?.repdata?.length && !data.status.repdata[0].id) {
          return null;
        }
        return data;
      });
    },
    getRecords: async (root, args, context, info) => {
      const adjustedArgs = {
        input: adjustGetRecordsInputToRaw(args),
      };
      return context.Hashavshevet.Query.getRecordsRaw({
        root,
        context,
        info,
        args: adjustedArgs,
      }).then((data: any) => {
        if (data.status?.repdata?.length && !data.status.repdata[0].id) {
          return null;
        }
        return data;
      });
    },
    getTransactions: async (root, args, context, info) => {
      const adjustedArgs = {
        input: adjustGetTransactionsInputToRaw(args),
      };
      return context.Hashavshevet.Query.getTransactionsRaw({
        root,
        context,
        info,
        args: adjustedArgs,
      }).then((data: any) => {
        if (data.status?.repdata?.length && !data.status.repdata[0].id) {
          return null;
        }
        return data;
      });
    },
    getBatch: async (root, args, context, info) => {
      const adjustedArgs = {
        input: adjustGetBatchInputToRaw(args),
      };
      return context.Hashavshevet.Query.getBatchRaw({
        root,
        context,
        info,
        args: adjustedArgs,
      }).then((data: any) => {
        if (data.status?.repdata?.length && !data.status.repdata[0].id) {
          return null;
        }
        return data;
      });
    },
    getBankPageRecords: async (root, args, context, info) => {
      const adjustedArgs = {
        input: adjustGetBankPageRecordsInputToRaw(args),
      };
      return context.Hashavshevet.Query.getBankPageRecordsRaw({
        root,
        context,
        info,
        args: adjustedArgs,
      }).then((data: any) => {
        if (data.status?.repdata?.length && !data.status.repdata[0].id) {
          return null;
        }
        return data;
      });
    },
  },
  Mutation: {
    importAccounts: async (root, args, context, info) => {
      const adjustedArgs = {
        ...args,
        myindex: 'acc',
      };
      return context.Hashavshevet.Mutation.importAccountsRaw({
        root,
        context,
        info,
        args: adjustedArgs,
      });
    },
  },
  RecordType: {
    batch: {
      selectionSet: `{
        batchId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.batchId) {
          return null;
        }
        return context.Hashavshevet.Query.getBatchRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'batch')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetBatchInputToRaw({
              idMin: root.batchId,
              idMax: root.batchId,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
    transaction: {
      selectionSet: `{
        transactionId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.transactionId) {
          return null;
        }
        return context.Hashavshevet.Query.getTransactionsRaw({
          root,
          context,
          info,
          key: root.transactionId,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'transaction')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          argsFromKeys: (transactionIds: number[]) => ({
            input: adjustGetTransactionsInputToRaw({
              idMin: Math.min.apply(null, transactionIds),
              idMax: Math.max.apply(null, transactionIds),
            }),
          }),
          valuesFromResults: (
            transactionsList: getTransactionsResponse,
            transactionIds: number[],
          ) =>
            transactionIds.map(transactionId => {
              return transactionsList.status?.repdata?.find(
                (transaction: Transaction) => transaction.id === transactionId,
              );
            }),
        });
      },
    },
    account: {
      selectionSet: `{
        accountId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.accountId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccountsRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'account')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetAccountsInputToRaw({
              idMin: root.accountId,
              idMax: root.accountId,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
    counterAccount: {
      selectionSet: `{
        counterAccountId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.counterAccountId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccountsRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'counterAccount')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetAccountsInputToRaw({
              idMin: root.counterAccountId,
              idMax: root.counterAccountId,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
  },
  Transaction: {
    batch: {
      selectionSet: `{
        batchId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.batchId) {
          return null;
        }
        return context.Hashavshevet.Query.getBatchRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'batch')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetBatchInputToRaw({
              idMin: root.batchId,
              idMax: root.batchId,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
    records: {
      selectionSet: `{
        id
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.id) {
          return [];
        }
        return context.Hashavshevet.Query.getRecordsRaw({
          root,
          context,
          info,
          key: root.id,
          selectionSet: `{
            status {
              repdata {
                transactionId
                ${info.fieldNodes
                  .find(n => n.name.value === 'records')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          argsFromKeys: (batchIds: number[]) => ({
            input: adjustGetRecordsInputToRaw({
              transactionIdMin: Math.min.apply(null, batchIds),
              transactionIdMax: Math.max.apply(null, batchIds),
            }),
          }),
          valuesFromResults: (recordsList: getRecordsResponse, batchIds: number[]) =>
            batchIds.map(transactionId => {
              return recordsList.status?.repdata?.filter(
                (record: RecordType) => record.transactionId === transactionId,
              );
            }),
        });
      },
    },
    creditor: {
      selectionSet: `{
        creditorId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.creditorId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccountsRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'creditor')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetAccountsInputToRaw({
              idMin: root.creditorId,
              idMax: root.creditorId,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
    debtor: {
      selectionSet: `{
        debtorId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.debtorId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccountsRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'debtor')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetAccountsInputToRaw({
              idMin: root.debtorId,
              idMax: root.debtorId,
            }),
          },
        }).then(res => {
          return res.status.repdata && res.status.repdata.length > 0 ? res.status.repdata[0] : null;
        });
      },
    },
  },
  Batch: {
    transactions: {
      selectionSet: `{
        id
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.id) {
          return [];
        }
        return context.Hashavshevet.Query.getTransactionsRaw({
          root,
          context,
          info,
          key: root.id,
          selectionSet: `{
            status {
              repdata {
                batchId
                ${info.fieldNodes
                  .find(n => n.name.value === 'transactions')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          argsFromKeys: (batchIds: number[]) => ({
            input: adjustGetTransactionsInputToRaw({
              batchIdMin: Math.min.apply(null, batchIds),
              batchIdMax: Math.max.apply(null, batchIds),
            }),
          }),
          valuesFromResults: (recordsList: getTransactionsResponse, batchIds: number[]) =>
            batchIds.map(batchId => {
              return recordsList.status?.repdata?.filter(
                (record: RecordType) => record.batchId === batchId,
              );
            }),
        });
      },
    },
  },
  BankPageRecord: {
    account: {
      selectionSet: `{
        accountId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.accountId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccountsRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'account')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetAccountsInputToRaw({
              idMin: root.accountId,
              idMax: root.accountId,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
  },
  importTransactionsToBatchResponse: {
    batch: {
      selectionSet: `{
      batchno
    }`,
      resolve: async (root, _args, context, info) => {
        if (!root.batchno) {
          return null;
        }
        return context.Hashavshevet.Query.getBatchRaw({
          root,
          context,
          info,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'batch')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          args: {
            input: adjustGetBatchInputToRaw({
              idMin: root.batchno,
              idMax: root.batchno,
            }),
          },
        }).then(res => {
          return res.status?.repdata && res.status.repdata.length > 0
            ? res.status.repdata[0]
            : null;
        });
      },
    },
  },
  Account: {
    sortCode: {
      selectionSet: `{
        sortCodeId
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.sortCodeId) {
          return null;
        }
        return context.Hashavshevet.Query.getSortCodesRaw({
          root,
          context,
          info,
          key: root.sortCodeId,
          selectionSet: `{
            status {
              repdata {
                code
                ${info.fieldNodes
                  .find(n => n.name.value === 'sortCode')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          argsFromKeys: (_sortCodeIds: number[]) => ({
            input: {
              datafile: sortCodesDataFile,
              parameters: [],
              // TODO: implement min/max filtering
              // idMin: Math.min.apply(null, sortCodeIds),
              // idMax: Math.max.apply(null, sortCodeIds),
            },
          }),
          valuesFromResults: (transactionsList: getSortCodesResponse, sortCodeIds: number[]) =>
            sortCodeIds.map(sortCodeId => {
              return transactionsList.status?.repdata?.find(
                (sortCode: SortCode) => sortCode.code === sortCodeId,
              );
            }),
        });
      },
    },
  },
  SortCode: {
    accounts: {
      selectionSet: `{
        code
      }`,
      resolve: async (root, _args, context, info) => {
        if (!root.code) {
          return [];
        }
        return context.Hashavshevet.Query.getAccountsRaw({
          root,
          context,
          info,
          key: root.code,
          selectionSet: `{
            status {
              repdata {
                id
                ${info.fieldNodes
                  .find(n => n.name.value === 'accounts')
                  .selectionSet.selections.map(s => ('name' in s ? s.name.value : ''))
                  .join('\n')}
              }
            }
          }`,
          argsFromKeys: (sortCodes: number[]) => ({
            input: adjustGetAccountsInputToRaw({
              sortCodeMin: Math.min.apply(null, sortCodes),
              sortCodeMax: Math.max.apply(null, sortCodes),
            }),
          }),
          valuesFromResults: (recordsList: getAccountsResponse, sortCodes: number[]) =>
            sortCodes.map(sortCode => {
              return recordsList.status?.repdata?.filter(
                (account: Account) => account.sortCodeId === sortCode,
              );
            }),
        });
      },
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default resolvers;

export { resolvers };
