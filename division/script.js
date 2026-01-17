/* 🐧 펭귄 박사님의 나눗셈 교실 🐧 */

let divisor = 0; // 나누는 수 (예: 2단이면 2)
let answer = 0;  // 정답 (몫)
let dividend = 0; // 나뉘는 수 (문제)
let score = 0, timeLeft = 10, timerInterval, selectedDan = 'random';
let questionCount = 0; const totalQuestions = 10;

const introScreen = document.getElementById("intro-screen");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const currentDanTitle = document.getElementById("current-dan-title");
const qCountDisplay = document.getElementById("q-count");
const questionDisplay = document.getElementById("question-display");
const userInput = document.getElementById("user-input");
const resultMessage = document.getElementById("result-message");
const scoreBoard = document.getElementById("score-board");
const timerDisplay = document.getElementById("timer");
const finalScoreText = document.getElementById("final-score-text");
const finalComment = document.getElementById("final-comment");

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🔊 소리 함수들 (동일)
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
    playTone(523.25, 'sine', 0.5); 
    setTimeout(() => playTone(659.25, 'sine', 0.5), 200); 
    setTimeout(() => playTone(783.99, 'sine', 0.5), 400); 
}
function playDdaeng() { playTone(150, 'sawtooth', 0.3); }
function playTick() { playTone(800, 'triangle', 0.1); }

// 🚀 게임 시작
function startGame(dan) {
    selectedDan = dan; score = 0; questionCount = 0; 
    introScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    
    // 제목 설정 (나눗셈)
    if (dan === 'random') currentDanTitle.innerText = "랜덤 나눗셈";
    else currentDanTitle.innerText = `${dan}단 나눗셈`;
    
    scoreBoard.innerText = "점수: 0";
    makeQuestion();
}

// 🏆 게임 종료
function endGame() {
    clearInterval(timerInterval);
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    finalScoreText.innerText = `총점: ${score}점`;
    
    // 펭귄 박사님의 멘트
    if (score === 100) finalComment.innerText = "🐧 꽥! 완벽해! 자네는 얼음왕국 수학 천재야!";
    else if (score >= 80) finalComment.innerText = "❄️ 아주 훌륭해! 물고기 10마리 주겠네.";
    else if (score >= 50) finalComment.innerText = "🐟 노력하면 더 잘할 수 있어!";
    else finalComment.innerText = "🧊 공부 좀 더 하고 오게나...";
}

function goToIntro() {
    clearInterval(timerInterval);
    gameScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
}

function retrySameDan() { startGame(selectedDan); }

function startTimer() {
    clearInterval(timerInterval); timeLeft = 10; timerDisplay.innerText = timeLeft;
    timerInterval = setInterval(function() {
        timeLeft--; timerDisplay.innerText = timeLeft; 
        if (timeLeft > 0) playTick(); 
        else { clearInterval(timerInterval); timeOut(); }
    }, 1000); 
}

function timeOut() {
    playDdaeng(); resultMessage.innerText = "⏰ 땡! 얼어버렸습니다!";
    resultMessage.style.color = "red"; userInput.value = ""; 
    setTimeout(nextStage, 2000);
}

function nextStage() {
    if (questionCount >= totalQuestions) endGame(); 
    else makeQuestion(); 
}

// 🧠 문제 만들기 (나눗셈 로직)
function makeQuestion() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    clearInterval(timerInterval); resultMessage.innerText = ""; 
    questionCount++; qCountDisplay.innerText = `${questionCount}`; 
    
    // 1. 몇 단(나누는 수)으로 할지 결정
    if (selectedDan === 'random') {
        divisor = Math.floor(Math.random() * 8) + 2; // 2~9 중 랜덤
    } else {
        divisor = selectedDan; // 선택한 단 (예: 9)
    }

    // 2. 정답(몫)을 먼저 결정 (1~9)
    answer = Math.floor(Math.random() * 9) + 1;

    // 3. 문제(나뉘는 수) 만들기: 정답 x 나누는 수
    // 예: 9단(divisor 9), 정답 3(answer 3) -> 문제 27 (27 / 9 = 3)
    dividend = divisor * answer;
    
    // 화면 표시: 27 ÷ 9 = ?
    questionDisplay.innerText = `${dividend} ÷ ${divisor} = ?`;
    
    userInput.value = ""; userInput.focus();
    startTimer(); 
}

function checkAnswer() {
    if (userInput.value === "") return;
    const userAnswer = parseInt(userInput.value);
    
    // 정답 비교 (사용자 입력값 === 미리 정해둔 answer)
    if (userAnswer === answer) {
        clearInterval(timerInterval); playDingDongDang();
        resultMessage.innerText = "정답! 🐟 냠냠!";
        resultMessage.style.color = "#00b894"; score += 10;
        scoreBoard.innerText = `점수: ${score}`;
        setTimeout(nextStage, 1000); 
    } else {
        playDdaeng(); resultMessage.innerText = "땡! 미끄러졌어요 🐧";
        resultMessage.style.color = "red"; userInput.value = ""; userInput.focus();
    }
}

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") checkAnswer();
});