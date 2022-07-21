import { config } from 'dotenv';
import { vatScraper } from '..';

config();

const testRun = async () => {
  vatScraper(undefined, { years: [[2020, [5]]], visibleBrowser: true });
};

testRun().catch(e => {
  console.error(e);
  process.exit(1);
});
