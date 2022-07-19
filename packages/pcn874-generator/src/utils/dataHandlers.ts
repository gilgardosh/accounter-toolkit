import { headerValidator, transactionValidator } from './index.js';
import { Header, Transaction } from '../types';

const digitsAdjuster = (value: string, length: number) => {
  return `${'0'.repeat(length)}${value}`.slice(-length);
};

export const transactionHandler = (transaction: Transaction): Transaction => {
  if (transaction.refNumber && transaction.refNumber.length !== 9) {
    console.debug(
      `Expected Transaction refNumber to be of 9 digits, received "${transaction.refNumber}". ${
        transaction.refNumber.length > 9 ? `Using the last 9 digits.` : `Adding leading zeros.`
      }`,
    );
    transaction.refNumber = digitsAdjuster(transaction.refNumber, 9);
  }

  if (transaction.vatId && transaction.vatId.length !== 9) {
    console.debug(
      `Expected Transaction vatId to be of 9 digits, received "${transaction.vatId}". ${
        transaction.vatId.length > 9 ? `Using the last 9 digits.` : `Adding leading zeros.`
      }`,
    );
    transaction.vatId = digitsAdjuster(transaction.vatId, 9);
  }

  if (transaction.refGroup && transaction.refGroup.length !== 4) {
    console.debug(
      `Expected Transaction refGroup to be of 4 digits, received "${transaction.refGroup}". ${
        transaction.refGroup.length > 9 ? `Using the last 4 digits.` : `Adding leading zeros.`
      }`,
    );
    transaction.refGroup = digitsAdjuster(transaction.refGroup, 4);
  }

  return transactionValidator(transaction);
};

export const headerHandler = (header: Header): Header => {
  if (header.licensedDealerId && header.licensedDealerId.length !== 9) {
    console.debug(
      `Expected Header licensedDealerId to be of 9 digits, received "${header.licensedDealerId}". ${
        header.licensedDealerId.length > 9 ? `Using the last 9 digits.` : `Adding leading zeros.`
      }`,
    );
    header.licensedDealerId = digitsAdjuster(header.licensedDealerId, 9);
  }

  return headerValidator(header);
};
