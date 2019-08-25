//
import { detectCollision } from './collisionDetection.js';
import vectorMath from "./vectorMath.js";
export default class Polygon{


  //needs rotation value, moment of interia, mass, max distance, rotation velocity
  constructor(game,startPos,pointsPos,mass,MOI,heat,rotation){
    this.position=startPos;
    this.speed={
      x:0,
      y:0
    };
    this.red=heat;

    //square points
    this.points = pointsPos;

  this.mass=10;
  this.MOI=10;
  //w
  this.angularVelocity=rotation;
  this.kineticE=0;
  this.angularE=0;
  this.color="rgb("+this.red+",0,0)";
  this.maxDistance=0;


  }

  update(deltaTime){
    this.position.x+=this.speed.x;
    this.position.y+=this.speed.y;

    //rotate Points around origin
    if(Math.abs(this.angularVelocity)>0){
      for(var counter=0;counter<this.points.length;counter++){
        this.points[counter]=vectorMath.rotateVec(this.points[counter],this.angularVelocity/deltaTime);
      }
    }

  }




  draw(ctx){

    ctx.globalAlpha = 0.5
    ctx.fillStyle = this.color;
    ctx.beginPath();

    for(var element=0;element<this.points.length;element++){
      ctx.lineTo(this.position.x+this.points[element].x,this.position.y+this.points[element].y);
    }

    ctx.stroke();
    ctx.fill();

  }






}
