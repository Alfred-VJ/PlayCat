let menuActiv = false;
let firstMoveSperCentro = null;
let firstBoxCentralTercer = null;
let firstboxCorn = null;
let firstBoxCentral = null;
let firstMove = true;
let Only = false;
let wind = false;
let J1 = true;
let J2 = false;
let tiros = {
    player1: [],
    player2: [],
}
let allBoxes = [
    "a1",
    "a2",
    "a3",
    "b1",
    "b2",
    "b3",
    "c1",
    "c2",
    "c3",
]
document.getElementById("ami").style.color = "blue";
let niveles = document.getElementById("misNiveles");
let nivel = null;
niveles.addEventListener("change", function () {
    reset();
    nivel = niveles.value;
});
function turno(casilla) {
    if (!wind) {
        if (casillaOcupada(casilla)) {
            let tiroPrint = document.getElementById(casilla);
            if (J1) {
                tiros.player1.push({ casilla })
                tiroPrint.textContent = "X";
                J2 = true;
                !Only ? J1 = false : setTimeout(() => machineTurn(), 500);
                setTimeout(() => gameOver(), 250);
                return false;
            } else {
                tiros.player2.push({ casilla })
                tiroPrint.textContent = "O";
                J1 = true;
                J2 = false;
                setTimeout(() => gameOver(), 250);
                return false;
            }
        }
    }
    return false;
}
function reset() {    
    firstMove = true;
    firstBoxCentral = null;
    firstboxCorn = null;
    for (let i = 0; i < 3; i++) {
        let cordenada = ""
        switch (i) {
            case 0:
                cordenada = "a";
                break;
            case 1:
                cordenada = "b";
                break;
            case 2:
                cordenada = "c";
                break;
        }
        for (let j = 1; j < 4; j++) {
            let cordenadaCon = `${cordenada}${j}`
            document.getElementById(cordenadaCon).textContent = "";
            document.getElementById(cordenadaCon.toUpperCase()).style.backgroundColor = "";
        }
    }
    tiros = {
        player1: [],
        player2: [],
    }
    J1 = true;
    J2 = false;
    wind = false;
    document.getElementById("ganadorMessage").textContent = "";
    document.getElementById("ganadorMessage").style.display = "none";
    showMenu(1);
    return false;
}

