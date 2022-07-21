import { Page } from 'puppeteer';

import { newPageByMonth } from '../utils/browserUtil.js';
import { getReportExpansionFixes } from '../utils/evaluationFunctions.js';
import { waitForSelectorPlus } from '../utils/pageUtil.js';
import { Config, ReportFixedInvoice } from '../utils/types.js';
import { UserPrompt } from '../utils/userPrompt.js';

export class MonthFixesHandler {
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
    this.location = [...location, 'Fixes'];
    this.index = index;
  }

  public handle = async (): Promise<ReportFixedInvoice[] | undefined> => {
    this.prompt.update(this.location, 'Fetching...');
    try {
      this.page = await newPageByMonth(
        this.config.visibleBrowser,
        this.location[0],
        this.index
      );

      const button = await this.page
        .waitForSelector('#ContentUsersPage_lnkHeshboniotBeforeTikun')
        .catch(() => {
          return;
        });

      if (!button) {
        this.prompt.update(this.location, 'Done - no data found');
        return;
      }

      await button.click();

      // get fixes
      const fixesTable = await waitForSelectorPlus(
        this.page,
        '#ContentUsersPage_DgIskNosfu'
      );
      const fixes = await this.page.evaluate(
        getReportExpansionFixes,
        fixesTable
      );

      this.page.browser().close();

      this.prompt.update(this.location, 'Done');
      return fixes;
    } catch (e) {
      this.prompt.addError(this.location, (e as Error)?.message || e);
      this.page?.browser().close();
      return;
    }
  };
}
