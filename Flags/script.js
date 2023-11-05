let flagCount = 0;
let correctCount = 0;
let incorrectCount = 0;
let shownFlags = []; // rastrear las banderas mostradas

function startGame() {
    const flagCounter = document.getElementById('flag-counter');
    const scoreCounter = document.getElementById('score-counter');

    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        countriesData = data.map(country => {
          
          const name = country.translations.es || country.name;
          return { ...country, name };
        });

        flagCount = 0;
        updateFlagCounter();

        
        correctCount = 0;
        incorrectCount = 0;
        updateScoreCounter();

        
        shownFlags = [];

        
        initialize();
      })
      .catch(error => console.error(error));
}

function updateFlagCounter() {
    const flagCounter = document.getElementById('flag-counter');
    flagCounter.textContent = `Banderas: ${flagCount + 1}/${countriesData.length}`;
}

function updateScoreCounter() {
    const scoreCounter = document.getElementById('score-counter');
    scoreCounter.textContent = `Correctas: ${correctCount} / Incorrectas: ${incorrectCount}`;
}

function initialize() {
  nextFlag();
}

function nextFlag() {
    if (flagCount >= countriesData.length) {
        return;
    }


    let randomCountry;
    do {
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        randomCountry = countriesData[randomIndex];
    } while (shownFlags.includes(randomCountry.name));

   
    shownFlags.push(randomCountry.name);

  
    shuffleOptions(randomCountry);

 
    const flagContainer = document.getElementById('flag-container');
    flagContainer.innerHTML = ''; 
    const flagImage = document.createElement('img');
    flagImage.src = randomCountry.flags.png;
    flagImage.onload = function () {
      flagContainer.appendChild(flagImage);
    };
}

function shuffleOptions(correctCountry) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; 

 
    const optionLabels = ['A)', 'B)', 'C)'];

    const shuffledOptions = [];
    const correctOptionIndex = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        const option = countriesData[randomIndex];
        shuffledOptions.push(option);

        if (i === correctOptionIndex) {
            shuffledOptions[i] = correctCountry;
        }
    }

    
    for (let i = 0; i < 3; i++) {
        const option = shuffledOptions[i];

        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = optionLabels[i] + ' ' + option.name;
        optionDiv.onclick = function () {
            checkAnswer(this, correctCountry);
        };
        optionsContainer.appendChild(optionDiv);
    }
}



function checkAnswer(button, correctCountry) {
    const selectedCountryName = button.textContent.trim().substring(3);

 
    if (selectedCountryName === correctCountry.name) {
        document.getElementById("message").textContent = "¡Correcto!";
        correctCount++;
        updateScoreCounter();
    } else {
        document.getElementById("message").textContent = "Incorrecto. La respuesta correcta era " + correctCountry.name;
        incorrectCount++;
        updateScoreCounter();
    }


    flagCount++;
    updateFlagCounter();


    setTimeout(function () {
        document.getElementById("message").textContent = '';
    }, 1000); 


    setTimeout(nextFlag, 2000);
}


startGame();