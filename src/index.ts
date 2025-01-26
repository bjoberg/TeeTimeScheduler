import puppeteer from "puppeteer";
import * as AustinMunicipals from "./AustinMunicipals";
import * as definitions from "./definitions";

const date = new Date("January 29, 2025");
const courseId = definitions.AustinMunicipalCourse.RoyKizer;
const numberOfPlayers = 4;
const startTime = "12:12 PM";
const endTime = "2:00 PM";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  await page.goto(AustinMunicipals.url);
  await AustinMunicipals.selectCourse(page, courseId);
  await AustinMunicipals.selectBeginTime(page);
  await AustinMunicipals.selectBeginDate(page, date);
  await AustinMunicipals.selectNumberOfPlayers(page, numberOfPlayers);
  await AustinMunicipals.selectSearch(page);
  await AustinMunicipals.selectTime(page, startTime, endTime);

  // await browser.close();
})();
