let gameState = {
	board: [
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"]
    ],
    player: "x",
    winner: null,
    finished: false
};

function playerMove (player, position, number) {
    if(gameState.finished == true) return true
    document.getElementById("invalid").innerHTML=""
    let row = position[0];
    let col = position[1];
    if(checkMove(row,col) == true){ 
    gameState.board[row][col] =player
    if (gameState.player == "x") test(number)
    else test2(number)
    if(gameState.player == "x") gameState.player = "o"
    else gameState.player = "x"
    printBoard()


    }
    else{
       console.log("Error: Invalid move!") 
       document.getElementById("invalid").innerHTML="Error: Invalid move!"
    }
    if(checkWin() == true){
        gameState.finished = true
        console.log("Game is done!"+"Player:"+gameState.winner+"wins!")
        document.getElementById("winner").innerHTML="Game is over!"
    }
    else console.log("Game continues...");
}

function checkMove (row, col){
    //return row >= 0 && row <=3 && col >= 0 && row <=3 && gameState.board[row][col] == '_';
    return gameState.board[row][col] == '_';
}

function checkWin(){
    var a = gameState.board
    if((a[0][0] == "x" || a[0][0] == "o") && (a[0][0] == a[1][0] && a[1][0] == a[2][0])) return true; //vertical rows
    if((a[0][1] == "x" || a[0][1] == "o") && (a[0][1] == a[1][1] && a[1][1] == a[2][1])) return true; gameState.winner = a[0,1]
    if((a[0][2] == "x" || a[0][2] == "o") && (a[0][2] == a[1][2] && a[1][2] == a[2][2])) return true; gameState.winner = a[0,2]

    if((a[0][0] == "x" || a[0][0] == "o") && (a[0][0] == a[0][1] && a[0][1] == a[0][2])) return true; gameState.winner = a[0,0] //horizontal rows
    if((a[1][0] == "x" || a[1][0] == "o")&& (a[1][0] == a[1][1] && a[1][1] == a[1][2])) return true; gameState.winner = a[1,0]
    if((a[2][0] == "x" || a[2][0] == "o")&& (a[2][0] == a[2][1] && a[2][1] == a[2][2])) return true; gameState.winner = a[2,0]

    if((a[0][0] == "x" || a[0][0] == "o")&& (a[0][0] == a[1][1] && a[1][1] == a[2][2])) return true; gameState.winner = a[0,0] //diagonal wins
    if((a[0][2] == "x" || a[0][2] == "o")&& (a[0][2] == a[1][1] && a[1][1] == a[2][0])) return true; gameState.winner = a[0,0]
    return false
}

function reset() {
    gameState.board = [
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"]
    ];
    gameState.player = "x",
    gameState.winner = null,
    gameState.finished = false;
}

function printBoard(){
    var arrText = '';
    for(var i = 0; i < gameState.board.length; i++) {
        for(var z = 0; z < gameState.board[i].length; z++) {
          arrText+=(gameState.board[i][z]) + ' ';
        }
        console.log(arrText);
        arrText='';
      }
}
function test2(num){
    const group = document.querySelector("g"); 
    const n = "http://www.w3.org/2000/svg";

    let circ = document.createElementNS(n, "circle");  
    if(num==1){
        circ.setAttribute("cx", "650");
        circ.setAttribute("cy", "100");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[0,0]),1");

    }

    if(num==2){
        circ.setAttribute("cx", "750");
        circ.setAttribute("cy", "100");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[0,1]),2");

    }

    if(num==3){
        circ.setAttribute("cx", "850");
        circ.setAttribute("cy", "100");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[0,2]),3");

    }

    if(num==4){
        circ.setAttribute("cx", "650");
        circ.setAttribute("cy", "200");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[1,0]),4");

    }
    if(num==5){
        circ.setAttribute("cx", "750");
        circ.setAttribute("cy", "200");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[1,1]),5");
    }
    if(num==6){
        circ.setAttribute("cx", "850");
        circ.setAttribute("cy", "200");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[1,2]),6");
    }
    if(num==7){
        circ.setAttribute("cx", "650");
        circ.setAttribute("cy", "300");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[2,0]),7");
    }
    if(num==8){
        circ.setAttribute("cx", "750");
        circ.setAttribute("cy", "300");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[2,1]),8");
    }
    if(num==9){
        circ.setAttribute("cx", "850");
        circ.setAttribute("cy", "300");
        circ.setAttribute("r","40");
        circ.setAttribute("stroke", "black");
        circ.setAttribute("fill", "white");
        circ.setAttribute("onclick","playerMove(gameState.player,[2,2]),9");
    }
    group.appendChild(circ);
}

