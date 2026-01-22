// ★ 단어 데이터 (예비중등 1000단어 기반)
const wordData = {
    "1-2": [
        {word:"start", mean:"시작하다"}, {word:"glad", mean:"기쁜"}, {word:"heart", mean:"마음"}, {word:"problem", mean:"문제"},
        {word:"understand", mean:"이해하다"}, {word:"young", mean:"어린"}, {word:"cousin", mean:"사촌"}, {word:"need", mean:"필요하다"},
        {word:"write", mean:"쓰다"}, {word:"fact", mean:"사실"}, {word:"pants", mean:"바지"}, {word:"walk", mean:"걷다"},
        {word:"park", mean:"공원"}, {word:"light", mean:"빛"}, {word:"dirty", mean:"더러운"}, {word:"stand", mean:"서다"},
        {word:"prince", mean:"왕자"}, {word:"parent", mean:"부모"}, {word:"quick", mean:"빠른"}, {word:"catch", mean:"잡다"},
        {word:"beautiful", mean:"아름다운"}, {word:"chance", mean:"기회"}, {word:"help", mean:"돕다"}, {word:"wake", mean:"깨다"},
        {word:"ground", mean:"땅"}, {word:"middle", mean:"중간"}, {word:"train", mean:"기차"}, {word:"busy", mean:"바쁜"},
        {word:"street", mean:"거리"}, {word:"go", mean:"가다"}, {word:"side", mean:"측면"}, {word:"lead", mean:"이끌다"},
        {word:"job", mean:"직업"}, {word:"look", mean:"보다"}, {word:"week", mean:"주"}, {word:"church", mean:"교회"},
        {word:"quiet", mean:"조용한"}, {word:"cloud", mean:"구름"}, {word:"hear", mean:"듣다"}, {word:"number", mean:"숫자"},
        {word:"dream", mean:"꿈"}, {word:"eat", mean:"먹다"}, {word:"flag", mean:"깃발"}, {word:"age", mean:"나이"},
        {word:"farm", mean:"농장"}, {word:"music", mean:"음악"}, {word:"fly", mean:"날다"}, {word:"wife", mean:"아내"},
        {word:"say", mean:"말하다"}, {word:"cold", mean:"추운"}, {word:"meat", mean:"고기"}, {word:"ride", mean:"타다"},
        {word:"month", mean:"달"}, {word:"wind", mean:"바람"}, {word:"roof", mean:"지붕"}, {word:"warm", mean:"따뜻한"},
        {word:"visit", mean:"방문하다"}, {word:"die", mean:"죽다"}, {word:"land", mean:"땅"}, {word:"hard", mean:"어려운"},
        {word:"high", mean:"높은"}, {word:"work", mean:"일하다"}, {word:"vegetable", mean:"야채"}, {word:"kill", mean:"죽이다"},
        {word:"angry", mean:"화난"}, {word:"play", mean:"놀다"}, {word:"mouse", mean:"쥐"}, {word:"sound", mean:"소리"},
        {word:"airport", mean:"공항"}, {word:"garden", mean:"정원"}, {word:"long", mean:"긴"}, {word:"travel", mean:"여행"},
        {word:"little", mean:"작은"}, {word:"hungry", mean:"배고픈"}, {word:"desk", mean:"책상"}, {word:"breakfast", mean:"아침식사"},
        {word:"fun", mean:"재미있는"}, {word:"wait", mean:"기다리다"}, {word:"wet", mean:"젖은"}, {word:"picture", mean:"그림"}
    ],
    "3-4": [
        {word:"husband", mean:"남편"}, {word:"together", mean:"함께"}, {word:"field", mean:"들판"}, {word:"moon", mean:"달"},
        {word:"idea", mean:"생각"}, {word:"much", mean:"많은"}, {word:"win", mean:"이기다"}, {word:"other", mean:"다른"},
        {word:"swim", mean:"수영하다"}, {word:"fight", mean:"싸우다"}, {word:"drive", mean:"운전하다"}, {word:"word", mean:"단어"},
        {word:"enjoy", mean:"즐기다"}, {word:"country", mean:"나라"}, {word:"south", mean:"남쪽"}, {word:"holiday", mean:"휴일"},
        {word:"space", mean:"우주"}, {word:"think", mean:"생각하다"}, {word:"speak", mean:"말하다"}, {word:"family", mean:"가족"},
        {word:"sea", mean:"바다"}, {word:"seat", mean:"좌석"}, {word:"stair", mean:"계단"}, {word:"key", mean:"열쇠"},
        {word:"island", mean:"섬"}, {word:"kick", mean:"차다"}, {word:"stupid", mean:"멍청한"}, {word:"wide", mean:"넓은"},
        {word:"come", mean:"오다"}, {word:"child", mean:"아이"}, {word:"fast", mean:"빠른"}, {word:"strange", mean:"이상한"},
        {word:"study", mean:"공부하다"}, {word:"gate", mean:"문"}, {word:"mirror", mean:"거울"}, {word:"course", mean:"과정"},
        {word:"river", mean:"강"}, {word:"library", mean:"도서관"}, {word:"food", mean:"음식"}, {word:"big", mean:"큰"},
        {word:"year", mean:"년"}, {word:"rich", mean:"부유한"}, {word:"rainbow", mean:"무지개"}, {word:"cry", mean:"울다"},
        {word:"summer", mean:"여름"}, {word:"fine", mean:"좋은"}, {word:"night", mean:"밤"}, {word:"classroom", mean:"교실"},
        {word:"thunder", mean:"천둥"}, {word:"table", mean:"탁자"}, {word:"peace", mean:"평화"}, {word:"call", mean:"부르다"},
        {word:"minute", mean:"분"}, {word:"hero", mean:"영웅"}, {word:"mountain", mean:"산"}, {word:"station", mean:"역"},
        {word:"hill", mean:"언덕"}, {word:"spring", mean:"봄"}, {word:"bathroom", mean:"화장실"}, {word:"expensive", mean:"비싼"},
        {word:"place", mean:"장소"}, {word:"ready", mean:"준비된"}, {word:"story", mean:"이야기"}, {word:"hot", mean:"뜨거운"},
        {word:"hope", mean:"희망하다"}, {word:"lunch", mean:"점심"}, {word:"listen", mean:"듣다"}, {word:"sing", mean:"노래하다"},
        {word:"handsome", mean:"잘생긴"}, {word:"west", mean:"서쪽"}, {word:"talk", mean:"말하다"}, {word:"act", mean:"행동하다"},
        {word:"vase", mean:"꽃병"}, {word:"sell", mean:"팔다"}, {word:"shoe", mean:"신발"}, {word:"old", mean:"오래된"},
        {word:"trip", mean:"여행"}, {word:"storm", mean:"폭풍"}, {word:"brush", mean:"붓"}, {word:"tell", mean:"말하다"}
    ],
    "5-6": [
        {word:"miracle", mean:"기적"}, {word:"slide", mean:"미끄러지다"}, {word:"someday", mean:"언젠가"}, {word:"exit", mean:"출구"},
        {word:"arrive", mean:"도착하다"}, {word:"wish", mean:"소원"}, {word:"produce", mean:"생산하다"}, {word:"view", mean:"전망"},
        {word:"project", mean:"프로젝트"}, {word:"heavy", mean:"무거운"}, {word:"report", mean:"보고하다"}, {word:"fantastic", mean:"환상적인"},
        {word:"manager", mean:"관리자"}, {word:"mystery", mean:"신비"}, {word:"drop", mean:"떨어뜨리다"}, {word:"rope", mean:"밧줄"},
        {word:"follow", mean:"따라가다"}, {word:"adventure", mean:"모험"}, {word:"guide", mean:"안내하다"}, {word:"closet", mean:"벽장"},
        {word:"first", mean:"첫번째"}, {word:"sunshine", mean:"햇살"}, {word:"wave", mean:"파도"}, {word:"exam", mean:"시험"},
        {word:"missing", mean:"실종된"}, {word:"either", mean:"또한"}, {word:"sunlight", mean:"햇빛"}, {word:"housework", mean:"집안일"},
        {word:"pay", mean:"지불하다"}, {word:"sleep", mean:"자다"}, {word:"stomach", mean:"위"}, {word:"event", mean:"사건"},
        {word:"practice", mean:"연습하다"}, {word:"museum", mean:"박물관"}, {word:"background", mean:"배경"}, {word:"dentist", mean:"치과의사"},
        {word:"western", mean:"서쪽의"}, {word:"headache", mean:"두통"}, {word:"ocean", mean:"대양"}, {word:"past", mean:"과거"},
        {word:"citizen", mean:"시민"}, {word:"mushroom", mean:"버섯"}, {word:"style", mean:"방식"}, {word:"get", mean:"얻다"},
        {word:"sunrise", mean:"일출"}, {word:"cough", mean:"기침"}, {word:"hometown", mean:"고향"}, {word:"capital", mean:"수도"},
        {word:"near", mean:"가까운"}, {word:"natural", mean:"자연의"}, {word:"sale", mean:"판매"}, {word:"machine", mean:"기계"},
        {word:"purse", mean:"지갑"}, {word:"hurry", mean:"서두르다"}, {word:"tough", mean:"거친"}, {word:"guard", mean:"경비원"},
        {word:"nature", mean:"자연"}, {word:"full", mean:"가득찬"}, {word:"suddenly", mean:"갑자기"}, {word:"design", mean:"디자인"},
        {word:"health", mean:"건강"}, {word:"send", mean:"보내다"}, {word:"classmate", mean:"반친구"}, {word:"artwork", mean:"예술작품"},
        {word:"both", mean:"둘다"}, {word:"ahead", mean:"앞에"}, {word:"break", mean:"깨다"}, {word:"finally", mean:"마침내"},
        {word:"sit", mean:"앉다"}, {word:"lonely", mean:"외로운"}, {word:"live", mean:"살다"}, {word:"ghost", mean:"유령"},
        {word:"nickname", mean:"별명"}, {word:"surprised", mean:"놀란"}, {word:"sad", mean:"슬픈"}, {word:"solar", mean:"태양의"}
    ],
    "중1": [
        {word:"cause", mean:"원인"}, {word:"positive", mean:"긍정적인"}, {word:"serious", mean:"심각한"}, {word:"complete", mean:"완전한"},
        {word:"allowance", mean:"용돈"}, {word:"actual", mean:"실제의"}, {word:"expression", mean:"표현"}, {word:"strict", mean:"엄격한"},
        {word:"upstairs", mean:"위층"}, {word:"connect", mean:"연결하다"}, {word:"blind", mean:"눈먼"}, {word:"invitation", mean:"초대"},
        {word:"least", mean:"적어도"}, {word:"unique", mean:"독특한"}, {word:"shore", mean:"해안"}, {word:"tiny", mean:"아주작은"},
        {word:"company", mean:"회사"}, {word:"temporary", mean:"일시적인"}, {word:"active", mean:"활동적인"}, {word:"discount", mean:"할인"},
        {word:"loose", mean:"느슨한"}, {word:"dizzy", mean:"어지러운"}, {word:"various", mean:"다양한"}, {word:"humid", mean:"습한"},
        {word:"activity", mean:"활동"}, {word:"biology", mean:"생물학"}, {word:"medicine", mean:"약"}, {word:"principal", mean:"교장"},
        {word:"repair", mean:"수리하다"}, {word:"mention", mean:"언급하다"}, {word:"tropical", mean:"열대의"}, {word:"prepare", mean:"준비하다"},
        {word:"term", mean:"용어"}, {word:"promise", mean:"약속하다"}, {word:"opposite", mean:"반대의"}, {word:"teenager", mean:"십대"},
        {word:"graceful", mean:"우아한"}, {word:"honest", mean:"정직한"}, {word:"strike", mean:"치다"}, {word:"tear", mean:"눈물"},
        {word:"accident", mean:"사고"}, {word:"block", mean:"막다"}, {word:"pale", mean:"창백한"}, {word:"partner", mean:"파트너"},
        {word:"lecture", mean:"강의"}, {word:"seem", mean:"보이다"}, {word:"tutor", mean:"가정교사"}, {word:"tired", mean:"피곤한"},
        {word:"sore", mean:"아픈"}, {word:"adult", mean:"성인"}, {word:"bitter", mean:"쓴"}, {word:"thirsty", mean:"목마른"},
        {word:"explode", mean:"폭발하다"}, {word:"century", mean:"세기"}, {word:"delete", mean:"삭제하다"}, {word:"sharp", mean:"날카로운"},
        {word:"string", mean:"줄"}, {word:"impressive", mean:"인상적인"}, {word:"useful", mean:"유용한"}, {word:"youth", mean:"젊음"},
        {word:"popular", mean:"인기있는"}, {word:"honesty", mean:"정직"}, {word:"grade", mean:"학년"}, {word:"imagination", mean:"상상력"},
        {word:"protect", mean:"보호하다"}, {word:"taste", mean:"맛"}, {word:"unfriendly", mean:"불친절한"}, {word:"soil", mean:"흙"},
        {word:"incredible", mean:"놀라운"}, {word:"subject", mean:"과목"}, {word:"mysterious", mean:"신비한"}, {word:"explain", mean:"설명하다"},
        {word:"loaf", mean:"덩어리"}, {word:"generous", mean:"관대한"}, {word:"swamp", mean:"늪"}, {word:"repeat", mean:"반복하다"},
        {word:"dough", mean:"반죽"}, {word:"common", mean:"흔한"}, {word:"illness", mean:"질병"}, {word:"identical", mean:"동일한"}
    ]
};

