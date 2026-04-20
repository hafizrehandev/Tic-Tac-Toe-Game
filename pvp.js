function playTick() {
    let sound = document.getElementById("tickSound");
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function playWin() {
    let sound = document.getElementById("winSound");
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

// new cod the start
function winEffect() {
    const duration = 2500;
    const end = Date.now() + duration;

    const colors = [
        '#FFD700', // gold
        '#FF4D4D', // red
        '#4DA6FF', // blue
        '#34C759', // green
        '#C44DFF', // purple
        '#FFFFFF'  // white shine
    ];

    (function frame() {

        // 🎯 center rain (main effect)
        confetti({
            particleCount: 5,
            spread: 90,
            startVelocity: 18,
            gravity: 1.1,
            origin: {
                x: 0.5 + (Math.random() * 0.2 - 0.1), // slight left/right randomness
                y: 0.2 + Math.random() * 0.2          // NOT full top, slightly below top
            },
            colors: colors,
            scalar: 1
        });

        // 🎯 soft side sparkle (sub effect)
        if (Math.random() > 0.7) {
            confetti({
                particleCount: 3,
                spread: 60,
                startVelocity: 15,
                origin: {
                    x: Math.random(),
                    y: 0.1
                },
                colors: colors
            });
        }

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();
}

// new cod the end






let currentplayer = "X";
let arr = Array(9).fill(null);

/* CLICK HANDLER function  */
function handleClick(el) {

    playTick();

    const id = Number(el.id);

    if (arr[id] !== null) return;

    arr[id] = currentplayer;
    el.innerText = currentplayer;

    if (checkWinner()) return;

    currentplayer = currentplayer === "X" ? "O" : "X";
}

/* new GAME  function*/
function newGame() {
    arr = Array(9).fill(null);
    currentplayer = "X";

    document.querySelectorAll(".col").forEach(cell => {
        cell.innerText = "";
    });

    document.getElementById("status").innerText = "";
}
// new GAME  function the end

/* POPUP OPEN */
function openPopup() {
    document.getElementById("playerSetupModal").style.display = "flex";
}

/* POPUP CLOSE */
window.onload = function () {
    document.getElementById("playerSetupModal").style.display = "flex";
};

/* START GAME */

// Popup  function the start
function closePopup() {
    document.getElementById("playerSetupModal").style.display = "none";

}
// Popup  function the end

//   startGame function

function startGame() {

    let p1 = document.getElementById("player1").value.trim();
    let p2 = document.getElementById("player2").value.trim();

    if (!p1 || !p2) {
        alert("Enter your names");
        return;
    }

    localStorage.setItem("p1", p1);
    localStorage.setItem("p2", p2);

    closePopup();

    document.getElementById("status").innerText =
        p1 + " vs " + p2 + " Game Started ";
}
// startGame function the end
// checkWinner function the start
function checkWinner() {

    let p1 = localStorage.getItem("p1") || "Player 1";
    let p2 = localStorage.getItem("p2") || "Player 2";

    let winner = currentplayer === "X" ? p1 : p2;

    if (
        (arr[0] && arr[0] === arr[1] && arr[1] === arr[2]) ||
        (arr[3] && arr[3] === arr[4] && arr[4] === arr[5]) ||
        (arr[6] && arr[6] === arr[7] && arr[7] === arr[8]) ||
        (arr[0] && arr[0] === arr[3] && arr[3] === arr[6]) ||
        (arr[1] && arr[1] === arr[4] && arr[4] === arr[7]) ||
        (arr[2] && arr[2] === arr[5] && arr[5] === arr[8]) ||
        (arr[0] && arr[0] === arr[4] && arr[4] === arr[8]) ||
        (arr[2] && arr[2] === arr[4] && arr[4] === arr[6])
    ) {

        playWin();
        winEffect();
        document.getElementById("status").innerText =
            "🏆 " + winner + " is the Champion";
        return true;
    }

    if (!arr.includes(null)) {
        document.getElementById("status").innerText = "Match Draw";
        return true;
    }

    return false;
}

function goToNewGame() {
    arr = Array(9).fill(null);
    currentplayer = "X";

    // 🛑 STOP SOUND
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

    document.getElementById("status").innerText = "";
}

function goBack() {
    window.location.href = "index.html";
}

function cancel() {
    window.location.href = 'game.html';
}