// 7급 한자 데이터 (100자)
const hanjaData = [
    // 7급 II (50자)
    { hanja: "家", mean: "집 가" }, { hanja: "間", mean: "사이 간" }, { hanja: "江", mean: "강 강" }, { hanja: "車", mean: "수레 거, 수레 차" }, { hanja: "工", mean: "장인 공" },
    { hanja: "空", mean: "빌 공" }, { hanja: "氣", mean: "기운 기" }, { hanja: "記", mean: "기록할 기" }, { hanja: "男", mean: "사내 남" }, { hanja: "內", mean: "안 내" },
    { hanja: "農", mean: "농사 농" }, { hanja: "答", mean: "대답 답" }, { hanja: "道", mean: "길 도" }, { hanja: "動", mean: "움직일 동" }, { hanja: "力", mean: "힘 력" },
    { hanja: "立", mean: "설 립" }, { hanja: "每", mean: "매양 매" }, { hanja: "名", mean: "이름 명" }, { hanja: "物", mean: "물건 물" }, { hanja: "方", mean: "모 방" },
    { hanja: "不", mean: "아닐 불" }, { hanja: "事", mean: "일 사" }, { hanja: "上", mean: "윗 상" }, { hanja: "姓", mean: "성 성" }, { hanja: "世", mean: "인간 세" },
    { hanja: "手", mean: "손 수" }, { hanja: "市", mean: "저자 시" }, { hanja: "時", mean: "때 시" }, { hanja: "食", mean: "밥 식, 먹을 식" }, { hanja: "安", mean: "편안 안" },
    { hanja: "午", mean: "낮 오" }, { hanja: "右", mean: "오를 우, 오른 우" }, { hanja: "子", mean: "아들 자" }, { hanja: "自", mean: "스스로 자" }, { hanja: "場", mean: "마당 장" },
    { hanja: "全", mean: "온전 전" }, { hanja: "前", mean: "앞 전" }, { hanja: "電", mean: "번개 전" }, { hanja: "正", mean: "바를 정" }, { hanja: "足", mean: "발 족" },
    { hanja: "左", mean: "왼 좌" }, { hanja: "直", mean: "곧을 직" }, { hanja: "平", mean: "평평할 평" }, { hanja: "下", mean: "아래 하" }, { hanja: "漢", mean: "한수 한, 한나라 한" },
    { hanja: "海", mean: "바다 해" }, { hanja: "話", mean: "말씀 화" }, { hanja: "活", mean: "살 활" }, { hanja: "孝", mean: "효도 효" }, { hanja: "後", mean: "뒤 후" },

    // 7급 (50자)
    { hanja: "歌", mean: "노래 가" }, { hanja: "口", mean: "입 구" }, { hanja: "旗", mean: "기 기" }, { hanja: "冬", mean: "겨울 동" }, { hanja: "同", mean: "한가지 동" },
    { hanja: "洞", mean: "골 동, 밝을 통" }, { hanja: "登", mean: "오를 등" }, { hanja: "來", mean: "올 래" }, { hanja: "老", mean: "늙을 로" }, { hanja: "里", mean: "마을 리" },
    { hanja: "林", mean: "수풀 림" }, { hanja: "面", mean: "낯 면" }, { hanja: "命", mean: "목숨 명" }, { hanja: "問", mean: "물을 문" }, { hanja: "文", mean: "글월 문" },
    { hanja: "百", mean: "일백 백" }, { hanja: "夫", mean: "지아비 부" }, { hanja: "算", mean: "셈 산" }, { hanja: "色", mean: "빛 색" }, { hanja: "夕", mean: "저녁 석" },
    { hanja: "少", mean: "적을 소" }, { hanja: "所", mean: "바 소" }, { hanja: "數", mean: "셈 수" }, { hanja: "植", mean: "심을 식" }, { hanja: "心", mean: "마음 심" },
    { hanja: "語", mean: "말씀 어" }, { hanja: "然", mean: "그럴 연" }, { hanja: "有", mean: "있을 유" }, { hanja: "育", mean: "기를 육" }, { hanja: "邑", mean: "고을 읍" },
    { hanja: "入", mean: "들 입" }, { hanja: "字", mean: "글자 자" }, { hanja: "祖", mean: "할아비 조" }, { hanja: "主", mean: "임금 주, 주인 주" }, { hanja: "住", mean: "살 주" },
    { hanja: "重", mean: "무거울 중" }, { hanja: "地", mean: "따 지" }, { hanja: "紙", mean: "종이 지" }, { hanja: "千", mean: "일천 천" }, { hanja: "天", mean: "하늘 천" },
    { hanja: "川", mean: "내 천" }, { hanja: "草", mean: "풀 초" }, { hanja: "村", mean: "마을 촌" }, { hanja: "秋", mean: "가을 추" }, { hanja: "春", mean: "봄 춘" },
    { hanja: "出", mean: "날 출" }, { hanja: "便", mean: "편할 편, 똥오줌 변" }, { hanja: "夏", mean: "여름 하" }, { hanja: "花", mean: "꽃 화" }, { hanja: "休", mean: "쉴 휴" }
];

let currentQuestion = {};
let score = 0; 
let questionCount = 0;
const totalQuestions = 30; // 30문제
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

