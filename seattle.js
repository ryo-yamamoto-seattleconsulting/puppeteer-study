const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // シアトル求人票
  await page.goto('https://hrmos.co/pages/seattle-consulting/jobs/0000001/apply');

  // 元コード（copy selector）
  // const selector1 = "body > app-root > ng-component > div > div > app-card > div > div > app-custom-form > form > div:nth-child(2) > app-custom-section.ng-pristine.ng-invalid.ng-touched > app-card-section > div > table > tbody > tr:nth-child(1) > td > app-custom-form-text-item > input"
  // const selector2 = "body > app-root > ng-component > div > div > app-card > div > div > app-custom-form > form > div:nth-child(2) > app-custom-section.ng-pristine.ng-invalid.ng-touched > app-card-section > div > table > tbody > tr:nth-child(2) > td > app-custom-form-text-item > input"

  // 改善コード
  // const selector1 = "tr:nth-child(1) > td > app-custom-form-text-item > input"
  // const selector2 = "tr:nth-child(2) > td > app-custom-form-text-item > input"

  // ここに貼り付け
  const selector1 = "" // 氏名
  const selector2 = "" // ふりがな

  // 情報が更新されるまで待機
  await page.waitForSelector('input');

  // 入力
  await page.type(selector1, 'シアトル太朗');
  await page.type(selector2, 'しあとるたろう');

  // スクショ
  await page.screenshot({ path: 'screenshot/seattle.png', fullPage: true});

  // ブラウザを閉じる
  await browser.close();
})();