function casillaOcupada(casilla) {
    let O = document.getElementById(casilla).textContent;
    return O ? false : true;
}
function machineTurn() {
    if (nivel == "dos") {
        if (superMachinTurn()) {
            setTimeout(() => gameOver(), 250);
            return false;
        }
    }
    if (nivel == "tres") {
        if (invincibleMachin()) {
            setTimeout(() => gameOver(), 250);
            return false;
        }
    }
    if (!wind && stateOfBoard()) {
        let cA = azarNumber();
        if (document.getElementById(allBoxes[cA]).textContent === "") {
            document.getElementById(allBoxes[cA]).textContent = "O";
            setTimeout(() => gameOver(), 250);
            return false;
        } else {
            machineTurn();
        }
    }
}
function azarNumber() {
    return Math.floor(Math.random() * 9);
}
function friend() {
    reset();
    Only = false;
    document.getElementById("ami").style.color = "blue";
    document.getElementById("maq").style.color = "white";
    document.getElementById("content-niveles").style.display = "none";
}
function maquinaActiv() {
    reset();
    Only = true;
    document.getElementById("maq").style.color = "blue";
    document.getElementById("ami").style.color = "white";
    document.getElementById("content-niveles").style.display = "grid";
}
function gameOver() {
    let combinaciones = {
        uno: ["a1", "a2", "a3"],
        dos: ["b1", "b2", "b3"],
        tres: ["c1", "c2", "c3"],
        cuatro: ["a1", "b1", "c1"],
        cinco: ["a2", "b2", "c2"],
        seis: ["a3", "b3", "c3"],
        siete: ["a1", "b2", "c3"],
        ocho: ["c1", "b2", "a3"],
    }
    for (combinacion in combinaciones) {
        let arr = [];
        for (let i = 0; i < combinaciones[combinacion].length; i++) {
            let marca = document.getElementById(combinaciones[combinacion][i]).textContent;
            arr.push(marca);
        }
        if (Win(arr, combinaciones[combinacion])) {
            wind = true;
            let messa = Only ? arr[0] == "X" ? "Felicidades haz Ganado" : "Lamentablemente perdiste pero puedes volver a intentarlo" : "Este duelo sacó chispas";
            document.getElementById("ganadorMessage").textContent = messa;

            document.getElementById("ganadorMessage").style.display = "flex";
            return false;
        }
    }
    empate()
}
function Win(arr, combinación) {
    let figura = ""
    for (let i = 0; i < arr.length; i++) {
        figura += arr[i];
    }
    if (figura === "XXX" || figura === "OOO") {
        document.getElementById(combinación[0].toUpperCase()).style.backgroundColor = "green";
        document.getElementById(combinación[1].toUpperCase()).style.backgroundColor = "green";
        document.getElementById(combinación[2].toUpperCase()).style.backgroundColor = "green";
        return true;
    } else return false;
}
function stateOfBoard() {
    for (let i = 0; i < 3; i++) {
        let cordenada = ""
        switch (i) {
            case 0:
                cordenada = "a";
                break;
            case 1:
                cordenada = "b";
                break;
            case 2:
                cordenada = "c";
                break;
        }
        for (let j = 1; j < 4; j++) {
            let cordenadaCon = `${cordenada}${j}`
            if (document.getElementById(cordenadaCon).textContent === "") return true;
        }
    }
    return false;
}
function empate() {
    if (!stateOfBoard() && !wind) {
        document.getElementById("ganadorMessage").textContent = "Hubo un empate en el juego";
        document.getElementById("ganadorMessage").style.display = "flex";
    }
}
function superMachinTurn() {
    let combinaciones = {
        uno: ["a1", "a2", "a3"],
        dos: ["b1", "b2", "b3"],
        tres: ["c1", "c2", "c3"],
        cuatro: ["a1", "b1", "c1"],
        cinco: ["a2", "b2", "c2"],
        seis: ["a3", "b3", "c3"],
        siete: ["a1", "b2", "c3"],
        ocho: ["c1", "b2", "a3"],
    }
    for (combinacion in combinaciones) {
        let arr = [];

        for (let i = 0; i < combinaciones[combinacion].length; i++) {
            let marca = document.getElementById(combinaciones[combinacion][i]).textContent;
            arr.push(marca);
        }
        if (arr[0] == "X" && arr[1] == "X") {
            if (document.getElementById(combinaciones[combinacion][2]).textContent == "") {
                document.getElementById(combinaciones[combinacion][2]).textContent = "O";
                return true;
            }
        } else if (arr[0] == "X" && arr[2] == "X") {
            if (document.getElementById(combinaciones[combinacion][1]).textContent == "") {
                document.getElementById(combinaciones[combinacion][1]).textContent = "O";
                return true;
            }
        } else if (arr[1] == "X" && arr[2] == "X") {
            if (document.getElementById(combinaciones[combinacion][0]).textContent == "") {
                document.getElementById(combinaciones[combinacion][0]).textContent = "O";
                return true;
            }
        }
    }
    return false;
}
function invincibleMachin() {
    if (firstMove) {
        firstMove = false;
        if (evalPositionInicial()) return true;
    }
    if (firstboxCorn && !firstMove) {
        if (evalMoveSecondCorn()) return true;
    }
    if (firstBoxCentral && !firstMove) {
        if (evalMoveSecondCentral()) return true;
    }
    if (firstBoxCentralTercer && !firstMove) {
        if (evalMoveTercerCentral()) return true;
    }
    if (firstMoveSperCentro && !firstMove) {
        if (evalMovetSuperCentro()) return true
    }
    let combinaciones = {
        uno: ["a1", "a2", "a3"],
        dos: ["b1", "b2", "b3"],
        tres: ["c1", "c2", "c3"],
        cuatro: ["a1", "b1", "c1"],
        cinco: ["a2", "b2", "c2"],
        seis: ["a3", "b3", "c3"],
        siete: ["a1", "b2", "c3"],
        ocho: ["c1", "b2", "a3"],
    }

    for (combinacion in combinaciones) {
        let arr = [];
        for (var i = 0; i < combinaciones[combinacion].length; i++) {
            let marca = document.getElementById(combinaciones[combinacion][i]).textContent;
            arr.push(marca);
        }
        if (arr[0] == "O" && arr[1] == "O") {
            if (document.getElementById(combinaciones[combinacion][2]).textContent == "") {
                document.getElementById(combinaciones[combinacion][2]).textContent = "O";
                return true;
            }
        } else if (arr[0] == "O" && arr[2] == "O") {
            if (document.getElementById(combinaciones[combinacion][1]).textContent == "") {
                document.getElementById(combinaciones[combinacion][1]).textContent = "O";
                return true;
            }
        } else if (arr[1] == "O" && arr[2] == "O") {
            if (document.getElementById(combinaciones[combinacion][0]).textContent == "") {
                document.getElementById(combinaciones[combinacion][0]).textContent = "O";
                return true;
            }
        }
    }
    for (combinacion in combinaciones) {
        let arr = [];
        for (var i = 0; i < combinaciones[combinacion].length; i++) {
            let marca = document.getElementById(combinaciones[combinacion][i]).textContent;
            arr.push(marca);
        }
        if (arr[0] == "X" && arr[1] == "X") {
            if (document.getElementById(combinaciones[combinacion][2]).textContent == "") {
                document.getElementById(combinaciones[combinacion][2]).textContent = "O";
                return true;
            }
        } else if (arr[0] == "X" && arr[2] == "X") {
            if (document.getElementById(combinaciones[combinacion][1]).textContent == "") {
                document.getElementById(combinaciones[combinacion][1]).textContent = "O";
                return true;
            }
        } else if (arr[1] == "X" && arr[2] == "X") {
            if (document.getElementById(combinaciones[combinacion][0]).textContent == "") {
                document.getElementById(combinaciones[combinacion][0]).textContent = "O";
                return true;
            }
        }
    }
    return false;
}

