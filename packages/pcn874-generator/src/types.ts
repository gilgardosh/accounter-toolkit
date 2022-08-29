/**
 * Header Entry Variables
 */
export interface Header {
  /**
   * User Licensed Dealer identification Number
   * 9 digits
   * מספר עוסק
   */
  licensedDealerId: string;

  /**
   * Month for which detailed report is being submitted
   * YYYYMM
   * תקופת הדיווח
   */
  reportMonth: string;

  // commented out since constant
  // /**
  //  * Report Type.
  //  * Field Value=1, Future changes possible
  //  */
  // reportType?: string;

  /**
   * File Generation Date
   * YYYYMM
   * if undefined - current date will be inputed
   * תאריך הגשה
   */
  generationDate?: string;

  // commented out since implied by taxableSalesAmount
  // /**
  //  * Total taxable sales sign
  //  * True => +
  //  * False => -
  //  */
  // taxableSalesSign: boolean;

  /**
   * Total amount of taxable sales (excluding VAT)
   * in the reported file
   * עסקאות חייבות
   */
  taxableSalesAmount: number;

  // commented out since implied by taxableSalesVat
  // /**
  //  * Total VAT on taxable sales sign
  //  * True => +
  //  * False => -
  //  */
  // taxableSalesVatSign: boolean;

  /**
   * Total VAT on taxable sales
   * in the reported file
   * מע"מ עסקאות חייבות
   */
  taxableSalesVat: number;

  // commented out since implied by taxableDifferentRateSales
  // /**
  //  *  Total sales taxable at *different rate* sign.
  //  * Currently "True" (+)
  //  * True => +
  //  * False => -
  //  */
  // taxableDifferentRateSalesSign: boolean;

  // commented out since constant
  // /**
  //  * Total of sales taxable at different rate (excluding VAT).
  //  * Currently zeros – for future use
  //  */
  // taxableDifferentRateSales: number;

  // commented out since implied by taxableDifferentRateSalesVat
  // /**
  //  * Total VAT on sales taxable at different rate sign.
  //  * Currently "True" (+)
  //  * True => +
  //  * False => -
  //  */
  // taxableDifferentRateSalesVatSign: boolean;

  // commented out since constant
  // /**
  //  * Total VAT on sales taxable at different rate.
  //  * Currently zeros – for future use
  //  */
  // taxableDifferentRateSalesVat: number;

  /**
   * Total number of records for "sales".
   * Number of sales records - both taxable and zero-rated/ exempt
   * מס' עסקאות
   */
  salesRecordCount: number;

  // commented out since implied by zeroValOrExemptSalesCount
  // /**
  //  * Total of zero value and exempt sales sign
  //  * True => +
  //  * False => -
  //  */
  // zeroValOrExemptSalesCountSign: boolean;

  /**
   * Total of zero value/exempt sales for period
   * עסקאות פטורות / אפס
   */
  zeroValOrExemptSalesCount: number;

  // commented out since implied by otherInputsVat
  // /**
  //  * Total VAT on "other" (non-capital) inputs sign
  //  * True => +
  //  * False => -
  //  */
  // otherInputsVatSign: boolean;

  /**
   * Total VAT on "other" inputs required during period
   * תשומות אחרות
   */
  otherInputsVat: number;

  // commented out since implied by equipmentInputsVat
  // /**
  //  * Total VAT on "equipment" inputs required during period sign
  //  * True => +
  //  * False => -
  //  */
  // equipmentInputsVatSign: boolean;

  /**
   * Total VAT on "equipment" inputs required during period
   * תשומות ציוד
   */
  equipmentInputsVat: number;

  /**
   * Total number of records for inputs (other and equipment)
   * מס' תשומות
   */
  inputsCount: number;

  // commented out since implied by totalVat
  // /**
  //  * Total VAT to pay / receive sign.
  //  * "True" (+) symbol to pay
  //  */
  // totalVatSign: boolean;

  /**
   * Total VAT to pay / receive for period
   * positive value => pay
   * negative value => receive
   * סכום מדווח
   */
  totalVat: number;
}

