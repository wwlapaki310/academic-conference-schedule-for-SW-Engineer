let conferenceData = {}; // グローバルスコープに空のオブジェクトとして定義
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNlTx2lmBdfMmCedXLRXp0O3GqyZRF6a0DM4WJT5zAT9FiJhNooBmcq1uh8wBol_XuSdFPcpiGxyZS/pub?output=csv';

// CSVをパースしてconferenceDataオブジェクトを構築する関数
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = {};

    // 正規表現でカンマ区切りをパース（"..."内のカンマは無視）
    const regex = /,(?=(?:(?:[^\"]*\"){2})*[^\"]*$)/;

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(regex);
        if (values.length < headers.length) continue;

        const conference = {};
        let name = '';

        headers.forEach((header, index) => {
            let value = values[index] ? values[index].trim() : '';
            // "で囲まれた値の場合、前後の"を削除
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1).replace(/""/g, '"'); // "" を " に置換
            }

            if (header === 'name') {
                name = value;
            } else if (header === 'keyTopics') {
                conference[header] = value.split(';').map(topic => topic.trim());
            } else if (header === 'difficulty') {
                conference[header] = parseInt(value, 10) || 0;
            } else {
                conference[header] = value;
            }
        });

        if (name) {
            data[name] = conference;
        }
    }
    return data;
}


// ページの読み込み時にデータをフェッチして初期化
document.addEventListener('DOMContentLoaded', () => {
    fetch(csvUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvText => {
            conferenceData = parseCSV(csvText);
        })
        .catch(error => {
            console.error('Error fetching or parsing CSV:', error);
            // エラー時のフォールバックとして、ローカルのデータを使うなどの処理も考えられる
        });
});


// Get modal element
const modal = document.getElementById('conferenceModal');
const closeBtn = document.getElementsByClassName('close')[0];

// Function to show conference info
function showConferenceInfo(conferenceName) {
    const data = conferenceData[conferenceName];
    if (!data) {
        console.error(`Conference data not found for: ${conferenceName}`);
        return;
    }

    // Set title
    document.getElementById('modalTitle').textContent = conferenceName;
    document.getElementById('modalFullName').textContent = data.fullName;

    // Generate difficulty stars
    let difficultyStars = '';
    for (let i = 0; i < 5; i++) {
        if (i < data.difficulty) {
            difficultyStars += '<span class="difficulty-star">★</span>';
        } else {
            difficultyStars += '<span class="difficulty-star" style="color: #ddd;">★</span>';
        }
    }

    // Generate tier badge
    let tierClass = 'tier-a';
    if (data.tier === 'A*') tierClass = 'tier-a-star';
    else if (data.tier === 'B') tierClass = 'tier-b';
    else if (data.tier === 'Industry') tierClass = 'tier-b';

    // Generate tags
    let tagsHtml = Array.isArray(data.keyTopics) ? data.keyTopics.map(topic => `<span class="tag">${topic}</span>`).join('') : '';

    // Generate modal body
    const bodyHtml = `
        <div class="info-section">
            <h3>📊 基本情報</h3>
            <div class="info-row">
                <div class="info-label">🏷️ 分野</div>
                <div class="info-value"><strong>${data.field || 'N/A'}</strong></div>
            </div>
            <div class="info-row">
                <div class="info-label">📁 カテゴリ</div>
                <div class="info-value">${data.category || 'N/A'}</div>
            </div>
            <div class="info-row">
                <div class="info-label">🏆 ランク</div>
                <div class="info-value"><span class="tier-badge ${tierClass}">${data.tier || 'N/A'}</span></div>
            </div>
        </div>

        <div class="info-section">
            <h3>📈 難易度・競争率</h3>
            <div class="info-row">
                <div class="info-label">⭐ 難易度</div>
                <div class="info-value">
                    <div class="difficulty">${difficultyStars}</div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">📉 採択率</div>
                <div class="info-value"><span class="acceptance-rate">${data.acceptanceRate || 'N/A'}</span></div>
            </div>
            <div class="info-row">
                <div class="info-label">📊 影響力指標</div>
                <div class="info-value">${data.impactFactor || 'N/A'}</div>
            </div>
        </div>

        <div class="info-section">
            <h3>📝 概要</h3>
            <p style="line-height: 1.6; color: #495057;">${data.description || 'N/A'}</p>
        </div>

        <div class="info-section">
            <h3>🔑 主要トピック</h3>
            <div class="tags">${tagsHtml}</div>
        </div>

        <div class="info-section">
            <h3>💡 投稿のヒント</h3>
            <p style="line-height: 1.6; color: #495057; background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                ${data.tips || 'N/A'}
            </p>
        </div>
    `;

    document.getElementById('modalBody').innerHTML = bodyHtml;
    modal.style.display = 'block';
}

// Close modal when clicking X
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});
