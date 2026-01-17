const hanjaData = [
    { h: "一", m: "한 일", img: "1️⃣" }, { h: "二", m: "두 이", img: "2️⃣" },
    { h: "三", m: "석 삼", img: "3️⃣" }, { h: "四", m: "넉 사", img: "4️⃣" },
    { h: "五", m: "다섯 오", img: "5️⃣" }, { h: "六", m: "여섯 륙", img: "6️⃣" },
    { h: "七", m: "일곱 칠", img: "7️⃣" }, { h: "八", m: "여덟 팔", img: "8️⃣" },
    { h: "九", m: "아홉 구", img: "9️⃣" }, { h: "十", m: "열 십", img: "🔟" },
    { h: "萬", m: "일만 만", img: "💰" },
    { h: "日", m: "날 일", img: "☀️" }, { h: "月", m: "달 월", img: "🌙" },
    { h: "火", m: "불 화", img: "🔥" }, { h: "水", m: "물 수", img: "💧" },
    { h: "木", m: "나무 목", img: "🌳" }, { h: "金", m: "쇠 금", img: "🥇" },
    { h: "土", m: "흙 토", img: "🌱" }, { h: "山", m: "뫼 산", img: "⛰️" },
    { h: "川", m: "내 천", img: "🌊" },
    { h: "東", m: "동녘 동", img: "➡️" }, { h: "西", m: "서녘 서", img: "⬅️" },
    { h: "南", m: "남녘 남", img: "⬇️" }, { h: "北", m: "북녘 북", img: "⬆️" },
    { h: "大", m: "큰 대", img: "🐘" }, { h: "中", m: "가운데 중", img: "🎯" },
    { h: "小", m: "작을 소", img: "🐜" }, { h: "白", m: "흰 백", img: "🤍" },
    { h: "靑", m: "푸를 청", img: "💙" },
    { h: "人", m: "사람 인", img: "🚶" }, { h: "父", m: "아비 부", img: "👨" },
    { h: "母", m: "어미 모", img: "👩" }, { h: "兄", m: "맏 형", img: "👦" },
    { h: "弟", m: "아우 제", img: "👶" }, { h: "女", m: "계집 녀", img: "👧" },
    { h: "子", m: "아들 자", img: "🧒" },
    { h: "學", m: "배울 학", img: "🏫" }, { h: "校", m: "학교 교", img: "🎒" },
    { h: "先", m: "먼저 선", img: "⏩" }, { h: "生", m: "날 생", img: "🌱" },
    { h: "國", m: "나라 국", img: "🇰🇷" }, { h: "軍", m: "군사 군", img: "🎖️" },
    { h: "民", m: "백성 민", img: "👥" }, { h: "王", m: "임금 왕", img: "👑" },
    { h: "年", m: "해 년", img: "📅" }, { h: "長", m: "길/어른 장", img: "📏" },
    { h: "外", m: "바깥 외", img: "🚪" }, { h: "門", m: "문 문", img: "🚪" },
    { h: "室", m: "집 실", img: "🏠" }, { h: "寸", m: "마디 촌", img: "☝️" }
];

let score = 0;
let currentQCount = 0;
const totalQuestions = 20; // ⚡️ 문제 수 20개로 변경!
let timeLeft = 10;
let timerInterval;
let correctAnswerIndex = 0; 
let isAnswering = false; 

const introScreen = document.getElementById("intro-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const mainDisplay = document.getElementById("main-display");
const subDisplay = document.getElementById("sub-display");
const qCountDisplay = document.getElementById("q-count");
const scoreDisplay = document.getElementById("score-display");
const timerFill = document.getElementById("timer-fill");
const resultMessage = document.getElementById("result-message");
const buttons = document.querySelectorAll(".answer-grid button");

function startGame() {
    score = 0;
    currentQCount = 0;
    introScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    makeQuestion();
}

function goToIntro() {
    clearInterval(timerInterval); 
    gameScreen.classList.add("hidden"); 
    resultScreen.classList.add("hidden"); 
    introScreen.classList.remove("hidden"); 
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    updateTimerBar();
    
    timerInterval = setInterval(() => {
        timeLeft -= 0.05; 
        updateTimerBar();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleWrong(); 
        }
    }, 50);
}

