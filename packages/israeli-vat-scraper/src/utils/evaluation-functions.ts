import type {
  ReportCommon,
  ReportDetails,
  ReportExpansion,
  ReportFixedInvoice,
  ReportInputRecord,
  ReportInputRecordDetails,
  ReportInputs,
  ReportRecordCategories,
  ReportRecordColumns,
  ReportSales,
} from './types.js';

export function getSelectOptions(optionSelector: string) {
  return Array.from(document.querySelectorAll<HTMLOptionElement>(optionSelector))
    .filter(o => o.value)
    .map(o => {
      return {
        name: o.text,
        value: o.value,
      };
    });
}

export const getReportsTable = (element: Element | null): ReportCommon[] => {
  const tableData: ReportCommon[] = [];

  if (!element) {
    return tableData;
  }

  const table = element as HTMLTableElement;

  const getFloat = (raw: string) => {
    return parseFloat(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
  };

  for (let i = 1; i < table.rows.length; i++) {
    const tableRow = table.rows[i];
    const rowData: ReportCommon = {
      reportMonth: tableRow.cells[0].innerText,
      reportType: tableRow.cells[1].innerText,
      corectness: tableRow.cells[2].innerText,
      totalVat: getFloat(tableRow.cells[3].innerText),
      generationDate: tableRow.cells[4].innerText,
      route: tableRow.cells[5].innerText,
      isFixed: tableRow.cells[6].innerText.includes('ת'),
    };

    tableData.push(rowData);
  }

  return tableData;
};

export const getReportDetails = (table: Element): ReportDetails | undefined => {
  if (!(table instanceof HTMLTableElement)) {
    return undefined;
  }
  const getInnerData = (rowNum: number) => {
    return table.rows[rowNum].cells[1].innerText;
  };

  const getInt = (raw: string) => {
    return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
  };

  const details: ReportDetails = {
    licensedDealerId: getInnerData(0),
    osekName: getInnerData(1),
    regionalCommissioner: getInnerData(2),
    reportingPeriod: getInnerData(3),
    reportingOrigin: getInnerData(4),
    reportingDate: getInnerData(5),
    reportingStatus: getInnerData(6),
    taxableSalesAmount: getInt(getInnerData(7)),
    taxableSalesVat: getInt(getInnerData(8)),
    zeroOrExemptSalesCount: getInt(getInnerData(9)),
    equipmentInputsVat: getInt(getInnerData(10)),
    otherInputsVat: getInt(getInnerData(11)),
    refundAmount: getInt(getInnerData(12)),
    fileInvoiceRecord: getInnerData(13),
  };

  return details;
};

export const getReportExpansionTitle = (table: Element): ReportExpansion | undefined => {
  if (!(table instanceof HTMLTableElement)) {
    return undefined;
  }

  const getInt = (raw: string) => {
    return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
  };

  const tableData: ReportExpansion = {
    reportingPeriod: table.rows[0].cells[1].innerText,
    reportingOrigin: table.rows[0].cells[3].innerText,
    reportingDate: table.rows[0].cells[5].innerText,
    taxableSalesAmount: getInt(table.rows[1].cells[1].innerText),
    taxableSalesVat: getInt(table.rows[1].cells[3].innerText),
    zeroOrExemptSalesCount: getInt(table.rows[1].cells[5].innerText),
    equipmentInputsVat: getInt(table.rows[2].cells[1].innerText),
    otherInputsVat: getInt(table.rows[2].cells[3].innerText),
    refundAmount: getInt(table.rows[2].cells[5].innerText),
  };

  return tableData;
};

export const getReportExpansionInputs = (table: Element): ReportInputs | undefined => {
  if (!(table instanceof HTMLTableElement)) {
    return undefined;
  }

  const getCategoryData = (row: HTMLTableRowElement, index: number): ReportRecordColumns => {
    const getInt = (raw: string) => {
      return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
    };

    return {
      recordsCount: getInt(row.cells[index].innerText),
      vatAmount: getInt(row.cells[index + 1].innerText),
      beforeVatAmount: getInt(row.cells[index + 2].innerText),
    };
  };

  const getRowData = (row: HTMLTableRowElement): ReportRecordCategories => {
    return {
      received: getCategoryData(row, 1),
      incorrect: getCategoryData(row, 4),
      total: getCategoryData(row, 7),
    };
  };

  const inputsData: ReportInputs = {
    regularInput: getRowData(table.rows[2]),
    pettyCash: getRowData(table.rows[3]),
    selfInvoiceInput: getRowData(table.rows[4]),
    importList: getRowData(table.rows[5]),
    rashapSupplier: getRowData(table.rows[6]),
    otherDocument: getRowData(table.rows[7]),
    total: getRowData(table.rows[8]),
  };

  return inputsData;
};

export const getReportExpansionInputRecords = (table: Element): ReportInputRecord[] => {
  const recordsData: ReportInputRecord[] = [];

  if (!(table instanceof HTMLTableElement)) {
    return recordsData;
  }

  const getInt = (raw: string) => {
    return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
  };

  for (let i = 1; i < table.rows.length; i++) {
    const tableRow = table.rows[i];
    const record: ReportInputRecord = {
      recordType: tableRow.cells[0].innerText,
      referenceNum: tableRow.cells[1].innerText,
      invoiceDate: tableRow.cells[2].innerText,
      vatAmount: getInt(tableRow.cells[3].innerText),
      amount: getInt(tableRow.cells[4].innerText),
      supplierOrList: tableRow.cells[5].innerText,
      errorDescription: tableRow.cells[6].innerText,
    };

    recordsData.push(record);
  }

  return recordsData;
};

export const getReportExpansionInputRecordDetails = (
  table: Element,
): ReportInputRecordDetails | undefined => {
  if (!(table instanceof HTMLTableElement)) {
    return undefined;
  }

  const getInt = (raw: string) => {
    return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
  };

  const tableData: ReportInputRecordDetails = {
    recordType: table.rows[0].cells[1].innerText,
    invoiceNum: table.rows[1].cells[1].innerText,
    referenceGroup: table.rows[2].cells[1].innerText,
    invoiceDate: table.rows[3].cells[1].innerText,
    vatAmount: getInt(table.rows[4].cells[1].innerText),
    amount: getInt(table.rows[5].cells[1].innerText),
    supplierOrList: table.rows[6].cells[1].innerText,
  };

  return tableData;
};

export const getReportExpansionSales = (table: Element): ReportSales | undefined => {
  if (!(table instanceof HTMLTableElement)) {
    return undefined;
  }

  const getCategoryData = (row: HTMLTableRowElement, index: number): ReportRecordColumns => {
    const getInt = (raw: string) => {
      return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
    };

    return {
      recordsCount: getInt(row.cells[index].innerText),
      vatAmount: getInt(row.cells[index + 1].innerText),
      beforeVatAmount: getInt(row.cells[index + 2].innerText),
    };
  };

  const getRowData = (row: HTMLTableRowElement): ReportRecordCategories => {
    return {
      received: getCategoryData(row, 1),
      incorrect: getCategoryData(row, 4),
      total: getCategoryData(row, 7),
    };
  };

  const inputsData: ReportSales = {
    regularSaleRecognized: getRowData(table.rows[2]),
    zeroSaleRecognized: getRowData(table.rows[3]),
    regularSaleUnrecognized: getRowData(table.rows[4]),
    zeroSaleUnrecognized: getRowData(table.rows[5]),
    selfInvoiceSale: getRowData(table.rows[6]),
    listExport: getRowData(table.rows[7]),
    servicesExport: getRowData(table.rows[8]),
    rashapClient: getRowData(table.rows[9]),
    total: getRowData(table.rows[10]),
  };

  return inputsData;
};

export const getReportExpansionFixes = (table: Element): ReportFixedInvoice[] => {
  const fixesData: ReportFixedInvoice[] = [];

  if (!(table instanceof HTMLTableElement)) {
    return fixesData;
  }

  const getInt = (raw: string) => {
    return parseInt(raw.replace(/\D/g, '')) * (raw.includes('-') ? -1 : 1);
  };

  for (let i = 0; i < table.rows.length; i++) {
    const tableRow = table.rows[i];
    const fix: ReportFixedInvoice = {
      saleType: tableRow.cells[0].innerText,
      referenceNum: tableRow.cells[1].innerText,
      invoiceDate: tableRow.cells[2].innerText,
      invoiceAmount: getInt(tableRow.cells[3].innerText),
      vatAmount: getInt(tableRow.cells[4].innerText),
      expenderOrRecoever: tableRow.cells[5].innerText,
      fixDetails: tableRow.cells[6].innerText,
    };

    fixesData.push(fix);
  }

  return fixesData;
};
