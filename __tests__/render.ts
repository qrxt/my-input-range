import "expect-puppeteer";
import { pageExtend } from "puppeteer-jquery";

import Range from "../src/range/range";

declare global {
  interface Window {
    $: any
  }
}

describe("Slider: render", () => {
  beforeAll(async () => {
    const jquery = await page.evaluate(() => window.fetch('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js').then((res) => res.text()));
    await page.goto("https://google.com");
    await page.evaluate(jquery);
  })

  test("asdasd", async () => {
    await page.evaluate(() => {
      console.log(window.$("img"));
    });

    expect(true).toBeTruthy();
  });
});

// describe("Google", () => {
//   beforeAll(async () => {
//     await page.goto("https://google.com")
//   })

//   it("should display \"google\" text on page", async () => {
//     await expect(page.title()).resolves.toMatch("Google");
//   })
// })

