import dotenv from 'dotenv';
import { createRequire } from 'module';

import { getEnvCredentials, updateCredentials } from './handlers/login-handler.js';
import { homePageHandler } from './handlers/main-page-handler.js';
import { validateSchema } from './utils/schema-validator.js';
import { Config, Report, UserCredentials } from './utils/types.js';

dotenv.config();

const defaultConfig: Config = {
  visibleBrowser: false,
  expandData: true,
  sortDescending: false,
  validate: true,
  printErrors: true,
  years: undefined,
};

export const vatScraper = async (credentials?: UserCredentials, userConfig: Partial<Config> = {}): Promise<Report[]> => {
  try {
    updateCredentials(credentials || getEnvCredentials());
    const config = { ...defaultConfig, ...userConfig };

    const reports = await homePageHandler(config);

    if (config.validate) {
      const requireFile = createRequire(import.meta.url); // construct the require method
      const schema = requireFile('./vatSchema.json'); // use the require method
      const validation = await validateSchema(schema, reports);
      console.log(validation);
    }

    return reports;
  } catch (e) {
    throw new Error(`VatScraper - ${(e as Error)?.message || e}`);
  }
};
