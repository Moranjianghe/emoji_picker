# 表情小島 — Emoji 拾取器

一個以 A 島顏文字拾取器為靈感、改為挑選標準 Unicode emoji 的輕量網頁工具。搜尋常用表情、點一下複製，最近使用的表情會留在本機。

## 功能

- 依笑臉、人物、動物、食物、旅遊、活動、物品、符號與旗幟瀏覽近 500 個常用 emoji。
- 搜尋支援繁體中文、簡體中文與英文名稱／關鍵字，例如「開心 / 开心 / happy」、「愛心 / 爱心 / heart」、「食物 / food」。
- 點擊 emoji 即可複製，最近使用清單會保留最近 18 個。
- 支援 PWA 安裝與 Service Worker 離線使用。
- 響應式版面、鍵盤操作與減少動態效果支援。
- 不使用前端框架或第三方 JavaScript 套件。

## 本機執行

以任一靜態伺服器提供此資料夾即可；需要透過 HTTP(S) 開啟才能載入 emoji JSON 與註冊 Service Worker。

```bash
python3 -m http.server 8000
```

接著開啟 `http://localhost:8000`。

## 授權與資料

程式碼依照 MIT License 發布。Emoji 由 Unicode 字元呈現；各平台的字形樣式會因作業系統與字型而不同。