// --- 게임 변수 ---
let currentGameData = [];
let score = 0;
let lives = 5;
let isPlaying = false;
let dropSpeed = 2; // 고기 떨어지는 속도
let spawnRate = 1500; // 생성 주기
let lastSpawnTime = 0;

let playerX = 50; // 플레이어 위치 (%)
let targetWordObj = null; // 현재 타겟 단어
let foods = []; // 화면 상의 고기 배열
let animationId;

// 키보드 상태
let keys = { ArrowLeft: false, ArrowRight: false };

// --- 게임 함수 ---

function startGame() {
    const nameInput = document.getElementById('username');
    const name = nameInput.value.trim();
    if (!name) {
        alert("이름을 입력해주세요!");
        nameInput.focus();
        return;
    }

    // 난이도 선택
    const radios = document.getElementsByName('level');
    let selectedLevel = "1-2";
    for (let r of radios) if (r.checked) selectedLevel = r.value;

    currentGameData = wordData[selectedLevel] || wordData["1-2"];

    // 화면 전환
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');

    // 변수 초기화
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
    // 랜덤 단어 선정
    targetWordObj = currentGameData[Math.floor(Math.random() * currentGameData.length)];
    document.getElementById('current-word').innerText = targetWordObj.word;

    // 타겟이 바뀌면 바로 정답 고기 하나 생성 (딜레이 방지)
    spawnFood(true);
}