function test(num){
    const group = document.querySelector("g"); 
    const n = "http://www.w3.org/2000/svg";

    let line1 = document.createElementNS(n, "line");
    let line2 = document.createElementNS(n, "line");
    if(num==1){
        line1.setAttribute("x1", "600");
        line1.setAttribute("y1", "50");
        line1.setAttribute("x2", "700");
        line1.setAttribute("y2", "150");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "700");
        line2.setAttribute("y1", "50");
        line2.setAttribute("x2", "600");
        line2.setAttribute("y2", "150");
        line2.setAttribute("stroke", "black")
    }
    else if(num==2){
        line1.setAttribute("x1", "700");
        line1.setAttribute("y1", "50");
        line1.setAttribute("x2", "800");
        line1.setAttribute("y2", "150");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "800");
        line2.setAttribute("y1", "50");
        line2.setAttribute("x2", "700");
        line2.setAttribute("y2", "150");
        line2.setAttribute("stroke", "black")
    }
    else if(num==3){
        line1.setAttribute("x1", "800");
        line1.setAttribute("y1", "50");
        line1.setAttribute("x2", "900");
        line1.setAttribute("y2", "150");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "900");
        line2.setAttribute("y1", "50");
        line2.setAttribute("x2", "800");
        line2.setAttribute("y2", "150");
        line2.setAttribute("stroke", "black")
    }
    else if(num==4){
        line1.setAttribute("x1", "600");
        line1.setAttribute("y1", "150");
        line1.setAttribute("x2", "700");
        line1.setAttribute("y2", "250");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "700");
        line2.setAttribute("y1", "150");
        line2.setAttribute("x2", "600");
        line2.setAttribute("y2", "250");
        line2.setAttribute("stroke", "black")
    }
    else if(num==5){
        line1.setAttribute("x1", "700");
        line1.setAttribute("y1", "150");
        line1.setAttribute("x2", "800");
        line1.setAttribute("y2", "250");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "800");
        line2.setAttribute("y1", "150");
        line2.setAttribute("x2", "700");
        line2.setAttribute("y2", "250");
        line2.setAttribute("stroke", "black")
    }
    else if(num==6){
        line1.setAttribute("x1", "800");
        line1.setAttribute("y1", "150");
        line1.setAttribute("x2", "900");
        line1.setAttribute("y2", "250");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "900");
        line2.setAttribute("y1", "150");
        line2.setAttribute("x2", "800");
        line2.setAttribute("y2", "250");
        line2.setAttribute("stroke", "black")
    }
    else if(num==7){
        line1.setAttribute("x1", "600");
        line1.setAttribute("y1", "250");
        line1.setAttribute("x2", "700");
        line1.setAttribute("y2", "350");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "700");
        line2.setAttribute("y1", "250");
        line2.setAttribute("x2", "600");
        line2.setAttribute("y2", "350");
        line2.setAttribute("stroke", "black")
    }
    else if(num==8){
        line1.setAttribute("x1", "700");
        line1.setAttribute("y1", "250");
        line1.setAttribute("x2", "800");
        line1.setAttribute("y2", "350");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "800");
        line2.setAttribute("y1", "250");
        line2.setAttribute("x2", "700");
        line2.setAttribute("y2", "350");
        line2.setAttribute("stroke", "black")
    }
    else if(num==9){
        line1.setAttribute("x1", "800");
        line1.setAttribute("y1", "250");
        line1.setAttribute("x2", "900");
        line1.setAttribute("y2", "350");
        line1.setAttribute("stroke", "black");

        line2.setAttribute("x1", "900");
        line2.setAttribute("y1", "250");
        line2.setAttribute("x2", "800");
        line2.setAttribute("y2", "350");
        line2.setAttribute("stroke", "black")
    }
    group.appendChild(line1);
    group.appendChild(line2);
    window.addEventListener("keydown", (ev) => {
        if(ev.code==='Backspace') document.body.style.backgroundColor = 'red'
        reset() 
        for(shape in group.children){
            group.children[shape].remove()
        }
      });
      window.addEventListener("keyup", (ev) => {
        if(ev.code==='Backspace') document.body.style.backgroundColor = 'white'
      });
}