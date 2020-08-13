const width = 3;
const height = 3;
const space = 110;
const widthOfPoint = 100; //point # player
const blockers = [{ x: 2, y: 2 },{x:1,y:1}];
var coordinate = [];
var playerPos = { x: 2, y: 1 };
var targetPos = { x: 0, y: 0 };
//create map
const map = document.getElementById("map");
map.style.width = (width - 1) * space + widthOfPoint - widthOfPoint / 2 + "px";
map.style.height = (height - 1) * space + "px";

//create point
for (var i = 0; i < height; i++) {
    let storeLocation = [];
    for (var j = 0; j < width; j++) storeLocation.push({ x: j * space, y: i * space });
    coordinate.push(storeLocation);
}

const player = document.querySelector("#player");

for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
        let point = document.createElement("span"); point.className = "point";
        point.value = i + '-' + j;
        point.style.top = coordinate[i][j].y + "px";
        point.style.left = coordinate[i][j].x + "px";
        map.appendChild(point);
        //create blockers
        blockers.forEach( (value) => {
            if (value.x == j && value.y == i) point.classList.add("block");
        })
        //create player
        if (j == playerPos.x && i == playerPos.y) {
            player.style.left = coordinate[i][j].x + "px";
            player.style.top = coordinate[i][j].y + "px";
        }
    }
}
const point = document.querySelectorAll(".point");

//check blockers
checkBlockerRight = (x, y, check) => {
    if (x + 1 == width) return false;
    else {
        blockers.forEach((value) => {
            if (x + 1 == value.x && y == value.y) check = false;
        })
    }
    return check;
}
checkBlockerLeft = (x, y, check) => {
    if (x == 0) return false;
    else {
        blockers.forEach((value) => {
            if (x - 1 == value.x && y == value.y) check = false;
        })
    }
    return check;
}
checkBlockerTop = (x, y, check) => {
    if (y == 0) return false;
    else {
        blockers.forEach((value) => {
            if (x == value.x && y - 1 == value.y) check = false;
        })
    }
    return check;
}
checkBlockerBottom = (x, y, check) => {
    if (y + 1 == height) return false;
    else {
        blockers.forEach((value) => {
            if (x == value.x && y + 1 == value.y) check = false;
        })
    }
    return check;
}

changePlayerPos = (x, y, timer) => {
    setTimeout(() => {
        player.style.top = coordinate[y][x].y + "px";
        player.style.left = coordinate[y][x].x + "px";
    }, timer)
}

var directPosible = [];
var timer = -500;
checkForMove = (playerX, playerY) => {
    directPosible = [];
    var index = 0;
    if (checkBlockerRight(playerX, playerY, true)) directPosible.push("right");
    if (checkBlockerLeft(playerX, playerY, true)) directPosible.push("left");
    if (checkBlockerTop(playerX, playerY, true)) directPosible.push("top");
    if (checkBlockerBottom(playerX, playerY, true)) directPosible.push("bottom");
    index = Math.floor(Math.random() * directPosible.length);
    let presentMove = directPosible[index];
    if ( presentMove == "right" ) playerPos.x++;
    else if ( presentMove == "left") playerPos.x--;
    else if ( presentMove == "top") playerPos.y--;
    else playerPos.y++;
    timer += 500; 
    changePlayerPos(playerPos.x, playerPos.y, timer);
}

changePlayerCoor = () => {
    while (playerPos.x != targetPos.x || playerPos.y != targetPos.y) {
        checkForMove(playerPos.x, playerPos.y, targetPos.x, targetPos.y);
    }
    timer = -500;
}

getTargetPos = (event) => {
    var string = event.target.value;
    let slength = string.length;
    var x = "", y = "";
    for (var i = 0; i < slength; i++) {
        if (string[i] != '-') y += string[i];
        else {
            for (var j = i + 1; j < slength; j++) x += string[j];
            break;
        }
    }
    targetPos.x = x; targetPos.y = y;
    changePlayerCoor();
}

point.forEach((value) => {
    value.addEventListener("click", getTargetPos)
})