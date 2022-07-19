import { Header, Transaction } from './types';
import { footerBuilder, headerBuilder, transactionBuilder } from './utils/index.js';
import { headerHandler, transactionHandler } from './utils/dataHandlers.js';

const pcnGenerator = (header: Header, transactions: Transaction[]): string => {
  let textFile = '';

  // handle header
  try {
    header = headerHandler(header);
  } catch (e) {
    throw new Error(`Header validation error: ${(e as Error).message}`);
  }
  textFile += headerBuilder(header);

  // handle transactions
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];
    try {
      transaction = transactionHandler(transaction);
    } catch (e) {
      throw new Error(`Transaction index ${i} validation error: ${(e as Error).message}`);
    }
    textFile += transactionBuilder(transaction);
  }

  // handle footer
  textFile += footerBuilder(header);

  return textFile;
};

export default pcnGenerator;