export const enum EntryType {
  /**
   * Sales – "regular" sale
   * identified commercial customer
   * עסקה רגילה - מזוהה
   * */
  SALE_REGULAR = 'S1',

  /**
   * Sales – "Zero Value/Exempt" sale
   * not export
   * עסקה אפס - מזוהה
   * */
  SALE_ZERO_OR_EXEMPT = 'S2',

  /**
   * Sales – for unidentified (private) customer
   * /unidentified-cash
   * register aggregation etc
   * עסקה רגילה - לא מזוהה
   * */
  SALE_UNIDENTIFIED_CUSTOMER = 'L1',

  /**
   * Sales – for unidentified Zero Value/Exempt
   * private customer – aggregated
   * עסקה אפס - לא מזוהה
   * */
  SALE_UNIDENTIFIED_ZERO_OR_EXEMPT = 'L2',

  /**
   * Sales – self invoice
   * חשבונית עצמית (עסקה)
   * */
  SALE_SELF_INVOICE = 'M',

  /**
   * Sales – export
   * */
  SALE_EXPORT = 'Y',

  /**
   * Sales – Palestinian Authority customer. Palestinian customer – Invoice I
   * לקוח רש"פ
   * */
  SALE_PALESTINIAN_CUSTOMER = 'I',

  /**
   * Input – "regular" from Israeli Supplier
   * תשומה רגילה
   * */
  INPUT_REGULAR = 'T',

  /**
   * Input – Petty Cash. Various suppliers – Petty Cash
   * קופה קטנה
   * */
  INPUT_PETTY_CASH = 'K',

  /**
   * Input – Import. Overseas supplier
   * רשימון יבוא
   * */
  INPUT_IMPORT = 'R',

  /**
   * Input – Supplier from Palestinian Authority. Palestinian supplier – Invoice P
   * ספק רש"פ
   * */
  INPUT_PALESTINIAN_SUPPLIER = 'P',

  /**
   * Input – Single document by law. Such as Import entry, bank document etc.
   * מסמך אחר
   * */
  INPUT_SINGLE_DOC_BY_LAW = 'H',

  /**
   * Input – self invoice
   * חשבונית עצמית (תשומה)
   * */
  INPUT_SELF_INVOICE = 'C',
}

/**
 * Transaction Entry Variables
 */
export interface Transaction {
  /**
   * Entry Type (document type)
   * סוג רשומה
   */
  entryType: EntryType;

  /**
   * VAT identification number – of the other side of the transaction.
   * For transactions entries – the customer
   * For inputs – the supplier
   * ספק / רשימון
   */
  vatId?: string;

  /**
   * Invoice Date/Reference.
   * YYYYMMDD
   * תאריך החשבונית
   */
  invoiceDate: string;

  /**
   * Reference group.
   * Series etc. zeros are possible at this stage
   * קבוצת אסמכתא
   */
  refGroup?: string;

  /**
   * Reference number.
   * First 9 positions from the right
   * מספר אסמכתא
   */
  refNumber?: string;

  /**
   * Total VAT in invoice / total VAT that is allowed (1/4…. 2/3…).
   * Rounded to the nearest shekel – always a positive value
   * סכום המע"מ
   */
  totalVat?: number;

  // commented out since constant AND implied by invoiceSum
  // /**
  //  * Credit/summary invoice sign
  //  * Cancellation/credit from supplier or customer – always in minus
  //  * True => +
  //  * False => -
  //  */
  // invoiceSumSign: boolean;

  /**
   * Invoice total (excluding VAT)
   * Always the 100%, always a positive value, rounded to the nearest shekel
   * סכום
   */
  invoiceSum: number;

  // commented out since constant
  // /**
  //  * Space for future data
  //  * Reference number to be allocated by "Sha'am" to the supplier
  //  */
  // extraSpace: string;
}

export interface Options {
  /**
   * defines if generator will throw error on minor/auto-fixable issue
   * default: false
   */
  strict?: boolean;
}
