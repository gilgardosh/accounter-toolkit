/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import type { Resolvers } from '../mesh-artifacts/index.js';

const resolvers: Resolvers = {
  RecordType: {
    batch: {
      selectionSet: `{
        batchId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.batchId) {
          return null;
        }
        return context.Hashavshevet.Query.getBatch({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'batch')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.batchId,
              idMax: root.batchId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
    transaction: {
      selectionSet: `{
        transactionId
      }`,
      // @ts-ignore
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
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'transaction')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          // @ts-ignore
          argsFromKeys: transactionIds => ({
            input: {
              idMin: Math.min.apply(null, transactionIds),
              idMax: Math.max.apply(null, transactionIds),
            },
          }),
          // @ts-ignore
          valuesFromResults: (transactionsList, transactionIds) =>
            // @ts-ignore
            transactionIds.map(transactionId => {
              return (
                // @ts-ignore
                transactionsList?.repdata?.find(transaction => transaction?.id === transactionId) ??
                null
              );
            }),
        });
      },
    },
    account: {
      selectionSet: `{
        accountId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.accountId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccounts({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'account')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.accountId,
              idMax: root.accountId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
    counterAccount: {
      selectionSet: `{
        counterAccountId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.counterAccountId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccounts({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'counterAccount')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.counterAccountId,
              idMax: root.counterAccountId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
  },
  Transaction: {
    batch: {
      selectionSet: `{
        batchId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.batchId) {
          return null;
        }
        return context.Hashavshevet.Query.getBatch({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'batch')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.batchId,
              idMax: root.batchId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
    records: {
      selectionSet: `{
        id
      }`,
      // @ts-ignore
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
            repdata {
              transactionId
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'records')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          // @ts-ignore
          argsFromKeys: batchIds => ({
            input: {
              transactionIdMin: Math.min.apply(null, batchIds),
              transactionIdMax: Math.max.apply(null, batchIds),
            },
          }),
          // @ts-ignore
          valuesFromResults: (recordsList, batchIds) =>
            // @ts-ignore
            batchIds.map(transactionId => {
              return (
                // @ts-ignores
                recordsList?.repdata?.filter(record => record?.transactionId === transactionId) ??
                null
              );
            }),
        });
      },
    },
    creditor: {
      selectionSet: `{
        creditorId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.creditorId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccounts({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'creditor')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.creditorId,
              idMax: root.creditorId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
    debtor: {
      selectionSet: `{
        debtorId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.debtorId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccounts({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'debtor')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.debtorId,
              idMax: root.debtorId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
  },
  Batch: {
    transactions: {
      selectionSet: `{
        id
      }`,
      // @ts-ignore
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
            repdata {
              batchId
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'transactions')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          // @ts-ignore
          argsFromKeys: batchIds => ({
            input: {
              batchIdMin: Math.min.apply(null, batchIds),
              batchIdMax: Math.max.apply(null, batchIds),
            },
          }),
          // @ts-ignore
          valuesFromResults: (transactionsList, batchIds) =>
            batchIds.map(
              // @ts-ignore
              batchId =>
                transactionsList?.repdata?.filter(
                  // @ts-ignore
                  record => record?.batchId && record.batchId === batchId,
                ) ?? null,
            ),
        });
      },
    },
  },
  BankPageRecord: {
    account: {
      selectionSet: `{
        accountId
      }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.accountId) {
          return null;
        }
        return context.Hashavshevet.Query.getAccounts({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'account')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.accountId,
              idMax: root.accountId,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
  },
  importTransactionsToBatchResponse: {
    batch: {
      selectionSet: `{
      batchno
    }`,
      // @ts-ignore
      resolve: async (root, _args, context, info) => {
        if (!root.batchno) {
          return null;
        }
        return context.Hashavshevet.Query.getBatch({
          root,
          context,
          info,
          selectionSet: `{
            repdata {
              id
              ${info.fieldNodes
                // @ts-ignore
                .find(n => n.name.value === 'batch')
                // @ts-ignore
                ?.selectionSet?.selections.map(s => ('name' in s ? s.name.value : ''))
                .join('\n')}
            }
          }`,
          args: {
            input: {
              idMin: root.batchno,
              idMax: root.batchno,
            },
          },
          // @ts-ignore
        }).then(res => {
          return res?.repdata && res.repdata.length > 0 ? res.repdata[0] ?? null : null;
        });
      },
    },
  },
};

module.exports = resolvers;
