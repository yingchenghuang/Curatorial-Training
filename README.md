# Curatorial Training / 策展觀看

RAUM+ 的策展觀看思維訓練 App。把每一次看展整理成可回看、可比較、可轉化的判斷，而不是累積完成率。

## 功能

- 今日：最新觀看紀錄、狀態篩選、快速新增第一拍
- 單場詳情：五維 `/25` 與十維 `/100` 校準、六段觀看筆記
- 年度索引：個人與班級視角
- 策展原則：保留每次改寫的判斷歷史
- 判斷軌跡：總分、五維變化、出海口與三十秒篩選
- 匯出：CSV／Notion、Apple 備忘錄純文字、Markdown
- Local-first：新增紀錄保存在瀏覽器 `localStorage`
- PWA：安裝後可離線開啟，核心檔案由 Service Worker 快取

## 本機預覽

```bash
python3 -m http.server 4173
```

開啟 `http://localhost:4173/`。Service Worker 需要 HTTP 或 HTTPS，直接雙擊 HTML 不會啟用完整離線快取。

## 技術

純靜態 HTML、CSS、JavaScript，無建置步驟、無外部資料庫，可直接部署到 GitHub Pages。

設計系統沿用 RAUM+：紙白 `#f7f6f5`、墨黑 `#111`、識別藍 `#003dff`、線灰 `#b9b8b5`；標題採 Noto Serif TC，介面採 Archivo，英文斜體採 Newsreader。