function evalPositionInicial() {
    let strategicPosition = {
        positionUno: ["a1", "a3", "c1", "c3"],
        positionDos: ["b2"],
        positionTres: ["b1", "a2", "b3", "c2"]
    }
    for (position in strategicPosition) {
        for (let i = 0; i < strategicPosition[position].length; i++) {
            if (position == "positionUno") {
                if (document.getElementById(strategicPosition[position][i]).textContent === "X") {
                    firstboxCorn = strategicPosition[position][i];
                    document.getElementById("b2").textContent = "O";
                    return true;
                }
            } else if (position == "positionDos") {
                if (document.getElementById("b2").textContent === "X") {
                    firstBoxCentral = true;
                    document.getElementById("a1").textContent = "O";
                    return true;
                }
            } else if (position === "positionTres") {
                if (document.getElementById(strategicPosition[position][i]).textContent === "X") {
                    document.getElementById("b2").textContent = "O";
                    firstMoveSperCentro = strategicPosition[position][i];
                    return true;
                }
            }
        }
    }
    return false;
}

function evalMoveSecondCorn() {
    if (firstboxCorn) {
        switch (firstboxCorn) {
            case "a1":
                if (document.getElementById("c3").textContent === "X") {                    
                    document.getElementById("b3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("b3").textContent === "X") {                    
                    document.getElementById("a3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("c2").textContent === "X") {                    
                    document.getElementById("c1").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                break;
            case "a3":
                if (document.getElementById("c1").textContent === "X") {
                    document.getElementById("b3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("b1").textContent === "X") {                    
                    document.getElementById("a1").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("c2").textContent === "X") {                    
                    document.getElementById("c3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                break;
            case "c1":
                if (document.getElementById("a3").textContent === "X") {
                    document.getElementById("b3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("a2").textContent === "X") {                    
                    document.getElementById("a1").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("b3").textContent === "X") {                    
                    document.getElementById("c3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                break;
            case "c3":
                if (document.getElementById("a1").textContent === "X") {
                    document.getElementById("b3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("a2").textContent === "X") {                    
                    document.getElementById("a3").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                if (document.getElementById("b1").textContent === "X") {                    
                    document.getElementById("a1").textContent = "O";
                    firstboxCorn = null;
                    return true;
                }
                break;
        }
        firstboxCorn = null;
        return false;
    }
    firstboxCorn = null;
    return false;
}

function evalMoveSecondCentral() {
    if (firstBoxCentral) {
        if (document.getElementById("b3").textContent === "X") {
            firstBoxCentral = null;
            firstBoxCentralTercer = true;
            document.getElementById("b1").textContent = "O";
            return true;
        } else if (document.getElementById("c3").textContent === "X") {
            firstBoxCentral = null;
            document.getElementById("c1").textContent = "O";
            return true;
        }
        firstBoxCentral = null;
        return false;
    }
    return false;
}
function evalMoveTercerCentral() {
    if (firstBoxCentralTercer) {
        firstBoxCentralTercer = null;
        if (document.getElementById("a3").textContent === "X") {
            document.getElementById("c1").textContent = "O";
            return true;
        }
    }
    firstBoxCentralTercer = null;
    return false;
}
function evalMovetSuperCentro() {
    switch (firstMoveSperCentro) {
        case "a2":
            if (document.getElementById("b3").textContent === "X") {
                if (document.getElementById("c3").textContent === "") {
                    document.getElementById("c3").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("b1").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("c1").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }

            }
            if (document.getElementById("c3").textContent === "X") {
                if (document.getElementById("a3").textContent === "") {
                    document.getElementById("a3").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            if (document.getElementById("c2").textContent === "X") {
                if (document.getElementById("a3").textContent === "") {
                    document.getElementById("a3").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            break;
        case "b1":
            if (document.getElementById("a2").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("a3").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("c2").textContent === "X") {
                if (document.getElementById("c1").textContent === "") {
                    document.getElementById("c1").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("c3").textContent === "X") {
                if (document.getElementById("c1").textContent === "") {
                    document.getElementById("c1").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            if (document.getElementById("b3").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            break;
            break;
        case "b3":
            if (document.getElementById("a1").textContent === "X") {
                if (document.getElementById("a3").textContent === "") {
                    document.getElementById("a3").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("a2").textContent === "X") {
                if (document.getElementById("a3").textContent === "") {
                    document.getElementById("a3").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("c1").textContent === "X") {
                if (document.getElementById("c3").textContent === "") {
                    document.getElementById("c3").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            if (document.getElementById("c2").textContent === "X") {
                if (document.getElementById("c3").textContent === "") {
                    document.getElementById("c3").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }       
            if (document.getElementById("b1").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            break;
        case "c2":
            if (document.getElementById("a1").textContent === "X") {
                if (document.getElementById("c1").textContent === "") {
                    document.getElementById("c1").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("a3").textContent === "X") {
                if (document.getElementById("c3").textContent === "") {
                    document.getElementById("c3").textContent = "O";
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                }
            }
            if (document.getElementById("b1").textContent === "X") {
                if (document.getElementById("c1").textContent === "") {
                    document.getElementById("c1").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            if (document.getElementById("b3").textContent === "X") {
                if (document.getElementById("c3").textContent === "") {
                    document.getElementById("c3").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            if (document.getElementById("a2").textContent === "X") {
                if (document.getElementById("a1").textContent === "") {
                    document.getElementById("a1").textContent = "O"
                    firstMoveSperCentro = null;
                    return true;
                } else {
                    firstMoveSperCentro = null;
                    return false;
                };
            }
            break;
    }
    return false;
}

function showMenu(rest){
    var menu = document.getElementById("windows-btn");
    if(rest){
        menuActiv = false;
        menu.style.display = "none";
        return false;
    }
    menuActiv ? menuActiv = false : menuActiv = true;
    menuActiv ? menu.style.display = "grid" : menu.style.display = "none";
    return false;
}
