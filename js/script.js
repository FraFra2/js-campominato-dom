const planetSprites = ["img/planetSprites/wetPlanet.gif",
                    "img/planetSprites/dryPlanet.gif",
                    "img/planetSprites/islandPlanet.gif",
                    "img/planetSprites/icePlanet.gif",
                    "img/planetSprites/lavaPlanet.gif",
                    "img/planetSprites/noAtmPlanet.gif",
                    "img/planetSprites/gasGiant.gif",
                    "img/planetSprites/gasGiantRing.gif",
                    "img/planetSprites/galaxy.gif",
                    "img/planetSprites/galaxy2.gif",
                    "img/planetSprites/star.gif"];

const blackHoleSprite = "img/planetSprites/blackHole.gif";
const container = document.getElementById("gridContainer");
const generateGridButton = document.getElementById("generateGrid");
const diffSel = document.getElementById("diff");
const scoreLabel = document.querySelector(".score");
const tutorial = document.querySelector(".tutorial");
let score = 0;
//Crea Griglia tramite click su button
generateGridButton.addEventListener("click",
    function(){
        tutorial.classList.add("d-none");
        score = 0;
        scoreLabel.innerHTML = `Score: ${score}`;
        this.innerHTML = "Rigenera la Griglia."
        container.innerHTML = "";
        generateGrid(diff);
    }
); 




//Funzione di generazione griglia, parametro dimensione della griglia
function generateGrid(size){
    let diff;
    let cell;
    let selClass;
    let divArr = [];
    //estrazione valore diff e relativo controllo
    selectedDiff = diffSel.value;
    switch (selectedDiff) {
        case "diff1":
            size = 100;
            selClass = "smallCell";
            break;
        case "diff2":
            size = 81;
            selClass = "mediumCell";
            break;
        case "diff3":
            size = 49;
            selClass = "largeCell";
            break;
    }
    //array contenente i buchi neri
    let blackHolesArr = generateBlackHoles(size);
    console.log(blackHolesArr);
   
    //crea i div in base alla diff
    for (let index = 1; index <= size; index++) {
        cell = document.createElement("div");
        cell.classList.add("cell", "d-flex", "justify-content-center", "align-items-center");
        //aggiungi classe selezionato
        cell.classList.add(selClass);
        cell.innerHTML = index;
        container.append(cell);
        //aggiungi div all'array
        divArr.push(cell);
        //On click della cella
        
        cell.addEventListener("click", 
        function(){
            chosenPlanet = pickRandomFromArray(planetSprites);
            //resetta il contenuto e metti
            this.innerHTML = "";
            this.innerHTML = `<img src="${chosenPlanet}" class = "w-75">`;
            this.classList.add("activeCell");
            //update score
            score ++;
            scoreLabel.innerHTML = `Score: ${score}`;
        });
        
    }
    for (let index = 0; index < blackHolesArr.length; index++) {
        const element = blackHolesArr[index]; 
        console.log(element);
        divArr[element - 1].addEventListener("click", function(){
            //resetta il contenuto e metti
            this.innerHTML = "";
            this.innerHTML = `<img src="${blackHoleSprite}" class = "w-100">`;
            this.classList.add("activeCell");
            this.classList.add("blackHole");
            score--;
            alert(`GAME OVER Score: ${score}`);
            //update score
            resetGridContent();
        });
    }
  
}

function pickRandomFromArray(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateBlackHoles(max) {
    const numbers = [];
    
    while (numbers.length < 16) {
      const randomNum = Math.floor(Math.random() * max) + 1;
      
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    
    return numbers;
  }

  function resetGridContent() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.innerHTML = i + 1;
      cell.classList.remove("activeCell");
      cell.classList.remove("blackHole");
    }
    score = 0;
    scoreLabel.innerHTML = `Score: ${score}`;

  }