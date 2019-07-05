const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,  // 動作確認するためheadlessモードにしない
    slowMo: 500  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  })
  const page = await browser.newPage()

  // googleのページ開きます
  await page.goto('https://www.google.com/')

  // googleの検索窓にシアトルコンサルティングとゆっくり入力します
  await page.type('input[name=q]', 'シアトルコンサルティング', { delay: 100 })

  // 検索を実行します
  await page.click('input[type="submit"]')

  // div a というセレクタが表示されるのを待ちます
  await page.waitForSelector('div a')

  // 今表示されているブラウザページのスクリーンショットを、指定の階層に保存します
  await page.screenshot({ path: 'screenshot/sample1.png', fullPage: true})

  // ブラウザを閉じます
  await browser.close()
})()
