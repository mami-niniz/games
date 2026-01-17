// 변수들
let num1 = 0, num2 = 0;
let score = 0;
let timeLeft = 10; 
let timerInterval; 
let selectedDan = 'random'; 
let questionCount = 0; 
const totalQuestions = 10; 

// 화면 요소 가져오기
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
    selectedDan = dan;
    score = 0;
    questionCount = 0; 
    
    introScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden"); // 게임 화면 보여주기

    if (dan === 'random') currentDanTitle.innerText = "랜덤 도전!";
    else currentDanTitle.innerText = `${dan}단 집중 공략!`;
    
    scoreBoard.innerText = "현재 점수: 0점";
    makeQuestion();
}

// 🏆 게임 종료
function endGame() {
    clearInterval(timerInterval);
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreText.innerText = `총점: ${score}점`;

    if (score === 100) finalComment.innerText = "💯 완벽하네! 자네는 구구단 천재야!";
    else if (score >= 80) finalComment.innerText = "🦜 아주 훌륭해! 조금만 더 하면 만점이야.";
    else if (score >= 50) finalComment.innerText = "😅 노력하면 더 잘할 수 있어!";
    else finalComment.innerText = "📚 공부 좀 더 하고 오게나...";
}

// 🏠 처음 화면으로 (수정됨!)
function goToIntro() {
    clearInterval(timerInterval); // 타이머 멈추기
    gameScreen.classList.add("hidden");   // 게임 화면 숨기기
    resultScreen.classList.add("hidden"); // 성적표 숨기기
    introScreen.classList.remove("hidden"); // 인트로만 보여주기
}

function retrySameDan() { startGame(selectedDan); }

function startTimer() {
    clearInterval(timerInterval); 
    timeLeft = 10; 
    timerDisplay.innerText = timeLeft;
    
    timerInterval = setInterval(function() {
        timeLeft--; 
        timerDisplay.innerText = timeLeft; 
        if (timeLeft > 0) playTick(); 
        else {
            clearInterval(timerInterval);
            timeOut(); 
        }
    }, 1000); 
}

function timeOut() {
    playDdaeng(); 
    resultMessage.innerText = "⏰ 시간 초과!";
    resultMessage.style.color = "red";
    userInput.value = ""; 
    setTimeout(nextStage, 2000);
}

function nextStage() {
    if (questionCount >= totalQuestions) endGame(); 
    else makeQuestion(); 
}

function makeQuestion() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    clearInterval(timerInterval); 
    resultMessage.innerText = ""; 

    questionCount++; 
    qCountDisplay.innerText = `${questionCount}`; 

    if (selectedDan === 'random') num1 = Math.floor(Math.random() * 8) + 2; 
    else num1 = selectedDan;

    num2 = Math.floor(Math.random() * 9) + 1;
    
    questionDisplay.innerText = `${num1} x ${num2} = ?`;
    userInput.value = "";
    userInput.focus();
    
    startTimer(); 
}

function checkAnswer() {
    if (userInput.value === "") return;
    const userAnswer = parseInt(userInput.value);
    const realAnswer = num1 * num2;

    if (userAnswer === realAnswer) {
        clearInterval(timerInterval); 
        playDingDongDang();
        resultMessage.innerText = "딩동댕! 정답 🎉";
        resultMessage.style.color = "green";
        score += 10;
        scoreBoard.innerText = `현재 점수: ${score}점`;
        setTimeout(nextStage, 1000); 
    } else {
        playDdaeng();
        resultMessage.innerText = "땡! 😱";
        resultMessage.style.color = "red";
        userInput.value = "";
        userInput.focus();
    }
}

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") checkAnswer();
});