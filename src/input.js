import Controller from "./control.js";
export default class InputHandler{
  constructor(controller, game){
    this.direction={x:0,y:0};

    document.addEventListener('keydown', (event) =>{
      this.direction={x:0,y:0};
      //console.log(event.keyCode);
      switch(event.keyCode){
        case 37:
          //leftarrow
          this.direction.x-=1;

          controller.move(this.direction);
          break;
        case 39:
          //rightarrow
          this.direction.x+=1;
          controller.move(this.direction);
          break;
        case 40:
              //up arrow
            this.direction.y+=1;
            controller.move(this.direction);
            break;
        case 38:
              //down arrow
            this.direction.y-=1;
            controller.move(this.direction);
            break;

        case 27:
          //escape

        break;

        case 32:
          //space

        break;
        //level 1
        case 49:
          game.start(1);
        break;
        //level 2
        case 50:
          game.start(2);
        break;
        //level 3
        case 51:
          game.start(3);
        break;
        //level 4
        case 52:
          
        break;

      }

    });


  }


}
