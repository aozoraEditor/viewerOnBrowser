# 青空エディタ（縦書き）

青空文庫記法のテキストをWeb上で縦書きでプレビューしながら入力できるシンプルなエディタです

# OverView

使い方はとても簡単です。

- 左側のテキストエリアに文章を入力すると、右側に表示されます。
- 表示エリアをクリックすると縦書きと横書きが切り替わります。
- ダウンロードボタンをクリックすると印刷画面が表示されます。そのうち縦書きに対応します。


![screenshot](https://user-images.githubusercontent.com/44860769/48186997-15258e00-e37d-11e8-9717-1fc0bec0323a.png)



青空文庫記法に対応しています。またmarkedjsを使用しているので、見出し、リスト、引用などのマークダウンも使用できます。詳しくはこちら→　https://marked.js.org/#/README.md


## 対応している青空記法

| 記法 | フォーマット | 例 |
----|----|----
|ルビ | ｜文字列《ルビ》 | これは｜日本語《にほんご》です|
|圏点|文字列［＃「文字列」に傍点］|ここに圏点［＃「圏点」に傍点］を打つ|
|太字|文字列［＃「文字列」は太字］|ここは太字［＃「太字」は太字］です|
|大見出し|文字列［＃「文字列」は大見出し|大見出しです［＃「大見出しです」は大見出し］|
|中見出し|文字列［＃「文字列」は中見出し|中見出しです［＃「中見出しです」は中見出し］|
|小見出し|文字列［＃「文字列」は小見出し|小見出しです［＃「小見出しです」は中見出し］|

（順次追加）


# Install

プロジェクトファイルをダウンロードして適当な場所においてください。editor.htmlをブラウザで開くと使用できます。

# 今後実装予定の機能

- 縦書きPDF出力・印刷
- 青空記法対応
- その他の記法対応

