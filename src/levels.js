import InputHandler from "./input.js";
import Controller from "./control.js";
import Ball from "./ball.js";
import Polygon from "./polygon.js";
import Wall from "./wall.js";

export function buildLevel(game,level){
  let gameObjects= [];

  if(level==1){
    let mainBall = new Ball(game,500,300,1,0,0,20,1);
    let secondBall = new Ball(game,300,300,1,0,0,20,1);
    let thirdBall = new Ball(game,600,300,2,0,0,20,1);


    let object1Pos={
      x:900,
      y:350
    };

    let object1Points = [{
        x:-50,
        y:250
      },{
        x:50,
        y:250
      },{
        x:50,
        y:-250
      },{
        x:-50,
        y:-250
      }
    ];

    let object2Pos={
      x:300,
      y:350
    };
    let object2Points = [{
        x:-50,
        y:250
      },{
        x:50,
        y:250
      },{
        x:50,
        y:-250
      },{
        x:-50,
        y:-250
      }
    ];
    let starPos={
      x:1300,
      y:350
    };
    let starPoints = [
      {
        x:0,
        y:-100
      },{
        x:20,
        y:-50
      },{
        x:70,
        y:-20
      },{
        x:50,
        y:30
      },
      {
        x:80,
        y:60
      },
      {
        x:0,
        y:100
      },
      {
        x:-80,
        y:60
      },
      {
        x:-50,
        y:30
      },{
        x:-70,
        y:-20
      },{
        x:-20,
        y:-50
      }
    ];

    let objectStar = new Polygon(game,starPos,starPoints,10,10,0,-0.5);
    let objectTest = new Polygon(game,object1Pos,object1Points,10,10,0,-0.2);
    let object2 = new Polygon(game,object2Pos, object2Points,10,10,0,0.2);
    let wall = new Wall(game,300,200,500,-100);
    gameObjects = [
      mainBall,
      secondBall,
      thirdBall,
      objectTest,
      object2,
      objectStar,
    ];

    game.controller=new Controller(mainBall);
    new InputHandler(game.controller, game);
  }else if(level==2){
    let friction=0;
    let ball1=new Ball(game,100,300,1,0,0,20,friction);
    let ball3=new Ball(game,200,300,1,0,0,20,friction);
    let ball2=new Ball(game,300,300,1,0,0,20,friction);
    let ball4=new Ball(game,400,300,1,0,0,20,friction);
    let ball5=new Ball(game,500,300,1,0,0,20,friction);
    let ball6=new Ball(game,600,300,1,0,0,20,friction);
    let ball7=new Ball(game,700,300,1,0,0,20,friction);
    let ball8=new Ball(game,800,300,1,0,0,20,friction);
    let ball9=new Ball(game,900,300,1,0,0,20,friction);
    let ball10=new Ball(game,1000,300,1,0,0,20,friction);
    gameObjects = [
      ball1,
      ball2,
      ball3,
      ball4,
      ball5,
      ball6,
      ball7,
      ball8,
      ball9,
      ball10,
    ];
    game.controller=new Controller(ball1);
    new InputHandler(game.controller, game);

  }else if(level==3){
    let friction=1;
    let ball1=new Ball(game,100,300,1,0,0,20,friction);
    let ball3=new Ball(game,200,300,1,0,0,20,friction);
    let ball2=new Ball(game,300,300,1,0,0,20,friction);
    let ball4=new Ball(game,400,300,1,0,0,20,friction);
    let ball5=new Ball(game,500,300,1,0,0,20,friction);
    let ball6=new Ball(game,600,300,1,0,0,20,friction);
    let ball7=new Ball(game,700,300,1,0,0,20,friction);
    let ball8=new Ball(game,800,300,1,0,0,20,friction);
    let ball9=new Ball(game,900,300,1,0,0,20,friction);
    let ball10=new Ball(game,1000,300,1,0,0,20,friction);
    gameObjects = [
      ball1,
      ball2,
      ball3,
      ball4,
      ball5,
      ball6,
      ball7,
      ball8,
      ball9,
      ball10,
    ];
    game.controller=new Controller(ball1);
    new InputHandler(game.controller, game);
  }




    return gameObjects;

}
