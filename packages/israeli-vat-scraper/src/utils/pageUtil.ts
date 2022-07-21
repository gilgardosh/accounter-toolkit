import { ElementHandle, Page } from 'puppeteer';

export const getSelectOptions = async (
  page: Page,
  selector: string
): Promise<
  {
    name: string;
    value: string;
  }[]
> => {
  const options = await page.evaluate((optionSelector) => {
    return Array.from(document.querySelectorAll(optionSelector))
      .filter((o) => o.value)
      .map((o) => {
        return {
          name: o.text,
          value: o.value,
        };
      });
  }, selector);

  return options;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const waitAndClick = async (
  page: Page,
  selector: string
): Promise<void> => {
  const button = await waitForSelectorPlus(page, selector);
  if (!button) {
    console.error(`Error finding button by selector ${selector}`);
    return;
  }
  await button.click();
  return;
};

export const waitForSelectorPlus = async (
  page: Page,
  selector: string
): Promise<ElementHandle<Element> | null> => {
  return await page
    .waitForSelector(selector)
    .then((element) => {
      return element;
    })
    .catch(async () => {
      console.debug(`Activating safety net for selector ${selector}`);
      await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
      return await page.waitForSelector(selector);
    });
};
