// --- 게임 변수 ---
let currentGameData = [];
let currentLevelName = "1-2"; 
let userName = ""; 
let score = 0;
let lives = 5;
let isPlaying = false;
let dropSpeed = 2; 
let spawnRate = 1500;
let lastSpawnTime = 0;

let playerX = 50; 
let targetWordObj = null; 
let foods = []; 
let animationId;

let keys = { ArrowLeft: false, ArrowRight: false };

// --- 초기화: 페이지 로드 시 랭킹 불러오기 ---
window.onload = function() {
    loadRanking(); 
};

// --- 게임 함수 ---

function startGame() {
    const nameInput = document.getElementById('username');
    userName = nameInput.value.trim(); 
    if (!userName) {
        alert("이름을 입력해주세요!");
        nameInput.focus();
        return;
    }

    const radios = document.getElementsByName('level');
    for (let r of radios) if (r.checked) currentLevelName = r.value;

    // 데이터 파일 확인 (안전장치)
    if (typeof wordData === 'undefined') {
        alert("오류: 데이터 파일(my_word_data.js)을 찾을 수 없습니다.");
        return;
    }
    
    currentGameData = wordData[currentLevelName] || wordData["1-2"];

    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');

    score = 0;
    lives = 5;
    playerX = 50;
    dropSpeed = 2;
    foods = [];
    document.getElementById('food-container').innerHTML = '';

    updateHUD();
    setNewTarget();

    isPlaying = true;
    lastSpawnTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function setNewTarget() {
    targetWordObj = currentGameData[Math.floor(Math.random() * currentGameData.length)];
    // 타겟(상단)에 한글 뜻 보여주기
    document.getElementById('current-word').innerText = targetWordObj.mean;
    
    spawnFood(true);
}

function spawnFood(forceCorrect = false) {
    const el = document.createElement('div');
    el.className = 'food';

    let isCorrect = forceCorrect;
    if (!forceCorrect) {
        isCorrect = Math.random() < 0.4;
    }

    let wordObj;
    if (isCorrect) {
        wordObj = targetWordObj;
        el.dataset.correct = "true";
    } else {
        do {
            wordObj = currentGameData[Math.floor(Math.random() * currentGameData.length)];
        } while (wordObj.word === targetWordObj.word && currentGameData.length > 1);
        el.dataset.correct = "false";
    }

    // 고기(떨어지는 것)에 영어 단어 보여주기
    el.innerHTML = `
        <img src="meat.png" alt="고기" onerror="this.src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Meat%20on%20Bone.png'">
        <span>${wordObj.word}</span>
    `;

    const x = Math.random() * 80 + 10;
    el.style.left = x + '%';
    el.style.top = '-80px'; 

    document.getElementById('food-container').appendChild(el);

    foods.push({
        el: el,
        x: x,
        y: -80,
        speed: dropSpeed + Math.random() 
    });
}

function gameLoop(timestamp) {
    if (!isPlaying) return;

    if (keys.ArrowLeft) playerX -= 1.5;
    if (keys.ArrowRight) playerX += 1.5;

    if (playerX < 0) playerX = 0;
    if (playerX > 85) playerX = 85;

    const playerEl = document.getElementById('player');
    playerEl.style.left = playerX + '%';

    if (timestamp - lastSpawnTime > spawnRate) {
        spawnFood();
        lastSpawnTime = timestamp;
        if (spawnRate > 600) spawnRate -= 10;
    }

    const containerH = document.querySelector('.game-container').clientHeight;
    const playerY = containerH - 100;

    for (let i = foods.length - 1; i >= 0; i--) {
        let f = foods[i];
        f.y += f.speed;
        f.el.style.top = f.y + 'px';

        if (f.y > containerH) {
            f.el.remove();
            foods.splice(i, 1);
            continue;
        }

        if (f.y > playerY - 50 && f.y < playerY + 50) {
            if (Math.abs(f.x - playerX) < 10) {
                handleEat(f, i);
            }
        }
    }

    if (lives <= 0) {
        endGame();
    } else {
        animationId = requestAnimationFrame(gameLoop);
    }
}

function handleEat(food, index) {
    const isCorrect = food.el.dataset.correct === "true";
    food.el.remove();
    foods.splice(index, 1);

    if (isCorrect) {
        score += 10;
        dropSpeed += 0.1; 
        setNewTarget();   
    } else {
        lives--;
        const container = document.querySelector('.game-container');
        container.style.background = '#ffcdd2';
        setTimeout(() => {
            container.style.background = ''; 
            container.style.background = 'linear-gradient(180deg, #b3e5fc 0%, #e1f5fe 80%, #aed581 80%, #7cb342 100%)';
        }, 100);
    }
    updateHUD();
}

function updateHUD() {
    document.getElementById('score-display').innerText = score + "점";
    document.getElementById('life-display').innerText = lives;
}

function endGame() {
    isPlaying = false;
    cancelAnimationFrame(animationId);

    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score + "점";

    let msg = "더 배고파요... 🦖";
    if (score > 100) msg = "꺼억~ 잘 먹었다! 🦖💨";
    if (score > 300) msg = "최고의 먹방이었어! 👑";
    document.getElementById('final-msg').innerText = msg;

    // ★ 게임 종료 시 점수 저장 함수 호출
    saveScore(userName, score, currentLevelName);
}

// --- ★ 명예의 전당 및 홈 이동 기능 ---

// 점수 저장 함수
function saveScore(name, score, mode) {
    let records = JSON.parse(localStorage.getItem('dinoGameRank')) || [];
    records.push({ name: name, score: score, mode: mode, date: new Date().toLocaleDateString() });
    records.sort((a, b) => b.score - a.score);
    localStorage.setItem('dinoGameRank', JSON.stringify(records));
}

// 랭킹 불러오기 함수
function loadRanking() {
    const table = document.getElementById('ranking-table');
    if (!table) return;

    let records = JSON.parse(localStorage.getItem('dinoGameRank')) || [];
    
    let html = `<tr><th>순위</th><th>이름</th><th>내용</th></tr>`;
    
    if (records.length === 0) {
        html += `<tr><td colspan="3" style="padding:15px; color:#555;">아직 도전자가 없습니다.</td></tr>`;
    } else {
        records.slice(0, 5).forEach((r, index) => {
            let badge = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : index + 1));
            let rankClass = index < 3 ? `rank-${index+1}` : '';
            html += `
                <tr class="${rankClass}">
                    <td>${badge}</td>
                    <td>${r.name}</td>
                    <td><small>${r.mode} (${r.score}점)</small></td>
                </tr>`;
        });
    }
    table.innerHTML = html;
}

// ★ 처음으로 이동 함수 (버튼이 안 눌린 이유가 이 함수가 없었기 때문일 수 있습니다)
function goHome() {
    if (confirm("처음 화면으로 돌아갈까요?")) {
        location.reload();
    }
}

// 이벤트 리스너
window.addEventListener('keydown', e => {
    if (keys.hasOwnProperty(e.code)) keys[e.code] = true;
});
window.addEventListener('keyup', e => {
    if (keys.hasOwnProperty(e.code)) keys[e.code] = false;
});

const leftBtn = document.getElementById('btn-left');
const rightBtn = document.getElementById('btn-right');

const handleTouchStart = (key) => (e) => { e.preventDefault(); keys[key] = true; };
const handleTouchEnd = (key) => (e) => { e.preventDefault(); keys[key] = false; };

leftBtn.addEventListener('touchstart', handleTouchStart('ArrowLeft'));
leftBtn.addEventListener('touchend', handleTouchEnd('ArrowLeft'));

rightBtn.addEventListener('touchstart', handleTouchStart('ArrowRight'));
rightBtn.addEventListener('touchend', handleTouchEnd('ArrowRight'));