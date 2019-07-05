#【Puppeteer_超入門】
## ~手作業で画面テストするのつらい！から抜け出そう~

### 内容
・puppeteerとは
・puppeteerインストール
・puppeteerハンズオン
・puppeteerソース説明と作り方説明

#### puppeteerとは
GUIを操作することなく、プログラムからAPIでブラウザ(Chrome)を制御できる Node.js で作られたライブラリです。
ヘッドレス(GUIなし)でも制御できるので高速です。

要するに、人は画面を手動操作しますが puppeteer はコードで書いて画面操作ができる感じです。

ここ読めば説明はだいたいOK
https://webbibouroku.com/Blog/Article/puppeteer

#### puppeteerインストール
コンソール上で
`npm install puppeteer`

これで準備完了(ちょっと時間がかかります)

#### puppeteerハンズオン1
とりあえず Git Clone どうぞ
`git clone https://github.com/ryo-yamamoto-seattleconsulting/study-puppeteer.git`

そのディレクトリでとりあえず動かしてみましょう
`cd study-puppeteer`
`node sample1.js`

画面で勝手に動きます
終わったら screenshot フォルダ配下に sample1.png があると思います

答えあわせ。
自分でグーグル検索でシアトルコンサルティングと入力して、スクショと同じ状態なのか見てみよう。
（多少差異があるときはあります、検索ページは常に更新されていきますから）

ソースコードにコメントを書いておきました。
読むとおおよそわかります。

#### puppeteerハンズオン2
シアトルコンサルティングの求人ページに自分の情報を入力してみよう
とはいえ、実際に応募するわけにはいかないのでどうやって入力していけばいいのかをメインに

使うファイル
・seattle.js

シアトル応募ページ
https://hrmos.co/pages/seattle-consulting/jobs/0000001/apply

氏名とふりがなに値を入力してみよう
GoogleDeveloperToolを使います（Macなら、cmd + opt + i　で起動します）

GDTを開いたら、cmd + shift + C を押してから氏名のテキストボックスをクリック
GDTのElementsタブで下のソースに焦点が向いてると思います
```<input class="l ng-pristine ng-invalid ng-touched" hrm-input="" tooltip-danger="" triggers="focus" _nghost-c23="" type="text" placeholder="例）田中 太郎">```

sample1.js と同じ粒度で `type="text"` を使えばOK... にはならず
GDTのConsoleで下のコマンドを実施
`document.querySelectorAll('input[type="text"]')`

すると、12個も```input[type="text"]```を使ってしまっています
puppeteerはこの場合、一番最初のデータを対象にしてしまうのでふりがなに入力するソースをかけなくなってしまう

そのため、指定できるように宣言してあげないとダメです
焦点があたっているソース状で右クリック > copy > copy selector を実施
貼り付けると下のような情報
```body > app-root > ng-component > div > div > app-card > div > div > app-custom-form > form > div:nth-child(2) > app-custom-section.ng-pristine.ng-invalid.ng-touched > app-card-section > div > table > tbody > tr:nth-child(1) > td > app-custom-form-text-item > input```

seattle.js の19行目、””の中に貼り付けます
情報が過分にあるので、下のコードになるまで情報を削ります（TimeOutの原因になったりします）
"tr:nth-child(1) > td > app-custom-form-text-item > input"

同じ粒度でふりがなの情報を貼り付けましょう

準備ができました
コンソール上で下を実行します
`node seattle.js`

screenshotフォルダにseattle.pngが出力され、氏名とふりがなに値が入力されたキャプチャーが保存されています

OKです！

#### 最後に
今回は入力をしただけで終わりましたが、下の記事を参考にするとボタン操作などがわかります。
https://qiita.com/rh_taro/items/32bb6851303cbc613124

次回はさわりだけではなく、実際のテストを想定した講座を実施します。
