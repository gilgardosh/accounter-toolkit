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

  // handle transactions
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
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
