const getBlackKeys = document.querySelector("#blackKeysContainer");
const getWhiteKeys = document.querySelector("#whiteKeysContainer");

const blackPianoKeys = 13;
const whitePianoKeys = 14;

const blackKeys = [];
const whiteKeys = [];

const playPianoKey = (newKey) => {
  new Audio(newKey).play();
};

const addBlackKeys = () => {
  
  for (let i = 0; i < blackPianoKeys; i++) {
    const blackKey = document.createElement("button");

    
    if (i === 2 || i === 6 || i === 9) {
      blackKey.classList.add("transparent-btn");
    } else {
      blackKey.classList.add("black-keys-hover");
    }

    blackKey.classList.add("black-keys");
    getBlackKeys.appendChild(blackKey);

    blackKeys.push(blackKey);
  }

  
  blackKeys.forEach((key, i) => {
    const transparentBtns = [2, 6, 9].map((x) => blackKeys[x]); 

    if (
      key === transparentBtns[0] ||
      key === transparentBtns[1] ||
      key === transparentBtns[2]
    ) {
      return;
    }
    const newKey = `./pianoKeys/key-black${i}.mp3`;
    key.addEventListener("click", () => playPianoKey(newKey));
  });
};

const addWhiteKeys = () => {
  
  for (let i = 0; i < whitePianoKeys; i++) {
    const whiteKey = document.createElement("button");
    whiteKey.classList.add("white-keys");
    getWhiteKeys.appendChild(whiteKey);

    whiteKeys.push(whiteKey);
  }

  
  whiteKeys.forEach((key, i) => {
    const newKey = `./pianoKeys/key-white${i}.mp3`;
    key.addEventListener("click", () => playPianoKey(newKey));
  });
};

addBlackKeys();
addWhiteKeys();

addEventListener("keydown", (e) => {
  console.log(e.key);
  
  if(e.key === "a") playPianoKey(`./pianoKeys/key-white0.mp3`);
  else if(e.key === "s") playPianoKey(`./pianoKeys/key-white1.mp3`);
  else if(e.key === "d") playPianoKey(`./pianoKeys/key-white2.mp3`);
  else if(e.key === "f") playPianoKey(`./pianoKeys/key-white3.mp3`);
  else if(e.key === "g") playPianoKey(`./pianoKeys/key-white4.mp3`);
  else if(e.key === "h") playPianoKey(`./pianoKeys/key-white5.mp3`);
  else if(e.key === "j") playPianoKey(`./pianoKeys/key-white6.mp3`);
  else if(e.key === "k") playPianoKey(`./pianoKeys/key-white7.mp3`);
  else if(e.key === "l") playPianoKey(`./pianoKeys/key-white8.mp3`);
  else if(e.key === "ø") playPianoKey(`./pianoKeys/key-white9.mp3`);
  else if(e.key === "æ") playPianoKey(`./pianoKeys/key-white10.mp3`);
  else if(e.key === "'") playPianoKey(`./pianoKeys/key-white11.mp3`);


  if(e.key === "w") playPianoKey(`./pianoKeys/key-black0.mp3`);
  else if(e.key === "e") playPianoKey(`./pianoKeys/key-black1.mp3`);
  else if(e.key === "t") playPianoKey(`./pianoKeys/key-black2.mp3`);
  else if(e.key === "y") playPianoKey(`./pianoKeys/key-black3.mp3`);
  else if(e.key === "u") playPianoKey(`./pianoKeys/key-black4.mp3`);
  else if(e.key === "o") playPianoKey(`./pianoKeys/key-black5.mp3`);
  else if(e.key === "p") playPianoKey(`./pianoKeys/key-black6.mp3`);
  else if(e.key === "¨") playPianoKey(`./pianoKeys/key-black8.mp3`);

})

window.addEventListener("resize", function() {
  const piano = document.querySelector("#piano");

  if (window.innerWidth > window.innerHeight) {

    piano.classList.remove("piano-horizontal");
  } else {

    piano.classList.add("piano-horizontal");
  }
});
