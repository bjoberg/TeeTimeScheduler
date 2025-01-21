import puppeteer from "puppeteer";
import * as AustinMunicipals from "./AustinMunicipals";
import * as definitions from "./definitions";

const date = new Date("January 23, 2025");
const numberOfPlayers = definitions.AustinMunicipalCourse.RoyKizer;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });

  await page.goto(AustinMunicipals.url);
  await AustinMunicipals.selectCourse(page, 4);
  await AustinMunicipals.selectBeginTime(page);
  await AustinMunicipals.selectBeginDate(page, date);
  await AustinMunicipals.selectNumberOfPlayers(page, numberOfPlayers);
  await AustinMunicipals.selectSearch(page);

  // await browser.close();
})();
