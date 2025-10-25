// Conference detailed information data
        const conferenceData = {
            'NeurIPS': {
                fullName: 'Conference on Neural Information Processing Systems',
                field: '機械学習・AI',
                category: '深層学習・最適化・強化学習・理論',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '26%',
                impactFactor: 'h5-index: 321',
                description: '機械学習分野で最も権威ある国際会議。理論的に深い研究や新しい学習アルゴリズムが評価される。約15,000件の投稿がある超大規模学会。',
                keyTopics: ['深層学習理論', '強化学習', '最適化', 'ベイズ推論', '生成モデル', 'グラフニューラルネットワーク'],
                tips: '理論的貢献と数学的厳密性が重視される。実験結果だけでなく、なぜその手法が機能するかの説明が重要。'
            },
            'ICML': {
                fullName: 'International Conference on Machine Learning',
                field: '機械学習・AI',
                category: '機械学習全般',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '28%',
                impactFactor: 'h5-index: 296',
                description: 'NeurIPSと並ぶ機械学習の最高峰会議。理論と応用のバランスが取れた研究が評価される。',
                keyTopics: ['教師あり学習', '教師なし学習', '転移学習', 'メタ学習', '因果推論', 'AutoML'],
                tips: '数理的な理論とともに、実験による検証が求められる。再現性の確保も重要。'
            },
            'ICLR': {
                fullName: 'International Conference on Learning Representations',
                field: '機械学習・AI',
                category: '表現学習・深層学習',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '32%',
                impactFactor: 'h5-index: 354',
                description: '表現学習に特化した新興の主要会議。深層学習の最新トレンドが集まる。OpenReviewによる透明性の高い査読プロセスが特徴。',
                keyTopics: ['Transformer', '自己教師あり学習', 'Few-shot学習', 'Vision Transformer', 'Diffusion Models', 'LLM'],
                tips: 'OpenReviewで査読が公開される。コミュニティとの議論を通じて論文を改善できる機会がある。'
            },
            'AAAI': {
                fullName: 'AAAI Conference on Artificial Intelligence',
                field: '機械学習・AI',
                category: 'AI全般',
                tier: 'A',
                difficulty: 4,
                acceptanceRate: '23%',
                impactFactor: 'h5-index: 166',
                description: '歴史あるAI総合学会。機械学習だけでなく、自然言語処理、ロボティクス、知識表現など幅広いAI分野をカバー。',
                keyTopics: ['機械学習', 'NLP', 'コンピュータビジョン', '知識表現', 'マルチエージェント', 'ゲームAI'],
                tips: '幅広いAI分野を扱うため、他分野への応用や学際的研究も歓迎される。'
            },
            'IJCAI': {
                fullName: 'International Joint Conference on Artificial Intelligence',
                field: '機械学習・AI',
                category: 'AI全般',
                tier: 'A',
                difficulty: 4,
                acceptanceRate: '21%',
                impactFactor: 'h5-index: 100',
                description: 'AAIと並ぶAI総合会議。国際色が強く、ヨーロッパ・アジアからの参加が多い。',
                keyTopics: ['機械学習', '計画', '推論', 'マルチエージェント', '制約充足', 'データマイニング'],
                tips: '理論的な研究も応用研究も歓迎される。国際的な視点からの貢献が評価される。'
            },
            'CVPR': {
                fullName: 'IEEE Conference on Computer Vision and Pattern Recognition',
                field: 'コンピュータビジョン',
                category: 'コンピュータビジョン全般',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '29%',
                impactFactor: 'h5-index: 389',
                description: 'コンピュータビジョン分野で最大規模かつ最も権威ある学会。約10,000件の投稿がある。',
                keyTopics: ['物体検出', '画像認識', 'セグメンテーション', '3D Vision', 'ビデオ解析', 'Vision & Language'],
                tips: '新しいデータセットやベンチマークでの評価が重視される。SOTAを上回る性能が求められる。'
            },
            'ICCV': {
                fullName: 'International Conference on Computer Vision',
                field: 'コンピュータビジョン',
                category: 'コンピュータビジョン全般',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '26%',
                impactFactor: 'h5-index: 297',
                description: 'CVPRと並ぶビジョン分野のトップ会議。2年に1度開催。より理論的な研究が好まれる傾向。',
                keyTopics: ['画像理解', 'シーン認識', '3D再構成', 'アクション認識', 'ビジュアル推論'],
                tips: 'CVPRより若干理論寄り。新しい問題設定や手法の提案が評価される。'
            },
            'ECCV': {
                fullName: 'European Conference on Computer Vision',
                field: 'コンピュータビジョン',
                category: 'コンピュータビジョン全般',
                tier: 'A',
                difficulty: 5,
                acceptanceRate: '27%',
                impactFactor: 'h5-index: 216',
                description: 'ヨーロッパ発のビジョン会議。2年に1度開催。CVPR、ICCVと並ぶトップ3の一角。',
                keyTopics: ['画像処理', '特徴抽出', 'マッチング', 'SLAM', 'ニューラルレンダリング'],
                tips: 'ヨーロッパの研究者が多く、幾何学的アプローチや理論的背景が評価される。'
            },
            'WACV': {
                fullName: 'Winter Conference on Applications of Computer Vision',
                field: 'コンピュータビジョン',
                category: 'コンピュータビジョン応用',
                tier: 'A',
                difficulty: 3,
                acceptanceRate: '30%',
                impactFactor: 'h5-index: 89',
                description: '応用重視のビジョン会議。実用的な研究や産業応用が評価される。',
                keyTopics: ['医療画像', '自動運転', '顔認識', 'リモートセンシング', '産業応用'],
                tips: 'CVPR/ICCVより採択率が高く、応用研究に適している。実用性が重視される。'
            },
            'ICRA': {
                fullName: 'IEEE International Conference on Robotics and Automation',
                field: 'ロボティクス',
                category: 'ロボティクス全般',
                tier: 'A*',
                difficulty: 4,
                acceptanceRate: '43%',
                impactFactor: 'h5-index: 176',
                description: 'ロボティクス分野で最大規模の国際会議。ハードウェアからソフトウェアまで幅広くカバー。',
                keyTopics: ['マニピュレーション', 'ナビゲーション', 'ヒューマンロボットインタラクション', 'ソフトロボティクス', '制御'],
                tips: '実ロボットでの実験結果が重視される。動画の提出が必須。'
            },
            'IROS': {
                fullName: 'IEEE/RSJ International Conference on Intelligent Robots and Systems',
                field: 'ロボティクス',
                category: 'インテリジェントロボット',
                tier: 'A',
                difficulty: 4,
                acceptanceRate: '47%',
                impactFactor: 'h5-index: 134',
                description: 'ICRAと並ぶロボティクスの主要会議。知的システムやAIとの統合に焦点。',
                keyTopics: ['認識', '学習ロボット', 'マルチロボット', 'センサー統合', 'ROS'],
                tips: 'AIや機械学習との統合研究が歓迎される。ソフトウェア中心の研究も可。'
            },
            'RSS': {
                fullName: 'Robotics: Science and Systems',
                field: 'ロボティクス',
                category: 'ロボティクス基礎・システム',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '25%',
                impactFactor: 'h5-index: 94',
                description: '小規模だが非常に質の高いロボティクス学会。理論的に深い研究や革新的なシステムが評価される。',
                keyTopics: ['ロボット学習', 'ビジュアルサーボ', 'マニピュレーション理論', 'センサー統合', 'モデルベース制御'],
                tips: '採択数が少ない（約70-80本）ため競争が激しい。理論的貢献と実システムの両立が求められる。'
            },
            'CHI': {
                fullName: 'ACM Conference on Human Factors in Computing Systems',
                field: 'HCI',
                category: 'ヒューマンコンピュータインタラクション',
                tier: 'A*',
                difficulty: 4,
                acceptanceRate: '26%',
                impactFactor: 'h5-index: 133',
                description: 'HCI分野で最も権威ある学会。ユーザースタディやデザイン研究が重視される。学際的なアプローチが特徴。',
                keyTopics: ['ユーザーインタフェース', 'アクセシビリティ', 'ユーザーエクスペリエンス', 'タッチインタラクション', 'AR/VR', 'ソーシャルコンピューティング'],
                tips: 'ユーザー評価が必須。定量・定性の両方のデータが求められる。社会的インパクトも評価される。'
            },
            'UIST': {
                fullName: 'ACM Symposium on User Interface Software and Technology',
                field: 'HCI',
                category: 'ユーザーインタフェース技術',
                tier: 'A*',
                difficulty: 4,
                acceptanceRate: '22%',
                impactFactor: 'h5-index: 86',
                description: '新しいインタラクション技術やシステムに焦点を当てたHCI学会。技術的な革新性が重視される。',
                keyTopics: ['新しい入力手法', 'タンジブルインタフェース', 'AR/VR/MR', 'ウェアラブル', 'センシング技術', 'プロトタイピングツール'],
                tips: '動作するプロトタイプシステムが必須。ビデオやデモが重要な評価要素。'
            },
            'SIGGRAPH': {
                fullName: 'ACM SIGGRAPH Conference',
                field: 'コンピュータグラフィックス',
                category: 'CG・ビジュアルコンピューティング',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '27%',
                impactFactor: 'h5-index: 95',
                description: 'コンピュータグラフィックス分野の最高峰。技術論文だけでなく、アートとの融合も重視される。',
                keyTopics: ['レンダリング', 'アニメーション', '物理シミュレーション', 'ジオメトリ処理', 'ビジュアルエフェクト', 'ニューラルレンダリング'],
                tips: '視覚的に美しい結果が求められる。ビデオやインタラクティブデモが重要。'
            },
            'IEEE S&P': {
                fullName: 'IEEE Symposium on Security and Privacy',
                field: 'セキュリティ',
                category: 'セキュリティ・プライバシー',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '12%',
                impactFactor: 'h5-index: 127',
                description: 'セキュリティ分野で最も権威ある学会の一つ。理論的に厳密な研究と実用的な攻撃・防御手法の両方が評価される。',
                keyTopics: ['暗号理論', 'ネットワークセキュリティ', 'プライバシー保護', 'マルウェア分析', 'システムセキュリティ', 'ハードウェアセキュリティ'],
                tips: '採択率が非常に低い。実際の脅威に対する有効性の実証が重要。倫理的配慮も必須。'
            },
            'USENIX Security': {
                fullName: 'USENIX Security Symposium',
                field: 'セキュリティ',
                category: 'システムセキュリティ',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '15%',
                impactFactor: 'h5-index: 115',
                description: 'システムセキュリティに特化した最高峰の学会。実用的なシステムへの攻撃や防御手法が評価される。',
                keyTopics: ['OS・システムセキュリティ', 'Webセキュリティ', 'ソフトウェアセキュリティ', 'ネットワークセキュリティ', 'プライバシー技術'],
                tips: '実システムへの影響を示すことが重要。コードの公開や再現性が求められる。'
            },
            'NDSS': {
                fullName: 'Network and Distributed System Security Symposium',
                field: 'セキュリティ',
                category: 'ネットワーク・分散システムセキュリティ',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '16%',
                impactFactor: 'h5-index: 101',
                description: 'ネットワークセキュリティに焦点を当てた主要学会。実践的な研究が評価される。',
                keyTopics: ['ネットワーク攻撃・防御', 'IoTセキュリティ', 'ブロックチェーン', 'モバイルセキュリティ', 'DNSセキュリティ'],
                tips: '大規模なネットワーク環境での評価や実測データが好まれる。'
            },
            'CCS': {
                fullName: 'ACM Conference on Computer and Communications Security',
                field: 'セキュリティ',
                category: 'コンピュータ・通信セキュリティ',
                tier: 'A*',
                difficulty: 5,
                acceptanceRate: '19%',
                impactFactor: 'h5-index: 108',
                description: 'ACM主催のセキュリティ総合学会。幅広いセキュリティトピックを扱う。',
                keyTopics: ['暗号', 'アクセス制御', 'クラウドセキュリティ', '機械学習セキュリティ', 'ブロックチェーン', 'Webセキュリティ'],
                tips: '理論と実践のバランスが重要。新しい攻撃手法や防御メカニズムの両方が評価される。'
            },
            'Black Hat': {
                fullName: 'Black Hat Security Conference',
                field: 'セキュリティ',
                category: '情報セキュリティ（産業向け）',
                tier: 'Industry',
                difficulty: 3,
                acceptanceRate: '査読なし（CFP選考）',
                impactFactor: '産業カンファレンス',
                description: 'セキュリティ業界で最も有名な実践的カンファレンス。研究よりも実際のツールや攻撃手法のデモが中心。産業界との交流に最適。',
                keyTopics: ['ペネトレーションテスト', 'エクスプロイト', 'セキュリティツール', '脅威インテリジェンス', 'レッドチーム活動', 'ゼロデイ脆弱性'],
                tips: '学術会議ではなく産業カンファレンス。ツールのデモや実践的な知見の共有が中心。企業との接点を作るのに最適。'
            }
        };

        // Get modal element
        const modal = document.getElementById('conferenceModal');
        const closeBtn = document.getElementsByClassName('close')[0];

        // Function to show conference info
        function showConferenceInfo(conferenceName) {
            const data = conferenceData[conferenceName];
            if (!data) return;

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
            let tagsHtml = data.keyTopics.map(topic => `<span class="tag">${topic}</span>`).join('');

            // Generate modal body
            const bodyHtml = `
                <div class="info-section">
                    <h3>📊 基本情報</h3>
                    <div class="info-row">
                        <div class="info-label">🏷️ 分野</div>
                        <div class="info-value"><strong>${data.field}</strong></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">📁 カテゴリ</div>
                        <div class="info-value">${data.category}</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">🏆 ランク</div>
                        <div class="info-value"><span class="tier-badge ${tierClass}">${data.tier}</span></div>
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
                        <div class="info-value"><span class="acceptance-rate">${data.acceptanceRate}</span></div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">📊 影響力指標</div>
                        <div class="info-value">${data.impactFactor}</div>
                    </div>
                </div>

                <div class="info-section">
                    <h3>📝 概要</h3>
                    <p style="line-height: 1.6; color: #495057;">${data.description}</p>
                </div>

                <div class="info-section">
                    <h3>🔑 主要トピック</h3>
                    <div class="tags">${tagsHtml}</div>
                </div>

                <div class="info-section">
                    <h3>💡 投稿のヒント</h3>
                    <p style="line-height: 1.6; color: #495057; background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        ${data.tips}
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