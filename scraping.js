const puppeteer = require("puppeteer");
// const inputDate = require("./input.js");
const readline = require("readline");

const place = {
  kiryu: "01",
  oda: "02",
  edogawa: "03",
  heiwajima: "04",
  tamagawa: "05",
  hamanako: "06",
  gamagori: "07",
  tokoname: "08",
  tsu: "09",
  mikuni: "10",
  biwako: "11",
  suminoe: "12",
  amagasaki: "13",
  naruto: "14",
  marugame: "15",
  kozima: "16",
  miyajima: "17",
  tokuyama: "18",
  shimonoseki: "19",
  wakamatsu: "20",
  ashiya: "21",
  fukuoka: "22",
  karatsu: "23",
  oomura: "24",
};

const prompt = async (msg) => {
  console.log(msg);
  const answer = await question("> ");
  return answer.trim();
};

const question = (question) => {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    readlineInterface.question(question, (answer) => {
      resolve(answer);
      readlineInterface.close();
    });
  });
};

async function promptTest() {
  const answerDate = await prompt("please input date (e.g. 20220515)");
  console.log(answerDate);
  const answerPlace = await prompt(
    "please input boat race place (e.g.gamagori)"
  );
  console.log("place : ", place[answerPlace]);
  let brPlace = place[answerPlace];

  //   console.log(answerPlace);

  const answerRace = await prompt("please input race number (e.g. 06)");
  console.log(answerRace);

  const browser = await puppeteer.launch({
    headless: false, // 動作確認するためheadlessモードにしない
    // slowMo: 500, // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.boatrace.jp/owpc/pc/race/raceresult?rno=${Number(
      answerRace
    )}&jcd=${Number(brPlace)}&hd=${Number(answerDate)}`
  );
  const selector = await page.$(".is-w495");
  await selector.screenshot({ path: "result.png" });
  await page.goto(
    "file:///Users/hiroki/BTC/BoatRace-result-scraping/index.html"
  );

  //   getPlaceHasRace(answerDate);
}
promptTest();

async function getPlaceHasRace(answerDate) {
  const browser = await puppeteer.launch({
    headless: false, // 動作確認するためheadlessモードにしない
    slowMo: 500, // 動作確認しやすいようにpuppeteerの操作を遅延させる
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.boatrace.jp/owpc/pc/race/index?hd=${answerDate}`
  );
  const selector = await page.$(".is-arrow1 is-fBold is-fs15");
  console.log(selector);
  await selector.screenshot({ path: "result.png" });
  await page.goto("index.html");
}

class Scraping {
  async getScreenShot(race, place, date) {
    const browser = await puppeteer.launch({
      headless: false, // 動作確認するためheadlessモードにしない
      slowMo: 500, // 動作確認しやすいようにpuppeteerの操作を遅延させる
    });
    const page = await browser.newPage();
    //   await page.goto("https://www.boatrace.jp/owpc/pc/race/index");
    await page.goto(
      // "https://www.boatrace.jp/owpc/pc/race/raceresult?rno=5&jcd=04&hd=20220515"
      `https://www.boatrace.jp/owpc/pc/race/raceresult?rno=${race}&jcd=${place}&hd=${date}`
    );
    const selector = await page.$(".is-w495");
    await selector.screenshot({ path: "result.png" });
    await browser.close();
  }

  async getBoatracePlace(date) {}
}

// getScreenShot("07", "04", "20220514");
