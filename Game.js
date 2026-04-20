function playTick() {
  let sound = document.getElementById("tickSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
}

function playWin() {
  let sound = document.getElementById("winSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }
}

// new cod the start 
function winEffect() {
    const duration = 2500;
    const end = Date.now() + duration;

    const colors = ['#FFD700','#FF4D4D','#4DA6FF','#34C759','#C44DFF','#FFFFFF'];

    (function frame() {

        confetti({
            particleCount: 5,
            spread: 90,
            startVelocity: 18,
            gravity: 1.1,
            origin: {
                x: 0.5 + (Math.random() * 0.2 - 0.1),
                y: 0.2 + Math.random() * 0.2
            },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();
}

// new cod the end

let currentplayer = "X";
let arr = Array(9).fill(null);
let gameStarted = false;

function checkWinner() {
    const status = document.getElementById("status");

    if (
        (arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2]) ||
        (arr[3] !== null && arr[3] === arr[4] && arr[4] === arr[5]) ||
        (arr[6] !== null && arr[6] === arr[7] && arr[7] === arr[8]) ||
        (arr[0] !== null && arr[0] === arr[3] && arr[3] === arr[6]) ||
        (arr[1] !== null && arr[1] === arr[4] && arr[4] === arr[7]) ||
        (arr[2] !== null && arr[2] === arr[5] && arr[5] === arr[8]) ||
        (arr[0] !== null && arr[0] === arr[4] && arr[4] === arr[8]) ||
        (arr[2] !== null && arr[2] === arr[4] && arr[4] === arr[6])
    ) {
        playWin();
        winEffect();

        status.innerText = currentplayer === "X"
            ? "💪🧍Your Game Win 🧍💪"
            : "Computer Win ";

        return true;
    }

    if (!arr.some(e => e === null)) {
        status.innerText = "Match Draw ";
        return true;
    }

    return false;
}

function handleClick(el) {

    if (!gameStarted) return;

    const id = Number(el.id);
    if (arr[id] !== null) return;

    arr[id] = currentplayer;
    el.innerText = currentplayer;

    playTick();

    const gameOver = checkWinner();
    if (gameOver) return;

    currentplayer = currentplayer === "X" ? "O" : "X";

    // ⏱️ FIX: computer delay 1 second
    if (currentplayer === "O") {
        setTimeout(computerMove, 1000);
    }
}

function computerMove() {
    let empty = arr
        .map((v, i) => v === null ? i : null)
        .filter(v => v !== null);

    if (empty.length === 0) return;

    let rand = empty[Math.floor(Math.random() * empty.length)];

    arr[rand] = "O";
    document.getElementById(rand).innerText = "O";

    playTick();

    const gameOver = checkWinner();
    if (gameOver) return;

    currentplayer = "X";
}

function newGame() {
    arr = Array(9).fill(null);
    currentplayer = "X";

    document.getElementById("status").innerText = "";

    // 🛑 STOP SOUND ON NEW GAME
    let tick = document.getElementById("tickSound");
    let win = document.getElementById("winSound");

    if (tick) {
        tick.pause();
        tick.currentTime = 0;
    }

    if (win) {
        win.pause();
        win.currentTime = 0;
    }

    document.querySelectorAll(".col").forEach(cell => {
        cell.innerText = "";
    });
}

function goBack() {
    window.location.href = "index.html";
}

function goToPVP() {
    window.location.href = "pvp.html";
}

document.getElementById("computerVsPlayer").addEventListener("click", function () {

    document.getElementById("gameUI").style.display = "block";

    gameStarted = true;
    newGame();

    document.getElementById("status").innerText =
        "Computer vs Player Game Started";

});