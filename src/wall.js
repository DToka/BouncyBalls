//
import { detectCollision } from './collisionDetection.js';
export default class Wall{

  constructor(game,x1,y1,x2,y2){
    this.position={
      x:x1,
      y:y1
    };


    //square points
    this.points = [{
      x:x2,
      y:y2
    }
    ];
  }

  update(deltaTime){

  }

  draw(ctx){
    //draw
    //connect each point
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.position.x,this.position.y);
    ctx.lineTo(this.position.x+this.points[0].x,this.position.y+this.points[0].y);
    ctx.stroke();

  }




}