// 효과음
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
    
    // 100개 중 30개 무작위 뽑기
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
    scoreDisplay.innerText = `점수: ${Math.round(score)}`; 
    resultMessage.innerText = "";

    // 🌟 랜덤 문제 유형 결정! (0.5보다 작으면 한자 문제, 크면 뜻 문제)
    const isHanjaQuestion = Math.random() < 0.5;

    if (isHanjaQuestion) {
        // [유형 1] 한자가 문제 -> 보기는 뜻(한글)
        mainDisplay.innerHTML = `<div class="hanja-text">${currentQuestion.hanja}</div><div class="pointer-icon">☝️</div>`;
    } else {
        // [유형 2] 뜻이 문제 -> 보기는 한자
        // 뜻은 글자가 많으므로 폰트 크기를 40px로 조정
        mainDisplay.innerHTML = `<div class="hanja-text" style="font-size: 40px; word-break: keep-all;">${currentQuestion.mean}</div><div class="pointer-icon">☝️</div>`;
    }

    // 보기 4개 만들기
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
        // 유형에 따라 버튼 글씨 설정
        if (isHanjaQuestion) {
            // 보기가 뜻(한글)일 때
            btn.innerText = answers[index].mean;
            btn.style.fontSize = "19px"; // 기본 크기
            btn.style.fontFamily = "Arial, sans-serif";
        } else {
            // 보기가 한자일 때
            btn.innerText = answers[index].hanja;
            btn.style.fontSize = "35px"; // 한자는 잘 보이게 크게!
            btn.style.fontFamily = "'Malgun Gothic', 'Dotum', sans-serif";
        }

        btn.className = ""; 
        // 🌟 정답 체크 함수에 '어떤 유형이었는지'는 중요하지 않음 (객체 자체를 비교하므로)
        btn.onclick = () => checkAnswer(answers[index], btn, isHanjaQuestion);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 20; // 20초 (여유롭게!)
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
    const percentage = (timeLeft / 20) * 100;
    timerFill.style.width = `${percentage}%`;
    if (percentage < 30) timerFill.style.backgroundColor = "red";
    else timerFill.style.backgroundColor = "#ff7043"; 
}

function checkAnswer(selectedItem, btnElement, isHanjaQuestion) {
    if (isAnswering) return; 
    isAnswering = true; 
    clearInterval(timerInterval);

    if (selectedItem === currentQuestion) {
        playDingDongDang();
        btnElement.classList.add("correct");
        score += (100 / totalQuestions); 
        scoreDisplay.innerText = `점수: ${Math.round(score)}`;
        resultMessage.innerText = "정답! 도토리 +1 🌰";
        resultMessage.style.color = "#2e7d32";
    } else {
        playDdaeng();
        btnElement.classList.add("wrong");
        
        // 정답 버튼 찾아서 표시해주기
        const buttons = document.querySelectorAll(".answer-grid button");
        buttons.forEach(btn => {
            // 버튼에 적힌 글씨가 정답(뜻 or 한자)과 같은지 확인
            if (isHanjaQuestion) {
                if (btn.innerText === currentQuestion.mean) btn.classList.add("correct");
            } else {
                if (btn.innerText === currentQuestion.hanja) btn.classList.add("correct");
            }
        });
        
        // 오답 메시지도 유형에 따라 다르게
        if (isHanjaQuestion) {
            resultMessage.innerText = `땡! 정답은 '${currentQuestion.mean}' 입니다.`;
        } else {
            resultMessage.innerText = `땡! 정답은 '${currentQuestion.hanja}' 입니다.`;
        }
        resultMessage.style.color = "#c62828";
    }

    setTimeout(nextQuestion, 1500); 
}

function timeOut() {
    if (isAnswering) return;
    isAnswering = true;
    playDdaeng();
    
    // 시간 초과 시에도 정답 표시를 위해 현재 화면에 나와있는 버튼 텍스트를 확인해야 함
    // (간단히 모든 버튼 중 정답을 포함하는 것을 찾음)
    const buttons = document.querySelectorAll(".answer-grid button");
    buttons.forEach(btn => {
        if (btn.innerText === currentQuestion.mean || btn.innerText === currentQuestion.hanja) {
            btn.classList.add("correct");
        }
    });

    resultMessage.innerText = "시간 초과! 다람쥐가 도망갔어요!";
    resultMessage.style.color = "red";
    setTimeout(nextQuestion, 1500);
}

function endGame() {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    
    let finalScore = Math.round(score);
    if (finalScore > 100) finalScore = 100;

    finalScoreText.innerText = `총점: ${finalScore}점`;

    if (finalScore === 100) {
        finalComment.innerHTML = "😲 <b>이럴 수가! 100점이라니!</b><br>깐깐한 다람쥐 샘 눈에도 흠잡을 곳이 없군.<br>정말 대단해! 특급 칭찬을 주지! 🐿️💖";
    } else if (finalScore >= 80) {
        finalComment.innerHTML = "🌰 <b>음, 합격이다.</b><br>제법이군. 하지만 방심하지 마라.<br>다음엔 만점을 노려보도록!";
    } else if (finalScore >= 50) {
        finalComment.innerHTML = "🍂 <b>노력이 부족해!</b><br>겨울을 나려면 도토리를 더 모아야 해.<br>공부를 게을리하지 말게.";
    } else {
        finalComment.innerHTML = "💨 <b>실망이야!</b><br>이 실력으론 어림도 없다.<br>다시 처음부터 공부하고 오게!";
    }
}

function goToIntro() {
    resultScreen.classList.add("hidden");
    introScreen.classList.remove("hidden");
}