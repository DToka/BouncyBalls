import { detectCollision } from './collisionDetection.js';
import vectorMath from "./vectorMath.js";
export default class Ball{

  constructor(game, startX, startY, mass, velX,velY,rad,friction){
    this.speed = {x: velX, y: velY};
    this.position = {x:startX, y:startY};
    this.red = 0;
    this.color="rgb("+this.red+",0,0)";
    this.radius=rad;
    this.gameWidth=game.gameWidth;
    this.gameHeight=game.gameHeight;
    this.game = game;

    //physics
    this.totalE=0;
    this.kineticE=0;
    this.heatE=0;
    this.mass=mass;
    this.muFriction=5;
    this.kConst=0.00005;
    this.thickness=5;
    this.friction=friction;
  }

  draw(ctx){
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x,this.position.y,this.radius,0,2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }

  update(deltaTime){
    var reflectV={
      x:0,
      y:0
    };

    let xMDiff=this.position.x-this.radius;
    let xPDiff=this.position.x+this.radius-this.gameWidth;
    let yMDiff=this.position.y-this.radius;
    let yPDiff=this.position.y+this.radius-this.gameHeight;
    if(xMDiff<0){
      this.position.x+=Math.abs(xMDiff);
      reflectV={
        x:1,
        y:0
      };
      this.speed=vectorMath.reflect(this.speed,reflectV);
    }else if(yMDiff<0){
      this.position.y+=Math.abs(yMDiff);
      reflectV={
        x:0,
        y:1
      };
      this.speed=vectorMath.reflect(this.speed,reflectV);
    }else if(xPDiff>0){
      this.position.x-=xPDiff;
      reflectV={
        x:-1,
        y:0
      };
      this.speed=vectorMath.reflect(this.speed,reflectV);
    }else if(yPDiff>0){
      this.position.y-=yPDiff;
      reflectV={
        x:0,
        y:-1
      };
      this.speed=vectorMath.reflect(this.speed,reflectV);
    }


    this.calcEnergy();
    this.move();
    if(this.friction){
      if(this.kineticE > 0){
        this.frictionSlow(deltaTime);
      }else{
        this.kineticE=0;
      }
    }
    this.calcSpeed();
    this.heatLoss();
    this.red=this.heatE;
    this.color="rgb("+this.red+",0,0)";

  }

  reset(){
    this.position={x:400,y:300};
    this.speed={x:0,y:0};

  }

  move(){
    this.position.x+=this.speed.x;
    this.position.y+=this.speed.y;
  }

  forceApplied(directionForce){
    this.speed.x=directionForce.x;
    this.speed.y=directionForce.y;
  }


  //from energy set speed
  calcSpeed(){
    let scalarV = Math.sqrt(this.kineticE/this.mass);
    let speedMagnitude=Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2));
    if(speedMagnitude>0){
      let unitVector = {
        x: this.speed.x/speedMagnitude,
        y: this.speed.y/speedMagnitude
      };
      this.speed.x=unitVector.x*scalarV;
      this.speed.y=unitVector.y*scalarV;
    }
  }

  //from speed set kinetic energy
  calcEnergy(){
    this.kineticE=this.mass*(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2));
    this.totalE=this.kineticE+this.heatE;
  }

  heatLoss(){
    if(this.heatE>0.0001){
      let energyLoss=this.kConst*Math.PI*Math.pow(this.radius,2)*this.heatE/this.thickness;
      this.heatE-=energyLoss;
    }else{
      this.heatE=0;
    }
  }


  frictionSlow(deltaTime){
    let speedMagnitude=Math.sqrt(Math.pow(this.speed.x,2)+Math.pow(this.speed.y,2));
    let energyLoss = this.mass*this.muFriction*this.game.gravity*speedMagnitude/deltaTime;
    if(this.heatE < 300){
      this.kineticE-=energyLoss;
      if(this.kineticE<0){
        this.kineticE=0;
      }
      this.heatE+=energyLoss;
    }
  }
  
}