function updateTimerBar() {
    const percent = (timeLeft / 10) * 100;
    timerFill.style.width = `${percent}%`;
    if(percent < 30) timerFill.style.backgroundColor = "#ff7675"; 
    else timerFill.style.backgroundColor = "#27ae60";
}

function makeQuestion() {
    if (currentQCount >= totalQuestions) {
        endGame();
        return;
    }

    isAnswering = false;
    currentQCount++;
    qCountDisplay.innerText = `문제 ${currentQCount} / ${totalQuestions}`;
    scoreDisplay.innerText = `점수: ${score}`;
    resultMessage.innerText = "";
    
    buttons.forEach(btn => {
        btn.className = ""; 
        btn.disabled = false;
    });

    const target = hanjaData[Math.floor(Math.random() * hanjaData.length)];
    const type = Math.random() < 0.5 ? 0 : 1; // 0:한자->뜻, 1:뜻->한자

    let wrongOptions = [];
    while (wrongOptions.length < 3) {
        const wrong = hanjaData[Math.floor(Math.random() * hanjaData.length)];
        if (wrong.h !== target.h && !wrongOptions.includes(wrong)) {
            wrongOptions.push(wrong);
        }
    }

    const options = [...wrongOptions];
    correctAnswerIndex = Math.floor(Math.random() * 4); 
    options.splice(correctAnswerIndex, 0, target); 

    if (type === 0) {
        // 문제: 漢 (큰 글씨) / 보기: 뜻
        mainDisplay.innerText = target.h; 
        subDisplay.innerText = target.img; 
        buttons.forEach((btn, i) => {
            btn.innerText = options[i].m;
            btn.classList.remove("hanja-text"); // 한글은 보통 크기
        });
    } else {
        // 문제: 뜻 (작은 글씨) / 보기: 漢
        mainDisplay.innerText = target.m; 
        subDisplay.innerText = target.img; 
        buttons.forEach((btn, i) => {
            btn.innerText = options[i].h;
            btn.classList.add("hanja-text"); // ⚡️ 보기에 한자가 나오면 왕 글씨 적용!
        });
    }

    startTimer();
}

function checkAnswer(index) {
    if (isAnswering) return; 
    isAnswering = true;
    clearInterval(timerInterval);

    if (index === correctAnswerIndex) {
        score += 5; // (20문제라 점수 배점을 10 -> 5로 조정해도 됨, 여기선 일단 100점 만점 기준 5점으로 변경)
        buttons[index].classList.add("correct");
        resultMessage.innerText = "⭕ 정답이로구나!";
        resultMessage.style.color = "#27ae60";
        playDingDongDang();
    } else {
        buttons[index].classList.add("wrong");
        buttons[correctAnswerIndex].classList.add("correct"); 
        resultMessage.innerText = "❌ 허허, 틀렸느니라.";
        resultMessage.style.color = "#d63031";
        playDdaeng();
    }
    setTimeout(makeQuestion, 1500);
}

function handleWrong() {
    isAnswering = true;
    buttons[correctAnswerIndex].classList.add("correct");
    resultMessage.innerText = "⏰ 늦었구나!";
    resultMessage.style.color = "#d63031";
    playDdaeng();
    setTimeout(makeQuestion, 2000);
}

function endGame() {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    document.getElementById("final-score-text").innerText = `총점: ${score}점`;

    const finalComment = document.getElementById("final-comment");
    if (score === 100) finalComment.innerText = "🐵 대단하다! 장원급제로다! (바나나 3개)";
    else if (score >= 80) finalComment.innerText = "🍌 참 잘했다! 바나나 하나 주마.";
    else finalComment.innerText = "📜 서당에 남아서 공부를 더 하거라...";
}

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}
function playDingDongDang() {
    playTone(523.25, 'sine', 0.1); setTimeout(() => playTone(659.25, 'sine', 0.1), 100); setTimeout(() => playTone(783.99, 'sine', 0.2), 200);
}
function playDdaeng() { playTone(150, 'sawtooth', 0.3); }