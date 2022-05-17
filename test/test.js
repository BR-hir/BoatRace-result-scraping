const { expect } = require("chai");
const BrScraping = require("../scraping.js");

describe("test", () => {
  it("expect test", () => {
    const testBr = new BrScraping();
    testBr.doScraping();
    expect(1).to.equal(1);
  });
});