function spawnFood(forceCorrect = false) {
    const el = document.createElement('div');
    el.className = 'food';

    // 정답 여부 결정
    let isCorrect = forceCorrect;
    if (!forceCorrect) {
        // 평소엔 40% 확률로 정답
        isCorrect = Math.random() < 0.4;
    }

    let wordObj;
    if (isCorrect) {
        wordObj = targetWordObj;
        el.dataset.correct = "true";
    } else {
        // 오답 고르기
        do {
            wordObj = currentGameData[Math.floor(Math.random() * currentGameData.length)];
        } while (wordObj.word === targetWordObj.word && currentGameData.length > 1);
        el.dataset.correct = "false";
    }

    // HTML 내용 (이미지 + 텍스트)
    el.innerHTML = `
        <img src="meat.png" alt="고기" onerror="this.src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Meat%20on%20Bone.png'">
        <span>${wordObj.mean}</span>
    `;

    // 위치 설정 (10% ~ 90%)
    const x = Math.random() * 80 + 10;
    el.style.left = x + '%';
    el.style.top = '-80px'; // 화면 위에서 시작

    document.getElementById('food-container').appendChild(el);

    foods.push({
        el: el,
        x: x,
        y: -80,
        speed: dropSpeed + Math.random() // 속도 약간 랜덤
    });
}

