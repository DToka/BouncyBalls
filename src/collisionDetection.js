//collision detectiong between 1 or more circles
import vectorMath from "./vectorMath.js";
import Ball from "./ball.js";
import Wall from "./wall.js";
import Polygon from "./polygon.js";
export function detectCollision(gameObject1, gameObject2){
  //ball-ball collision
  if(gameObject1 instanceof Ball && gameObject2 instanceof Ball){
    if(vectorMath.magnitude(vectorMath.getVecFromLine(gameObject1.position,gameObject2.position))<=gameObject1.radius+gameObject2.radius){
      //get ball 1 positon and ball2 position from position collid function
      //set positions to balls
      let ballPositions=vectorMath.positionChangeCollid(gameObject1, gameObject2);
      gameObject1.position=ballPositions[0];
      gameObject2.position=ballPositions[1];
      //get ball vectors from elastic collide function and set to ball vectors
      let objectVelocities=vectorMath.elasticBallCollide(gameObject1, gameObject2);
      gameObject1.speed=objectVelocities[0];
      gameObject2.speed=objectVelocities[1];
    }
  }

  //ball to wall collision
  if(gameObject1 instanceof Ball && gameObject2 instanceof Wall){

    let closePoint=vectorMath.getClosestPosition(gameObject1.position,gameObject2.position,vectorMath.add(gameObject2.position,gameObject2.points[0]));
    let distanceToLine=vectorMath.magnitude(vectorMath.sub(closePoint,gameObject1.position));
    //console.log(closePoint.x+" "+closePoint.y);
    if(distanceToLine<gameObject1.radius){
      let movedPosition=vectorMath.add(closePoint,vectorMath.multiply(gameObject1.radius,vectorMath.sub(gameObject1.position,closePoint)));
      let wallNormal=vectorMath.unitVector(vectorMath.getVecFromLine(closePoint,gameObject1.position));
      gameObject1.speed = vectorMath.reflect(gameObject1.speed,wallNormal);
    }
  }


  //assumption polygon is unmoving
  if(gameObject1 instanceof Ball && gameObject2 instanceof Polygon){
    var checkPoint={
      x:0,
      y:0
    };
    var distanceToLine;
    var closePoint={
      x:0,
      y:0
    };
    var minDistance=99999999;
    var lineNum=0;
    for(var i=0;i<gameObject2.points.length;i++){
        //console.log(gameObject2.points[(i+1)%gameObject2.points.length]);
        checkPoint=vectorMath.getClosestPosition(gameObject1.position,vectorMath.add(gameObject2.position,gameObject2.points[i]),vectorMath.add(gameObject2.position,gameObject2.points[(i+1)%gameObject2.points.length]));
        distanceToLine=vectorMath.magnitude(vectorMath.sub(checkPoint,gameObject1.position));
        if(distanceToLine<minDistance){
          closePoint=checkPoint;
          minDistance=distanceToLine;
        }
    }
    if(minDistance<=gameObject1.radius){
      let reflectVector=vectorMath.unitVector(vectorMath.getVecFromLine(closePoint,gameObject1.position));
      let normalCheck=vectorMath.dotProduct(vectorMath.getVecFromLine(gameObject2.position,closePoint),reflectVector);
      if(normalCheck<0){
        reflectVector=vectorMath.inverseVec(reflectVector);
      }else if(normalCheck==0){
        reflectVector=vectorMath.unitVector(vectorMath.getVecFromLine(gameObject2.position,closePoint));
        vectorMath.ballWallMove(gameObject1,closePoint,reflectVector);
        reflectVector=vectorMath.unitVector(vectorMath.getVecFromLine(closePoint,gameObject1.position));
      }
      vectorMath.ballWallMove(gameObject1,closePoint,reflectVector);

      let out=vectorMath.reflect(gameObject1.speed,reflectVector);
      gameObject1.speed=out;
    }


  }

/* POLYGON TO POLYGON COLLISION INCOMPLETE
  if(gameObject1 instanceof Polygon && gameObject2 instanceof Polygon){
    var poly1Walls=[];
    var poly2Walls=[];
    var intersectionPoints=[];
    var intersecting=false;


    var poly1PointC=gameObject1.points.length;
    var poly2PointC=gameObject2.points.length;
    for(var x=0;x<poly1PointC;x++){

      var wall1={
        wallStart:gameObject1.points[x],
        wallEnd:gameObject1.points[(x+1)%poly1PointC]
      };
      for(var y=0;y<poly2PointC;y++){
        var wall2={
          wallStart:gameObject2.points[y],
          wallEnd:gameObject2.points[((y+1)%poly2PointC)]
        };
        //check wall intersections
        let closestPoints=vectorMath.lineClosestPoint(wall1.wallStart,wall1.wallEnd,wall2.wallStart,wall2.wallEnd);
        //point on Wall1 closest to wall2
        let point1=closestPoints.point1;
        //point on Wall2 closest to wall1
        let point2=closestPoints.point2;


        if(vectorMath.lineIntersection(wall1.wallStart,wall1.wallEnd,point1,wall2.wallStart,wall2.wallEnd,point2)){
          intersecting=true;
          //intersection is true
          //poly1Walls.indexOf(wall1) === -1 ? poly1Walls.push(wall1) : console.log("This item already exists");
          //poly2Walls.indexOf(wall2) === -1 ? poly2Walls.push(wall2) : console.log("This item already exists");
          //intersectionPoints.indexOf(wall2) === -1 ? poly2Walls.push(wall2) : console.log("This item already exists");

        }
        //else no intersection, ignore
      }
    }
    if(intersecting){
      //POC = average of Points of intersectionPoints
      //poly1normal = sum of normals for walls1
      //poly2normal = sum of normals for walls2
      //if normal=0, normal=inverse of other normal
      //move polygons away from each other to prevent overlap
      //using walls, normals, POC calculate physics
    }
  }
  */
}
