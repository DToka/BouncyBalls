import Ball from "./ball.js";

export default class Controller{
  constructor(mainBall){
    this.controlled=mainBall;
    this.direction = {x:0,y:0};
    this.scaleFactor=5;

  }

  move(directionCall){
    this.direction=directionCall;
    this.controlled.speed.x+=this.direction.x*this.scaleFactor;
    this.controlled.speed.y+=this.direction.y*this.scaleFactor;
  }



}
