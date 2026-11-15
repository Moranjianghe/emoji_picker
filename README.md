# 顏文字小島 — A 島顏文字拾取器

一個輕巧的顏文字搜尋與複製工具，沿用 A 島拾取器的核心體驗，並以清楚的搜尋入口重新整理頁面。

## 功能

- 點擊顏文字即可複製，並顯示複製狀態。
- 儲存最近使用的 10 個顏文字，可隨時清空。
- 搜尋支援繁體中文、簡體中文與英文心情關鍵字，例如「開心 / 开心 / happy」、「哭 / sad」、「驚訝 / surprised」。
- 支援 PWA 安裝與 Service Worker 離線使用。
- 響應式版面、鍵盤操作與減少動態效果支援。
- 不使用前端框架或第三方 JavaScript 套件。

## 本機執行

以任一靜態伺服器提供此資料夾即可；需要透過 HTTP(S) 開啟才能載入顏文字 JSON 與註冊 Service Worker。

```bash
python3 -m http.server 8000
```

接著開啟 `http://localhost:8000`。

## 來源與授權

顏文字資料沿用 [A_Island_kaomoji_picker_web_page](https://github.com/Moranjianghe/A_Island_kaomoji_picker_web_page) 的 `kaomoji.json`，該專案以 MIT License 發布。顏文字本身的來源與權利依原專案說明，未必受程式碼授權涵蓋。