function gameLoop(timestamp) {
    if (!isPlaying) return;

    // 1. 플레이어 이동
    if (keys.ArrowLeft) playerX -= 1.5;
    if (keys.ArrowRight) playerX += 1.5;

    // 화면 밖으로 나가지 않게
    if (playerX < 0) playerX = 0;
    if (playerX > 85) playerX = 85;

    const playerEl = document.getElementById('player');
    playerEl.style.left = playerX + '%';

    // 2. 고기 생성
    if (timestamp - lastSpawnTime > spawnRate) {
        spawnFood();
        lastSpawnTime = timestamp;
        // 점수가 오르면 생성 속도 빨라짐
        if (spawnRate > 600) spawnRate -= 10;
    }

    // 3. 고기 이동 및 충돌 판정
    const containerH = document.querySelector('.game-container').clientHeight;
    // 플레이어의 Y위치 (대략 바닥에서 100px 위)
    const playerY = containerH - 100;

    for (let i = foods.length - 1; i >= 0; i--) {
        let f = foods[i];
        f.y += f.speed;
        f.el.style.top = f.y + 'px';

        // 바닥에 닿으면 삭제
        if (f.y > containerH) {
            f.el.remove();
            foods.splice(i, 1);
            continue;
        }

        // 충돌 체크 (단순 거리 계산)
        // Y축: 플레이어 머리 위 ~ 발
        if (f.y > playerY - 50 && f.y < playerY + 50) {
            // X축: 가로 위치가 비슷하면
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

    // 화면 제거
    food.el.remove();
    foods.splice(index, 1);

    if (isCorrect) {
        score += 10;
        dropSpeed += 0.1; // 난이도 상승
        setNewTarget();   // 다음 문제
    } else {
        lives--;
        // 화면 깜빡임 (피격 효과)
        const container = document.querySelector('.game-container');
        container.style.background = '#ffcdd2';
        setTimeout(() => {
            container.style.background = ''; // 원래대로 복구 (CSS 그라데이션은 class로 관리하는게 좋지만 간단히 처리)
            // 배경색을 날려버리면 그라데이션이 사라지므로, 
            // 실제로는 오버레이를 쓰는게 좋지만 간단히 배경 리셋
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
}

// --- 이벤트 리스너 ---

// 키보드
window.addEventListener('keydown', e => {
    if (keys.hasOwnProperty(e.code)) keys[e.code] = true;
});
window.addEventListener('keyup', e => {
    if (keys.hasOwnProperty(e.code)) keys[e.code] = false;
});

// 모바일 터치
const leftBtn = document.getElementById('btn-left');
const rightBtn = document.getElementById('btn-right');

const handleTouchStart = (key) => (e) => { e.preventDefault(); keys[key] = true; };
const handleTouchEnd = (key) => (e) => { e.preventDefault(); keys[key] = false; };

leftBtn.addEventListener('touchstart', handleTouchStart('ArrowLeft'));
leftBtn.addEventListener('touchend', handleTouchEnd('ArrowLeft'));

rightBtn.addEventListener('touchstart', handleTouchStart('ArrowRight'));
rightBtn.addEventListener('touchend', handleTouchEnd('ArrowRight'));