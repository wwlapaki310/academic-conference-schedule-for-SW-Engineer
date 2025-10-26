let conferenceData = []; // 配列として初期化
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSNlTx2lmBdfMmCedXLRXp0O3GqyZRF6a0DM4WJT5zAT9FiJhNooBmcq1uh8wBol_XuSdFPcpiGxyZS/pub?output=csv';

// CSVをパースしてオブジェクトの配列を返す
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    const regex = /,(?=(?:(?:[^\"]*\"){2})*[^\"]*$)/;

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(regex);
        if (values.length < headers.length) continue;

        const conference = {};
        headers.forEach((header, index) => {
            let value = values[index] ? values[index].trim() : '';
            
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.substring(1, value.length - 1).replace(/""/g, '"');
            }

            if (header === 'events') {
                try {
                    conference[header] = JSON.parse(value);
                } catch (e) {
                    console.error('Failed to parse events JSON:', value, e);
                    conference[header] = [];
                }
            } else if (header === 'keyTopics') {
                conference[header] = value.split(';').map(topic => topic.trim());
            } else if (header === 'difficulty') {
                conference[header] = parseInt(value, 10) || 0;
            } else {
                conference[header] = value;
            }
        });
        data.push(conference);
    }
    return data;
}

function renderTimeline(data) {
    const tbody = document.querySelector('.timeline table tbody');
    if (!tbody) return;

    const dateHeaders = Array.from(document.querySelectorAll('.timeline table thead th')).slice(1);
    let year = '';
    const dates = dateHeaders.map(th => {
        const text = th.innerHTML;
        const yearMatch = text.match(/(\d{4})/);
        if (yearMatch) {
            year = yearMatch[1];
        }
        const monthMatch = text.match(/(\d{1,2})月/);
        if (monthMatch) {
            const month = monthMatch[1].padStart(2, '0');
            return `${year}-${month}`;
        }
        return null;
    }).filter(Boolean);

    let html = '';
    let currentCategory = '';
    let categoryId = '';

    data.forEach(conf => {
        if (!conf.name) return;

        if (conf.field && conf.field !== currentCategory) {
            currentCategory = conf.field;
            categoryId = currentCategory.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
            let icon = '🤖';
            if (currentCategory === 'コンピュータビジョン') icon = '👁️';
            else if (currentCategory === 'ロボティクス') icon = '🤖';
            else if (currentCategory === 'HCI・グラフィックス') icon = '🖥️';
            else if (currentCategory === 'セキュリティ') icon = '🔒';
            html += `<tr class="category-header" data-category="${categoryId}"><td colspan="${dates.length + 1}">${icon} ${currentCategory}</td></tr>`;
        }

        // --- Cycle Grouping Logic ---
        const cycleGroups = {};
        if (conf.events) {
            conf.events.forEach(event => {
                const yearMatch = event.label.match(/\'(\d{2})/);
                const cycleKey = yearMatch ? `20${yearMatch[1]}` : 'default';
                if (!cycleGroups[cycleKey]) {
                    cycleGroups[cycleKey] = [];
                }
                cycleGroups[cycleKey].push(event.date);
            });
        }

        const cycleRanges = Object.values(cycleGroups).map(groupDates => {
            if (groupDates.length === 0) return null;
            const minDate = groupDates.reduce((a, b) => a < b ? a : b);
            const maxDate = groupDates.reduce((a, b) => a > b ? a : b);
            return { start: minDate, end: maxDate };
        }).filter(Boolean);

        // --- End Cycle Grouping Logic ---

        html += `<tr class="conference-row" data-category="${categoryId}">
`;
        html += `<td class="conference-name" onclick="showConferenceInfo('${conf.name}')">${conf.name}</td>`;

        let cycleIndex = 0;
        dates.forEach(date => {
            let cycleClass = '';
            for (let i = 0; i < cycleRanges.length; i++) {
                if (date >= cycleRanges[i].start && date <= cycleRanges[i].end) {
                    cycleClass = i % 2 === 0 ? 'cycle-group-even' : 'cycle-group-odd';
                    break;
                }
            }

            const eventsOnDate = conf.events ? conf.events.filter(e => e.date === date) : [];
            let tdClasses = cycleClass;

            html += `<td class="${tdClasses}">`;

            if (eventsOnDate.length > 1) {
                html += `<div class="multi-event">`;
                eventsOnDate.forEach(event => {
                    const specificDate = event.specific_date || '未定';
                    const specificDateAttr = `data-specific-date="${specificDate}" onclick="showDatePopover(this)"`;
                    html += `<div class="event ${event.type}" ${specificDateAttr}>${event.label}</div>`;
                });
                html += `</div>`;
            } else if (eventsOnDate.length === 1) {
                const event = eventsOnDate[0];
                const specificDate = event.specific_date || '未定';
                const specificDateAttr = `data-specific-date="${specificDate}" onclick="showDatePopover(this)"`;
                html += `<div class="event ${event.type}" ${specificDateAttr}>${event.label}</div>`;
            }
            html += `</td>`;
        });

        html += `</tr>`;
    });

    tbody.innerHTML = html;
    setupCollapsibleCategories();
}

// Function to setup collapsible categories
function setupCollapsibleCategories() {
    const headers = document.querySelectorAll('.category-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const categoryId = header.dataset.category;
            const rows = document.querySelectorAll(`.conference-row[data-category="${categoryId}"]`);
            
            header.classList.toggle('collapsed');

            rows.forEach(row => {
                row.classList.toggle('hidden');
            });
        });
    });
}


