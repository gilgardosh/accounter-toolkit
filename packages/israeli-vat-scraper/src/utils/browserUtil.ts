import puppeteer, { Page } from 'puppeteer';

import { login } from '../handlers/loginHandler.js';
import { waitAndClick, waitForSelectorPlus } from './pageUtil.js';

const nevigateYearToMonth = async (page: Page, monthIndex: number): Promise<void> => {
  try {
    const selector = `#dgDuchot > tbody > tr:nth-child(${monthIndex + 2}) > td:nth-child(1) > a`;

    await waitAndClick(page, selector);

    return;
  } catch (e) {
    throw new Error(`nevigateYearToMonth - ${(e as Error)?.message}`);
  }
};

export const newPageByMonth = async (showBrowser: boolean, year: string, monthIndex: number): Promise<Page> => {
  try {
    const page = await newPageByYear(showBrowser, year);

    await nevigateYearToMonth(page, monthIndex);

    return page;
  } catch (e) {
    throw new Error(`newPageByYear - ${(e as Error)?.message}`);
  }
};

export const navigateHomeToYear = async (page: Page, year: string): Promise<void> => {
  try {
    await waitForSelectorPlus(page, '#ContentUsersPage_DdlTkufa');

    await page.select('#ContentUsersPage_DdlTkufa', year);

    return;
  } catch (e) {
    throw new Error(`navigateHomeToYear - ${(e as Error)?.message}`);
  }
};

export const newPageByYear = async (showBrowser: boolean, year: string): Promise<Page> => {
  try {
    const page = await newHomePage(showBrowser);

    await navigateHomeToYear(page, year);

    return page;
  } catch (e) {
    throw new Error(`newPageByYear - ${(e as Error)?.message}`);
  }
};

export const newHomePage = async (showBrowser: boolean): Promise<Page> => {
  try {
    const browser = await puppeteer.launch({
      headless: !showBrowser,
    });
    const page = (await browser.pages())[0];
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
    );

    await login(page);

    await page.goto('https://www.misim.gov.il/emdvhmfrt/wViewDuchot.aspx', {
      waitUntil: ['networkidle2', 'domcontentloaded'],
    });

    return page;
  } catch (e) {
    throw new Error(`newHomePage - ${(e as Error)?.message}`);
  }
};
