document.addEventListener("DOMContentLoaded", () => {
    const ticTacToeBox = document.getElementById("ticTacToeBox");
    let touchStartTime = 0;
    let touchTimeout;

    ticTacToeBox.addEventListener("touchstart", (e) => {
        touchStartTime = Date.now();
        touchTimeout = setTimeout(() => {
           
            showHoverInfo();
        }, 1500); 
    });

    ticTacToeBox.addEventListener("touchend", () => {
        clearTimeout(touchTimeout);
        
        hideHoverInfo();
    });

    function showHoverInfo() {
        const infoBox = ticTacToeBox.querySelector(".info-box");
        infoBox.style.display = "block";
    }

    function hideHoverInfo() {
        const infoBox = ticTacToeBox.querySelector(".info-box");
        infoBox.style.display = "none";
    }
});

function redirectToGame(categoryName) {
    switch (categoryName) {
        case "TIC TAC TOE":
            window.location.href = "tic_tac_toe.html";
            break;
        case "SNAKE":
            window.location.href = "Flags/index.html";
            break;
       
        default:
            
            alert("Juego no encontrado");
    }
}

const modalInfo = document.getElementById("modalInfo");
const modalClose = document.getElementById("modalClose");
const infoIcon = document.querySelector(".info-icon");

infoIcon.addEventListener("click", () => {
    modalInfo.style.display = "block";
});

modalClose.addEventListener("click", () => {
    modalInfo.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modalInfo) {
        modalInfo.style.display = "none";
    }
});
