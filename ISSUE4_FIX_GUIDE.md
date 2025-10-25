# Issue#4 修正ガイド

## 概要
矢印を削除し、年ごとの背景色でイベントをグループ化します。

## 修正内容

### 1. CSSの修正（index.html 行155-173付近）

#### 削除する部分
```css
/* Arrow connectors - connecting blocks */
.cell-with-arrow {
    position: relative;
}

.cell-with-arrow::after {
    content: '⟹';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3em;
    color: #2980b9;
    font-weight: bold;
    z-index: 5;
    text-shadow: 0 0 5px white, 0 0 10px white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}
```

#### 追加する部分（同じ位置に）
```css
/* Year grouping backgrounds */
.year-2025 {
    background: rgba(33, 150, 243, 0.08);
}

.year-2026 {
    background: rgba(76, 175, 80, 0.08);
}

.year-2027 {
    background: rgba(156, 39, 176, 0.08);
}
```

### 2. HTMLの修正

#### 2.1 全ての `class="cell-with-arrow"` を削除
エディタの検索置換機能を使用：
- 検索: ` class="cell-with-arrow"`
- 置換: （空白）

#### 2.2 年ごとの背景色クラスを追加

各学会の締切から開催までのセルに年のクラスを追加します。

**例: NeurIPS 2025の行**

変更前:
```html
<td><div class="event deadline">締切</div></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><div class="event notification">通知</div></td>
<td></td>
...
<td><div class="event conference">開催</div></td>
```

変更後:
```html
<td class="year-2025"><div class="event deadline">締切</div></td>
<td class="year-2025"></td>
<td class="year-2025"></td>
<td class="year-2025"></td>
<td class="year-2025"></td>
<td class="year-2025"><div class="event notification">通知</div></td>
<td class="year-2025"></td>
...
<td class="year-2025"><div class="event conference">開催</div></td>
```

**ルール:**
- 締切（または最初のイベント）から開催までの全てのセルに年のクラスを追加
- 2025年のイベント: `class="year-2025"`
- 2026年のイベント: `class="year-2026"`
- 2027年のイベント: `class="year-2027"`
- 空のセルにもクラスを追加（背景色を連続させるため）

### 3. 説明文の修正（index.html 行429付近）

変更前:
```html
各学会の重要な日程をビジュアルに表示しています。<strong>論文締切</strong>（赤）からスタートし、
<strong>採否通知</strong>（青）を経て、<strong>本会議</strong>（緑）まで矢印でつながっています。
```

変更後:
```html
各学会の重要な日程をビジュアルに表示しています。<strong>論文締切</strong>（赤）からスタートし、
<strong>採否通知</strong>（青）を経て、<strong>本会議</strong>（緑）まで、年ごとの背景色でグループ化されています。
```

## 期待される効果

- ✅ 矢印による視覚的なノイズが削除される
- ✅ 年ごとのイベントが色で明確にグループ化される
- ✅ 2025年（青）、2026年（緑）、2027年（紫）と視覚的に区別可能
- ✅ シンプルで洗練されたデザイン

## テスト方法

1. ブラウザでindex.htmlを開く
2. 各学会の行で、締切から開催までの期間に薄い背景色が表示されることを確認
3. 2025年、2026年、2027年で色が異なることを確認
4. 矢印が表示されていないことを確認

## 注意事項

- HTMLの修正は手作業が必要です（多数の行に対応）
- 各学会ごとに締切から開催までの範囲を確認して、正しい年のクラスを追加してください
- 代表的な例（NeurIPS、ICML、CVPR）から始めて、動作確認することをお勧めします