// Function to update the date display
function updateDateDisplay() {
    const dateElement = document.querySelector('.date-display');
    if (dateElement) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        dateElement.textContent = `🔔 ${formattedDate}時点の情報です`;
    }
}

// Function to add a marker for the current date
function addTodayMarker() {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonthIndex = today.getMonth(); // 0-indexed
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

    const timelineContainer = document.querySelector('.timeline');
    const timelineTable = timelineContainer.querySelector('table');
    const dateHeaders = Array.from(timelineTable.querySelectorAll('thead th'));

    let year = '';
    let todayColumnHeader = null;
    let todayColumnIndex = -1;

    // Find the header for the current month
    for (let i = 1; i < dateHeaders.length; i++) { // Start from 1 to skip "学会"
        const th = dateHeaders[i];
        const text = th.innerHTML;
        const yearMatch = text.match(/(\d{4})/);
        if (yearMatch) {
            year = yearMatch[1];
        }
        const monthMatch = text.match(/(\d{1,2})月/);
        if (monthMatch) {
            const month = monthMatch[1].padStart(2, '0');
            const headerMonth = `${year}-${month}`;
            const todayMonth = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}`;

            if (headerMonth === todayMonth) {
                todayColumnHeader = th;
                todayColumnIndex = i;
                break;
            }
        }
    }

    if (todayColumnHeader) {
        // Remove any existing vertical marker to avoid duplicates
        const existingMarker = timelineContainer.querySelector('.today-vertical-marker');
        if (existingMarker) {
            existingMarker.remove();
        }

        const timelineTable = timelineContainer.querySelector('table');
        const tableRect = timelineTable.getBoundingClientRect(); // Get rect of the table

        const headerRect = todayColumnHeader.getBoundingClientRect();
        const timelineRect = timelineContainer.getBoundingClientRect();

        // Calculate the left position of the line relative to the timeline container
        const percentageAcrossMonth = (currentDay - 1) / (daysInMonth - 1);
        const leftOffsetWithinColumn = headerRect.width * percentageAcrossMonth;
        const totalLeftOffset = (headerRect.left - timelineRect.left) + leftOffsetWithinColumn;

        const todayLine = document.createElement('div');
        todayLine.classList.add('today-vertical-marker');
        todayLine.style.left = `${totalLeftOffset}px`;
        todayLine.style.height = `${tableRect.height}px`; // Use the actual height of the table
        todayLine.style.top = `${tableRect.top - timelineRect.top}px`; // Position relative to timeline container, starting from table's top

        timelineContainer.appendChild(todayLine);

        // Scroll the timeline to the current month
        todayColumnHeader.scrollIntoView({
            inline: 'center',
            block: 'nearest',
            behavior: 'smooth'
        });
    }
}

// ページの読み込み時にデータをフェッチして初期化
document.addEventListener('DOMContentLoaded', () => {
    updateDateDisplay(); // Update the date display

    fetch(csvUrl)
        .then(response => response.ok ? response.text() : Promise.reject(response.status))
        .then(csvText => {
            conferenceData = parseCSV(csvText);
            renderTimeline(conferenceData); // タイムラインを描画
            addTodayMarker(); // 今日の日付マーカーを追加
        })
        .catch(error => {
            console.warn('Failed to fetch from Google Sheets. Trying local data.csv.', error);
            fetch('data.csv') // Fallback to local CSV
                .then(response => response.ok ? response.text() : Promise.reject('Failed to load local CSV'))
                .then(csvText => {
                    conferenceData = parseCSV(csvText);
                    renderTimeline(conferenceData);
                    addTodayMarker(); // 今日の日付マーカーを追加
                })
                .catch(fallbackError => {
                    console.error('Detailed error:', fallbackError); // より詳細なエラーオブジェクトを出力
                    const tbody = document.querySelector('.timeline table tbody');
                    if(tbody) tbody.innerHTML = `<tr><td colspan="31" style="text-align: center; padding: 20px; color: red;">データの読み込みに失敗しました。詳細: ${fallbackError.message || fallbackError}</td></tr>`;
                });
        });
});


// Get modal element
const modal = document.getElementById('conferenceModal');
const closeBtn = document.getElementsByClassName('close')[0];

// Function to show conference info
function showConferenceInfo(conferenceName) {
    const data = conferenceData.find(conf => conf.name === conferenceName);
    if (!data) {
        console.error(`Conference data not found for: ${conferenceName}`);
        return;
    }

    document.getElementById('modalTitle').textContent = data.name;
    document.getElementById('modalFullName').textContent = data.fullName;

    let difficultyStars = '';
    for (let i = 0; i < 5; i++) {
        if (i < data.difficulty) {
            difficultyStars += '<span class="difficulty-star">★</span>';
        } else {
            difficultyStars += '<span class="difficulty-star" style="color: #ddd;">★</span>';
        }
    }

    let tierClass = 'tier-a';
    if (data.tier === 'A*') tierClass = 'tier-a-star';
    else if (data.tier === 'B') tierClass = 'tier-b';
    else if (data.tier === 'Industry') tierClass = 'tier-b';

    let tagsHtml = Array.isArray(data.keyTopics) ? data.keyTopics.map(topic => `<span class="tag">${topic}</span>`).join('') : '';

    const bodyHtml = `
        <div class="info-section">
            <h3>📊 基本情報</h3>
            <div class="info-row"><div class="info-label">🏷️ 分野</div><div class="info-value"><strong>${data.field || 'N/A'}</strong></div></div>
            <div class="info-row"><div class="info-label">📁 カテゴリ</div><div class="info-value">${data.category || 'N/A'}</div></div>
            <div class="info-row"><div class="info-label">🏆 ランク</div><div class="info-value"><span class="tier-badge ${tierClass}">${data.tier || 'N/A'}</span></div></div>
        </div>
        <div class="info-section">
            <h3>📈 難易度・競争率</h3>
            <div class="info-row"><div class="info-label">⭐ 難易度</div><div class="info-value"><div class="difficulty">${difficultyStars}</div></div></div>
            <div class="info-row"><div class="info-label">📉 採択率</div><div class="info-value"><span class="acceptance-rate">${data.acceptanceRate || 'N/A'}</span></div></div>
            <div class="info-row"><div class="info-label">📊 影響力指標</div><div class="info-value">${data.impactFactor || 'N/A'}</div></div>
        </div>
        <div class="info-section"><h3>📝 概要</h3><p style="line-height: 1.6; color: #495057;">${data.description || 'N/A'}</p></div>
        <div class="info-section"><h3>🔑 主要トピック</h3><div class="tags">${tagsHtml}</div></div>
        <div class="info-section"><h3>💡 投稿のヒント</h3><p style="line-height: 1.6; color: #495057; background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">${data.tips || 'N/A'}</p></div>
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

function showDatePopover(element) {
    // Remove any existing popovers
    const existingPopover = document.querySelector('.date-popover');
    if (existingPopover) {
        existingPopover.remove();
    }

    const specificDate = element.getAttribute('data-specific-date');
    if (!specificDate) return;

    const popover = document.createElement('div');
    popover.className = 'date-popover';
    popover.innerHTML = specificDate;
    document.body.appendChild(popover);

    const rect = element.getBoundingClientRect();
    popover.style.left = `${rect.left + window.scrollX}px`;
    popover.style.top = `${rect.bottom + window.scrollY + 5}px`;

    // Close popover when clicking outside
    setTimeout(() => {
        document.addEventListener('click', (e) => {
            if (!popover.contains(e.target) && e.target !== element) {
                popover.remove();
            }
        }, { once: true });
    }, 0);
}