import Game from "./game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 1700;
const GAME_HEIGHT = 700;

ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime=0;

game.start(1);
function gameLoop(timestamp){
  let deltaTime=timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);

}

window.requestAnimationFrame(gameLoop);
