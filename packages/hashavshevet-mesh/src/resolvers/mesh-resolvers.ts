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
import { accountsDataFile, sortCodesDataFile } from './data-files/index.js';

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
        return context.Hashavshevet.Query.getBatch({
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
            input: {
              idMin: root.batchId,
              idMax: root.batchId,
            },
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
        return context.Hashavshevet.Query.getTransactions({
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
            input: {
              idMin: Math.min.apply(null, transactionIds),
              idMax: Math.max.apply(null, transactionIds),
            },
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
        return context.Hashavshevet.Query.getBatch({
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
            input: {
              idMin: root.batchId,
              idMax: root.batchId,
            },
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
        return context.Hashavshevet.Query.getRecords({
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
            input: {
              transactionIdMin: Math.min.apply(null, batchIds),
              transactionIdMax: Math.max.apply(null, batchIds),
            },
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
        return context.Hashavshevet.Query.getTransactions({
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
            input: {
              batchIdMin: Math.min.apply(null, batchIds),
              batchIdMax: Math.max.apply(null, batchIds),
            },
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
        return context.Hashavshevet.Query.getBatch({
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
            input: {
              idMin: root.batchno,
              idMax: root.batchno,
            },
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
