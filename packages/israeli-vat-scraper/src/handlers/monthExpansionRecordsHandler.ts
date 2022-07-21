import { Page } from 'puppeteer';

import { newPageByMonth } from '../utils/browserUtil.js';
import {
  getReportExpansionInputRecordDetails,
  getReportExpansionInputRecords,
} from '../utils/evaluationFunctions.js';
import { waitAndClick, waitForSelectorPlus } from '../utils/pageUtil.js';
import {
  Config,
  ReportInputRecord,
  ReportInputRecordDetails,
} from '../utils/types.js';
import { UserPrompt } from '../utils/userPrompt.js';

export class monthExpansionRecordsHandler {
  private config: Config;
  private prompt: UserPrompt;
  private location: string[];
  private tabSelector: string;
  private page: Page | null = null;
  private index: number;
  private secondaryIndex: number;

  constructor(
    config: Config,
    prompt: UserPrompt,
    location: string[],
    tabSelector: string,
    index: number,
    secondaryIndex: number
  ) {
    this.config = config;
    this.prompt = prompt;
    this.location = [...location, 'Records'];
    this.tabSelector = tabSelector;
    this.index = index;
    this.secondaryIndex = secondaryIndex;
  }

  public handle = async (): Promise<ReportInputRecord[]> => {
    try {
      this.prompt.update(this.location, 'Fetching');

      this.page = await newPageByMonth(
        this.config.visibleBrowser,
        this.location[0],
        this.index
      );

      await waitAndClick(this.page, this.tabSelector);

      await waitAndClick(
        this.page,
        `#tblSikum > tbody > tr:nth-child(${this.index}) > td:nth-child(${this.secondaryIndex}) > a`
      );

      const recordsTable = await waitForSelectorPlus(
        this.page,
        '#ContentUsersPage_dgHeshboniot'
      );
      const records = await this.page.evaluate(
        getReportExpansionInputRecords,
        recordsTable
      );

      this.prompt.update(this.location, 'Fetching details');
      for (let i = 0; i < records.length; i++) {
        records[i].details = await this.getRecordDetails(i);
      }

      await waitAndClick(this.page, '#ContentUsersPage_btnGoBack');
      this.prompt.update(this.location, 'Done');
      return records;
    } catch (e) {
      this.prompt.addError(this.location, (e as Error)?.message || e);
      return [];
    }
  };

  private getRecordDetails = async (
    index: number
  ): Promise<ReportInputRecordDetails | undefined> => {
    try {
      if (!this.page) {
        this.page = await newPageByMonth(
          this.config.visibleBrowser,
          this.location[0],
          this.index
        );

        await waitAndClick(this.page, this.tabSelector);

        const button = await waitForSelectorPlus(
          this.page,
          `#tblSikum > tbody > tr:nth-child(${this.index}) > td:nth-child(${this.secondaryIndex}) > a`
        );
        if (!button) {
          return;
        }
        await button.click();
      }

      await waitAndClick(
        this.page,
        `#ContentUsersPage_dgHeshboniot_btnPratimNosafim_${index}`
      );

      const detailsTable = await waitForSelectorPlus(
        this.page,
        '#ContentUsersPage_ucPratimNosafimHsb1_TblPerutHeshbonit'
      );

      const details = await this.page.evaluate(
        getReportExpansionInputRecordDetails,
        detailsTable
      );

      await waitAndClick(this.page, '#BtnCloseDlgPrtNsf');
      return details;
    } catch (e) {
      this.prompt.addError(
        [...this.location, 'Details'],
        (e as Error)?.message || e
      );
      return;
    }
  };
}
