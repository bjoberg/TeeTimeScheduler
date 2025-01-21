import { Page } from "puppeteer";
import * as definitions from "./definitions";

export const url =
  "https://txaustinweb.myvscloud.com/webtrac/web/search.html?display=detail&module=GR&secondarycode=2";

export const selectCourse = async (
  page: Page,
  id: definitions.AustinMunicipalCourse
) => {
  await page.locator("#secondarycode_vm_1_button").click();
  await page
    .locator(`#secondarycode_vm_1_wrap > div > ul > li:nth-child(${id})`)
    .click();
};

export const selectBeginTime = async (page: Page) => {
  await page.locator("#begintime_vm_5_wrap > input").click();
  await page.locator(`#begintime_vm_5_wrap > ul > li:nth-child(1)`).click(); // 12 am
};

export const selectBeginDate = async (page: Page, date: Date) => {
  await page.locator("#begindate_vm_4_button > svg").click();

  const month = date.getMonth() + 1; // month is 0 indexed, so we will add 1
  const day = date.getDate();
  const year = date.getFullYear();

  // Set the month
  await page.locator("#begindate_vm_4_month_selection_button > svg").click();
  await page
    .locator(
      `#begindate_vm_4_month_selection_wrap > div > ul > li:nth-child(${month})`
    )
    .click();

  // Set the day
  await page.locator("#begindate_vm_4_day_selection_button > svg").click();
  await page
    .locator(
      `#begindate_vm_4_day_selection_wrap > div > ul > li:nth-child(${day})`
    )
    .click();

  // Set the year
  await page.locator("#begindate_vm_4_year_selection_button > svg").click();
  await page
    .locator(
      `#begindate_vm_4_year_selection_wrap > div > ul > li:nth-child(${getYearId(
        year
      )})`
    )
    .click();

  // Click "Done"
  await page.locator("#begindate_vm_4_wrap > div > button.primary").click();
};

/**
 * Based on what I could find the id for year in date picker is the year minus 1899... not sure why
 *
 * @returns date picker id for the year
 */
const getYearId = (year: number) => {
  return year - 1899;
};

export const selectNumberOfPlayers = async (
  page: Page,
  numberOfPlayers: number
) => {
  await page.locator("#numberofplayers_vm_2_button").click();
  await page
    .locator(
      `#numberofplayers_vm_2_wrap > div > ul > li:nth-child(${numberOfPlayers})`
    )
    .click();
};

export const selectSearch = async (page: Page) => {
  await page.locator("#grwebsearch_buttonsearch").click();
};
