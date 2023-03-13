import type { Header, Options, Transaction } from './types';
import {
  footerBuilder,
  headerBuilder,
  headerHandler,
  transactionBuilder,
  transactionHandler,
} from './utils/index.js';

export const pcnGenerator = (
  header: Header,
  transactions: Transaction[],
  options: Options = {},
): string => {
  let textFile = '';

  // handle header
  try {
    header = headerHandler(header, options);
  } catch (e) {
    throw new Error(`Header validation error: ${(e as Error).message}`);
  }
  textFile += headerBuilder(header);

  // sort transactions
  const sortedTransactions = options.sort
    ? transactions.sort((a, b) => {
        if (a.entryType > b.entryType) {
          return 1;
        }
        if (a.entryType < b.entryType) {
          return -1;
        }
        return a.invoiceDate > b.invoiceDate ? 1 : -1;
      })
    : transactions;
  // handle transactions
  for (let i = 0; i < sortedTransactions.length; i++) {
    let transaction = sortedTransactions[i];
    try {
      transaction = transactionHandler(transaction, options);
    } catch (e) {
      throw new Error(`Transaction index ${i} validation error: ${(e as Error).message}`);
    }
    textFile += transactionBuilder(transaction);
  }

  // handle footer
  textFile += footerBuilder(header);

  return textFile;
};
