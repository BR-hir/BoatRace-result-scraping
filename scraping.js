const puppeteer = require("puppeteer");
// const inputDate = require("./input.js");
const readline = require("readline");

class BrScraping {
  constructor() {
    this.answerDate;
    this.answerPlace;
    this.brPlace;
    this.answerRace;
    this.place = {
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
  }

  async prompt(msg) {
    console.log(msg);
    const answer = await this.question("> ");
    return answer.trim();
  }

  question(question) {
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
  }

  async doScraping() {
    console.log("questionDate");
    await this.questionDate();
    await this.questionPlace();
    await this.questionRace();
    this.getData();
  }

  async questionDate() {
    console.log("step1");
    this.answerDate = await this.prompt("please input date (e.g. 20220515)");
    if (this.answerDate.length === 8) {
      return this.answerDate;
    } else {
      throw new Error("please input date like 20220515");
    }
  }

  async questionPlace() {
    let judge = false;
    this.answerPlace = await this.prompt(
      "please input boat race place (e.g.gamagori)"
    );
    for (const key in this.place) {
      if (this.answerPlace === key) {
        judge = true;
      }
    }
    if (judge) {
      this.brPlace = this.place[this.answerPlace];
      return this.brPlace;
    } else {
      throw new Error("the boat race place is not available");
    }
  }
  // console.log("place : ", place[answerPlace]);
  async questionRace() {
    this.answerRace = await this.prompt("please input race number (e.g. 06)");
    console.log(typeof Number(this.answerRace));
    if (
      this.answerRace.length === 2 &&
      Number(this.answerRace) < 13 &&
      Number(this.answerRace) > 0
    ) {
      return this.answerRace;
    } else {
      throw new Error("input number 01 to 12");
    }
  }

  async getData() {
    const browser = await puppeteer.launch({
      headless: false, // 動作確認するためheadlessモードにしない
      slowMo: 500, // 動作確認しやすいようにpuppeteerの操作を遅延させる
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.boatrace.jp/owpc/pc/race/raceresult?rno=${Number(
        this.answerRace
      )}&jcd=${Number(this.brPlace)}&hd=${Number(this.answerDate)}`
    );
    const selector = await page.$(".is-w495");
    await selector.screenshot({ path: "result.png" });
    await page.goto(
      "file:///Users/s-kanechi/Public/bootcamp/sprint/BoatRace-result-scraping/index.html"
    );

    //   getPlaceHasRace(answerDate);
  }
}

const test = new BrScraping();
test.doScraping();
module.exports = BrScraping;

// async function getPlaceHasRace(answerDate) {
//   const browser = await puppeteer.launch({
//     headless: false, // 動作確認するためheadlessモードにしない
//     slowMo: 500, // 動作確認しやすいようにpuppeteerの操作を遅延させる
//   });
//   const page = await browser.newPage();
//   await page.goto(
//     `https://www.boatrace.jp/owpc/pc/race/index?hd=${answerDate}`
//   );
//   const selector = await page.$(".is-arrow1 is-fBold is-fs15");
//   console.log(selector);
//   await selector.screenshot({ path: "result.png" });
//   await page.goto("index.html");
// }

// class Scraping {
//   async getScreenShot(race, place, date) {
//     const browser = await puppeteer.launch({
//       headless: false, // 動作確認するためheadlessモードにしない
//       slowMo: 500, // 動作確認しやすいようにpuppeteerの操作を遅延させる
//     });
//     const page = await browser.newPage();
//     //   await page.goto("https://www.boatrace.jp/owpc/pc/race/index");
//     await page.goto(
//       // "https://www.boatrace.jp/owpc/pc/race/raceresult?rno=5&jcd=04&hd=20220515"
//       `https://www.boatrace.jp/owpc/pc/race/raceresult?rno=${race}&jcd=${place}&hd=${date}`
//     );
//     const selector = await page.$(".is-w495");
//     await selector.screenshot({ path: "result.png" });
//     await browser.close();
//   }

//   async getBoatracePlace(date) {}
// }

// getScreenShot("07", "04", "20220514");
