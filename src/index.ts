const gameFieldDOMElement = document.querySelector(".game-field") as HTMLDivElement

let playerValue: 1 | 2 = 1;



const CROSS_HTML_ELEMENT =
`   <div class="cross-element-container">
        <span></span>
        <span></span>
    </div>
`


const ZERO_HTML_ELEMENT = 
`
    <div class="big-circle">
        <div class="small-circle"></div>
    </div>
`

const gameField: number[]  = 
    [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];


const CHECK_WIN_MAPS: number[][] =
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

function resetGameField(): void{
    for(let i:number = 0 ; i<9; i++){
        gameField[i] = 0
    }
    renderGame()
}

function renderGame(): void{
    gameFieldDOMElement.innerHTML = ``;
    let cellIndex:number = 0;

    for (let gameCellValue of gameField){
    
        let gameCell:HTMLDivElement = document.createElement("div")
        gameCell.classList.add("game-cell") 
        gameCell.setAttribute("index", cellIndex.toString())
        gameCell.addEventListener("click", (event)=> makeMove(event))

        if (gameCellValue === 1){
            gameCell.innerHTML = CROSS_HTML_ELEMENT;
        }
        
        else if (gameCellValue === 2){
            gameCell.innerHTML = ZERO_HTML_ELEMENT;
        }

        gameFieldDOMElement.appendChild(gameCell);
        cellIndex ++;
    }

    if (checkWin()){
        alert("win");
    }

   
}


function makeMove(event:MouseEvent){
    const gameCell: HTMLDivElement = event.target as HTMLDivElement;
    const gameCellIndex: string | null = gameCell.getAttribute("index")!;

    if (gameCellIndex !== null && gameField[+gameCellIndex] == 0){
        gameField[+gameCellIndex] = playerValue;
        renderGame();
        playerValue = playerValue%2+1;
        
        const turnLabel: HTMLParagraphElement = document.getElementById("turn-label") as HTMLParagraphElement;
        turnLabel.innerHTML = "Turn: ";
        if(playerValue === 1){
            turnLabel.innerHTML += "Cross"
        }
        else{
            turnLabel.innerHTML += "Zero"
        }
    }

}


function checkWin(): boolean{
    for(let checkWinMap of CHECK_WIN_MAPS){
        let sum = 0;
        for(let cellIndex of checkWinMap){
            if (gameField[cellIndex] === 0){
                sum = 0;
                break;
            }
            else{
                sum += gameField[cellIndex];
            }
        }
        if (sum === 3 || sum === 6){
            return true
        }
    }
    
    return false
}




renderGame();