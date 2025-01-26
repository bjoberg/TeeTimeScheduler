import { Page } from "puppeteer";
import * as definitions from "./definitions";
import * as timeUtils from "./utils/TimeUtils";

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

export const selectTime = async (
  page: Page,
  startTime: string,
  endTime: string
) => {
  await page.waitForSelector("#grwebsearch_output_table", { visible: true });

  const startTimeInMinutes = timeUtils.convert12HourToMinutes(startTime);
  const endTimeInMinutes = timeUtils.convert12HourToMinutes(endTime);

  const availableTimes = await page.$$eval(
    "#grwebsearch_output_table > tbody tr",
    (rows) => {
      return rows.map((row) => {
        const cells = row.querySelectorAll("td");
        const timeCell = cells.item(2);
        return timeCell.innerText;
      });
    }
  );

  type time = string;
  type rowIndex = number;
  const acceptableTimesMap = new Map<rowIndex, time>();

  availableTimes.forEach((time, index) => {
    const timeInMinutes = timeUtils.convert12HourToMinutes(time);
    if (
      timeInMinutes >= startTimeInMinutes &&
      timeInMinutes <= endTimeInMinutes
    ) {
      acceptableTimesMap.set(index, time);
      console.log(`Added ${time} to acceptable times list.`);
    }
  });

  for (const [key, value] of acceptableTimesMap.entries()) {
    page
      .locator(
        `#grwebsearch_output_table > tbody tr:nth-child(${
          key + 1
        }) > td.button-cell.button-cell--cart > a`
      )
      .click();
    console.log(`${value} selected.`);
    break;
  }
};
