import InputHandler from "./input.js";
import Controller from "./control.js";
import Ball from "./ball.js";
import Polygon from "./polygon.js";
import Wall from "./wall.js";
import { detectCollision } from "./collisionDetection.js";
import { buildLevel } from "./levels.js";

export default class Game{
  constructor(gameWidth,gameHeight){
    this.gameWidth=gameWidth;
    this.gameHeight=gameHeight;
    this.gameObjects = [];
    this.gravity=1;


  }

  start(level){
    this.gameObjects = [];
    this.gameObjects=buildLevel(this,level);

  }

  update(deltaTime){
    var countCollision=0;
    for(countCollision=0;countCollision<this.gameObjects.length;countCollision++){
      var secondCount=countCollision;
      for(;secondCount<=this.gameObjects.length;secondCount++){
        detectCollision(this.gameObjects[countCollision],this.gameObjects[secondCount]);
      }
    }

    [...this.gameObjects].forEach(object => object.update(deltaTime));

  }

  draw(ctx){
    [...this.gameObjects].forEach(object => object.draw(ctx));

  }

}
