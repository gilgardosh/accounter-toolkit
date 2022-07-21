import { ElementHandle, Page } from 'puppeteer';

import type { Logger } from './types';

export const getSelectOptions = async (
  page: Page,
  selector: string
): Promise<
  {
    name: string;
    value: string;
  }[]
> => {
  const options = await page.evaluate(optionSelector => {
    return Array.from(document.querySelectorAll(optionSelector))
      .filter(o => o.value)
      .map(o => {
        return {
          name: o.text,
          value: o.value,
        };
      });
  }, selector);

  return options;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const waitAndClick = async (page: Page, selector: string, logger: Logger): Promise<void> => {
  const button = await waitForSelectorPlus(page, selector, logger);
  if (!button) {
    logger.error(`Error finding button by selector ${selector}`);
    return;
  }
  await button.click();
  return;
};

export const waitForSelectorPlus = async (
  page: Page,
  selector: string,
  logger: Logger
): Promise<ElementHandle<Element> | null> => {
  return await page
    .waitForSelector(selector)
    .then(element => {
      return element;
    })
    .catch(async () => {
      logger.debug(`Activating safety net for selector ${selector}`);
      await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
      return await page.waitForSelector(selector);
    });
};
