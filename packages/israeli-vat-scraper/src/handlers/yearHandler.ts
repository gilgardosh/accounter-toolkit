import { Page } from 'puppeteer';

import { newPageByYear } from '../utils/browserUtil.js';
import { getReportsTable } from '../utils/evaluationFunctions.js';
import { waitForSelectorPlus } from '../utils/pageUtil.js';
import { Config, Report } from '../utils/types.js';
import { UserPrompt } from '../utils/userPrompt.js';
import { MonthHandler } from './monthHandler.js';

export class YearHandler {
  private config: Config;
  private prompt: UserPrompt;
  private location: string[];
  private months: number[] | null = null;
  private page: Page | null = null;

  constructor(
    config: Config,
    prompt: UserPrompt,
    location: string[],
    months: number[] | null = null
  ) {
    this.config = config;
    this.prompt = prompt;
    this.location = location;
    this.months = months;
  }

  public handle = async (): Promise<Report[]> => {
    try {
      this.prompt.update(this.location, 'Scraping');

      const baseYearTable = await this.getReportTable();

      if (!baseYearTable || baseYearTable.length === 0) {
        this.prompt.update(this.location, 'Done - No data found');
        return [];
      }

      const reports: Report[] = [];

      await Promise.all(
        baseYearTable
          .map((report: Report, i: number): [Report, number] => [report, i])
          .filter(
            (item) =>
              !this.months ||
              this.months.includes(parseInt(item[0].reportMonth.substr(0, 2)))
          )
          .map(async (item) => {
            const monthHandler = new MonthHandler(
              this.config,
              this.prompt,
              this.location,
              item[0],
              item[1]
            );

            return monthHandler.handle().then((res) => res || item[0]);
          })
      )
        .then((reportsList) => reportsList.filter((report) => report))
        .then((reportsList) => {
          reports.push(...(reportsList as unknown as Report[]));
        });

      this.prompt.update(this.location, 'Done');
      return reports;
    } catch (e) {
      this.page?.browser().close();
      this.prompt.addError(this.location, (e as Error)?.message || e);
      return [];
    }
  };

  private getReportTable = async (): Promise<Report[]> => {
    try {
      this.page = await newPageByYear(
        this.config.visibleBrowser,
        this.location[0]
      );

      await waitForSelectorPlus(this.page, '#ContentUsersPage_TblDuhot');

      const tableElement = await this.page.$('#dgDuchot');

      if (!tableElement) {
        return [];
      }

      const table: Report[] = await this.page.evaluate(
        getReportsTable,
        tableElement
      );

      this.page.browser().close();

      return table;
    } catch (e) {
      this.page?.browser().close();
      throw new Error(`getReportsTable - ${(e as Error)?.message || e}`);
    }
  };
}
