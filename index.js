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
    document.getElementById("ganadorMessage").textContent = "Felicidades ganaste jugador";
    document.getElementById("ganadorMessage").style.display = "none";

    return false;
}
function deleteJugada() {
    if (!wind) {
        if (tiros.player1.length || tiros.player2.length) {
            if (!Only) {
                if (!J1) {
                    let casillaDelete = tiros.player1.pop();
                    document.getElementById(casillaDelete.casilla).textContent = "";
                    J1 = true;
                    J2 = false;
                    return false;
                } else {
                    let casillaDelete = tiros.player2.pop();
                    document.getElementById(casillaDelete.casilla).textContent = "";
                    J2 = true;
                    J1 = false;
                    return false;
                }
            } else {
                alert("No se puede desaser la jugada si estas jugando contra la máquina")
            }
        } else {
            return false;
        }
    }
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
            let messa = document.getElementById("ganadorMessage").textContent;
            document.getElementById("ganadorMessage").textContent = `${messa} "${arr[0]}"`;

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
                break;
            case "a3":
                if (document.getElementById("c1").textContent === "X") {
                    document.getElementById("b3").textContent = "O";
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
                break;
            case "c3":
                if (document.getElementById("a1").textContent === "X") {
                    document.getElementById("b3").textContent = "O";
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
