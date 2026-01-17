// 🌟 8급 한자 데이터 (50자, 이모지 포함)
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

let currentQuestion = {};
let score = 0;
let questionCount = 0;
const totalQuestions = 20; // 50문제 중 20문제 출제
let timerInterval;
let timeLeft;
let isAnswering = false;
let quizList = [];

const introScreen = document.getElementById("intro-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const mainDisplay = document.getElementById("main-display");
const scoreDisplay = document.getElementById("score-display");
const qCountDisplay = document.getElementById("q-count");
const timerFill = document.getElementById("timer-fill");
const resultMessage = document.getElementById("result-message");
const finalScoreText = document.getElementById("final-score-text");
const finalComment = document.getElementById("final-comment");

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
    playTone(523.25, 'sine', 0.5); setTimeout(() => playTone(659.25, 'sine', 0.5), 200); setTimeout(() => playTone(783.99, 'sine', 0.5), 400);
}
function playDdaeng() { playTone(150, 'sawtooth', 0.3); }

function startGame() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    score = 0;
    questionCount = 0;
    
    // 50개 중 20개 무작위 뽑기
    quizList = hanjaData.sort(() => 0.5 - Math.random()).slice(0, totalQuestions);

    introScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    
    nextQuestion();
}

function nextQuestion() {
    if (questionCount >= totalQuestions) {
        endGame();
        return;
    }

    isAnswering = false; 
    currentQuestion = quizList[questionCount];
    questionCount++;

    // 화면 업데이트
    qCountDisplay.innerText = `문제 ${questionCount} / ${totalQuestions}`;
    scoreDisplay.innerText = `점수: ${score}`;
    resultMessage.innerText = "";
    
    // 🌟 한자와 지정된 이모지 표시 (8급 전용)
    mainDisplay.innerHTML = `<div class="hanja-text">${currentQuestion.h}</div><div class="emoji-display">${currentQuestion.img}</div>`;

    // 보기 만들기
    let answers = [currentQuestion];
    while (answers.length < 4) {
        let randomItem = hanjaData[Math.floor(Math.random() * hanjaData.length)];
        if (!answers.includes(randomItem)) {
            answers.push(randomItem);
        }
    }
    answers.sort(() => 0.5 - Math.random());

    const buttons = document.querySelectorAll(".answer-grid button");
    buttons.forEach((btn, index) => {
        btn.innerText = answers[index].m; // m: 뜻음
        btn.className = ""; 
        btn.onclick = () => checkAnswer(answers[index], btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20; // 🌟 시간 20초로 변경!
    updateTimerBar();
    
    timerInterval = setInterval(() => {
        timeLeft -= 0.05; 
        updateTimerBar();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOut();
        }
    }, 50);
}

function updateTimerBar() {
    // 🌟 20초 기준으로 바 계산
    const percentage = (timeLeft / 20) * 100;
    timerFill.style.width = `${percentage}%`;
    if (percentage < 30) timerFill.style.backgroundColor = "red";
    else timerFill.style.backgroundColor = "#ba68c8"; // 보라색
}

function checkAnswer(selectedItem, btnElement) {
    if (isAnswering) return; 
    isAnswering = true; 
    clearInterval(timerInterval);

    if (selectedItem === currentQuestion) {
        playDingDongDang();
        btnElement.classList.add("correct");
        score += 5; // 20문제 * 5점 = 100점
        scoreDisplay.innerText = `점수: ${score}`;
        resultMessage.innerText = "정답! 🍌 냠냠!";
        resultMessage.style.color = "#2e7d32";
    } else {
        playDdaeng();
        btnElement.classList.add("wrong");
        
        const buttons = document.querySelectorAll(".answer-grid button");
        buttons.forEach(btn => {
            if (btn.innerText === currentQuestion.m) {
                btn.classList.add("correct");
            }
        });
        
        resultMessage.innerText = `땡! 정답은 '${currentQuestion.m}' 입니다.`;
        resultMessage.style.color = "#c62828";
    }

    setTimeout(nextQuestion, 1500); 
}

function timeOut() {
    if (isAnswering) return;
    isAnswering = true;
    playDdaeng();
    
    const buttons = document.querySelectorAll(".answer-grid button");
    buttons.forEach(btn => {
        if (btn.innerText === currentQuestion.m) {
            btn.classList.add("correct");
        }
    });

    resultMessage.innerText = "시간 초과! 원숭이 훈장님이 실망하셨어요.";
    resultMessage.style.color = "red";
    setTimeout(nextQuestion, 1500);
}

function endGame() {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    
    if (score > 100) score = 100;
    finalScoreText.innerText = `총점: ${score}점`;

    if (score === 100) {
        finalComment.innerText = "💯 완벽해! 훈장님이 칭찬하셨어!";
    } else if (score >= 80) {
        finalComment.innerText = "🍌 아주 훌륭해! 합격이야!";
    } else if (score >= 50) {
        finalComment.innerText = "🐵 조금만 더 노력해봐!";
    } else {
        finalComment.innerText = "📚 공부하고 다시 오거라!";
    }
}

function goToIntro() {
    resultScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
}