import { Page } from 'puppeteer';

import { newPageByMonth } from '../utils/browserUtil.js';
import { getReportExpansionInputs } from '../utils/evaluationFunctions.js';
import { waitAndClick, waitForSelectorPlus } from '../utils/pageUtil.js';
import { Config, ReportInputs } from '../utils/types.js';
import { UserPrompt } from '../utils/userPrompt.js';
import { monthExpansionRecordsHandler } from './monthExpansionRecordsHandler.js';

const INPUTS_BUTTON_SELECTOR = '#ContentUsersPage_TabMenu1_LinkButton0';

export class MonthInputsHandler {
  private config: Config;
  private prompt: UserPrompt;
  private location: string[];
  private index: number;
  private page: Page | null = null;

  constructor(
    config: Config,
    prompt: UserPrompt,
    location: string[],
    index: number
  ) {
    this.config = config;
    this.prompt = prompt;
    this.location = [...location, 'Inputs'];
    this.index = index;
  }

  public handle = async (): Promise<ReportInputs | undefined> => {
    this.prompt.update(this.location, 'Fetching...');
    try {
      this.page = await newPageByMonth(
        this.config.visibleBrowser,
        this.location[0],
        this.index
      );

      await waitAndClick(this.page, INPUTS_BUTTON_SELECTOR);

      const inputsTable = await waitForSelectorPlus(this.page, '#tblSikum');
      const inputsData = await this.page.evaluate(
        getReportExpansionInputs,
        inputsTable
      );

      // gt income records
      for (const key in inputsData) {
        if (key === 'total') {
          continue;
        }
        if (inputsData[key as keyof ReportInputs].received.recordsCount > 0) {
          const index = ((): number | null => {
            switch (key) {
              case 'regularInput':
                return 3;
              case 'pettyCash':
                return 4;
              case 'selfInvoiceInput':
                return 5;
              case 'importList':
                return 6;
              case 'rashapSupplier':
                return 7;
              case 'otherDocument':
                return 8;
              default:
                return null;
            }
          })();
          const secondaryIndex = 2;

          if (index) {
            const recordsHandler = new monthExpansionRecordsHandler(
              this.config,
              this.prompt,
              this.location,
              INPUTS_BUTTON_SELECTOR,
              index,
              secondaryIndex
            );
            inputsData[key as keyof ReportInputs].received.records =
              await recordsHandler.handle();
            [];
          }
        }

        if (inputsData[key as keyof ReportInputs].incorrect.recordsCount > 0) {
          const index = ((): number | null => {
            switch (key) {
              case 'regularInput':
                return 3;
              case 'pettyCash':
                return 4;
              case 'selfInvoiceInput':
                return 5;
              case 'importList':
                return 6;
              case 'rashapSupplier':
                return 7;
              case 'otherDocument':
                return 8;
              default:
                return null;
            }
          })();
          const secondaryIndex = 5;

          if (index) {
            const recordsHandler = new monthExpansionRecordsHandler(
              this.config,
              this.prompt,
              this.location,
              INPUTS_BUTTON_SELECTOR,
              index,
              secondaryIndex
            );
            inputsData[key as keyof ReportInputs].incorrect.records =
              await recordsHandler.handle();
            [];
          }
        }
      }

      this.page.browser().close();
      this.prompt.update(this.location, 'Done');
      return inputsData;
    } catch (e) {
      this.prompt.addError(this.location, (e as Error)?.message || e);
      this.page?.browser().close();
      return;
    }
  };
}
