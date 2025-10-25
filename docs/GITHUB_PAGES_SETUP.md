# GitHub Pages セットアップガイド

このガイドでは、リポジトリをGitHub Pagesで公開する方法を説明します。

## 🚀 GitHub Pages の有効化

1. GitHubリポジトリのページにアクセス
   ```
   https://github.com/wwlapaki310/academic-conference-schedule-for-SW-Engineer
   ```

2. **Settings**（設定）タブをクリック

3. 左側のメニューから**Pages**を選択

4. **Source**（ソース）セクションで以下を設定:
   - **Branch**: `main` を選択
   - **Folder**: `/ (root)` を選択

5. **Save**ボタンをクリック

6. 数分待つと、ページが公開されます 🎉

## 🌐 公開URL

設定完了後、以下のURLでアクセスできます:

```
https://wwlapaki310.github.io/academic-conference-schedule-for-SW-Engineer/
```

## 📝 更新方法

### ローカルでの編集

```bash
# リポジトリをクローン
git clone https://github.com/wwlapaki310/academic-conference-schedule-for-SW-Engineer.git
cd academic-conference-schedule-for-SW-Engineer

# index.htmlを編集
# エディタで index.html を開いて編集

# 変更をコミット
git add index.html
git commit -m "Update conference information"

# GitHubにプッシュ
git push origin main
```

### GitHub上での直接編集

1. `index.html` ファイルを開く
2. 鉛筆アイコン（✏️）をクリックして編集
3. 変更を保存してコミット

変更は自動的にGitHub Pagesに反映されます（通常1-2分）。

## 🎨 カスタマイズ

### スタイルの変更

`index.html` の `<style>` タグ内でCSSを編集できます:

- 配色の変更: `background`, `color` プロパティ
- レイアウトの調整: `padding`, `margin`, `width` プロパティ
- フォントの変更: `font-family` プロパティ

### コンテンツの更新

HTMLのテーブル部分を編集して学会情報を追加・更新できます。

## 🔧 トラブルシューティング

### ページが表示されない場合

1. **Settings > Pages** で正しく設定されているか確認
2. ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）
3. 数分待ってから再度アクセス

### 変更が反映されない場合

1. GitHubにプッシュが完了しているか確認
2. **Actions** タブでビルド状況を確認
3. 緑色のチェックマーク ✓ が表示されていればOK

## 📱 モバイル対応

このサイトはレスポンシブデザインを採用しており、スマートフォンやタブレットでも快適に閲覧できます。

## 🔗 カスタムドメインの設定（オプション）

独自ドメインを使用したい場合:

1. **Settings > Pages** で**Custom domain**を設定
2. DNSレコードを設定
3. **Enforce HTTPS**を有効化

詳細は[GitHub Docsカスタムドメインガイド](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site)を参照してください。

## 📊 アクセス解析（オプション）

Google Analyticsなどのアクセス解析を追加する場合は、`index.html` の `<head>` タグ内にトラッキングコードを追加します。

---

質問やサポートが必要な場合は、GitHubのIssuesでお気軽にお尋ねください！
