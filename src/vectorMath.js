export default class vectorMath {


    //multiple Vec by rotation Matrix
    //Rotation Matrix
    //cos(theta) -sin(theta)
    //sin(theta) cos(theta)
    static rotateVec(vec, theta){
      var rotatedVec={
        x: Math.cos(theta)*vec.x-Math.sin(theta)*vec.y,
        y: Math.sin(theta)*vec.x+Math.cos(theta)*vec.y
      };
      //console.log(theta);
      return rotatedVec;
    }

    //calculate dotProduct;
    static dotProduct(vec1, vec2){
      return vec1.x*vec2.x+vec1.y*vec2.y;
    }

    //vector addition
    static add(vec1, vec2){
      let returnVector = {
        x:vec1.x+vec2.x,
        y:vec1.y+vec2.y
      };
      return returnVector;
    }

    //vector substraction
    static sub(vec1,vec2){
      let returnVector = {
        x:vec1.x-vec2.x,
        y:vec1.y-vec2.y
      };
      return returnVector;
    }

    static multiply(scalar, vec){
      let returnVector = {
        x: vec.x*scalar,
        y: vec.y*scalar
      };
      return returnVector;
    }


    //normalize
    //return unit vector of vec
    static unitVector(vec){
      let returnVector = {
        x: 0,
        y: 0
      };
      let vecMag=vectorMath.magnitude(vec);
      if(vecMag>0){
        returnVector = {
          x: vec.x/vecMag,
          y: vec.y/vecMag
        };
      }
      return returnVector;
    }

    //return magnitude of vec;
    static magnitude(vec){
      return Math.sqrt(Math.pow(vec.x,2)+Math.pow(vec.y,2));
    }

    //return normal ccw
    static normalVecCCW(vec){
      let returnVector = {
        x: -vec.y,
        y: vec.x
      };
      return returnVector;
    }

    //return normal cw
    static normalVecCW(vec){
      let returnVector = {
        x: vec.y,
        y: -vec.x
      };
      return returnVector;
    }

    static inverseVec(vec){
      let returnVector = {
        x:-vec.x,
        y:-vec.y
      };
      return returnVector;
    }

    static getVecFromLine(point1,point2){
      let vec1=vectorMath.inverseVec(point1);
      let vec2=point2;
      return vectorMath.add(vec1,vec2);
    }

    static reflect(vecIn, normalVec){
      return vectorMath.sub(vecIn,vectorMath.multiply(2*vectorMath.dotProduct(vecIn,normalVec),normalVec));
    }

    //get vector relative to ball 1 of the collision point on the ball
    static ballCollisionVec(ball1, ball2){
      let vecCollid=vectorMath.getVecFromLine(ball1.position,ball2.position);
      let returnPoint={
        x:ball1.radius*vecCollid.x,
        y:ball1.radius*vecCollid.y
      };
      return vectorMath.unitVector(returnPoint);
    }


    //get speed applied to the other ball on the normal vector
    static getSpeedCollid(ball1,ball2){
      let collidVec=vectorMath.ballCollisionVec(ball1,ball2);
      collidVec=vectorMath.unitVector(collidVec);
      let returnVector=vectorMath.multiply(vectorMath.dotProduct(ball1.speed,collidVec),collidVec);
      return returnVector;
    }

    //return 2 positions of the 2 balls
    static positionChangeCollid(ball1, ball2){
      let normal1 = vectorMath.unitVector(vectorMath.getVecFromLine(ball1.position,ball2.position));
      let normal2 = vectorMath.unitVector(vectorMath.getVecFromLine(ball2.position,ball1.position));
      let distance = vectorMath.magnitude(vectorMath.getVecFromLine(ball1.position,ball2.position));
      let correctSeperation = ball1.radius + ball2.radius;
      let overlap = Math.abs(distance-correctSeperation);
      let distanceToMove = overlap / 2;
      let outPosition1=vectorMath.add(ball1.position,vectorMath.multiply(distanceToMove,normal2))
      let outPosition2=vectorMath.add(ball2.position,vectorMath.multiply(distanceToMove,normal1));
      let outPositions=[
        outPosition1,
        outPosition2
      ];
      return outPositions;
    }

    //get velocity of ball1 tangent to the normal of force
    static tangentVel(ball1,ball2){
      let collidVec=vectorMath.getSpeedCollid(ball1,ball2);
      let tangentVec = vectorMath.sub(ball1.speed,collidVec);
      return tangentVec;
    }





    //needs object1 mass, velocity, normal vector, rotation, moment of inertia
    //solve conservation of momentum and kinetic energy

    static elasticBallCollide(ball1, ball2){
      let b1tb2vec=vectorMath.getSpeedCollid(ball1,ball2);
      let b2tb1vec=vectorMath.getSpeedCollid(ball2,ball1);

      let ball1Tangent = vectorMath.tangentVel(ball1,ball2);
      let ball2Tangent = vectorMath.tangentVel(ball2,ball1);

      let outBall1 = {
        x:(((ball1.mass-ball2.mass)*b1tb2vec.x)+(2*ball2.mass*b2tb1vec.x)) /(ball1.mass+ball2.mass),
        y:(((ball1.mass-ball2.mass)*b1tb2vec.y)+(2*ball2.mass*b2tb1vec.y)) /(ball1.mass+ball2.mass)
      };

      let outBall2 ={
        x:((2*ball1.mass*b1tb2vec.x)+(b2tb1vec.x*(ball2.mass-ball1.mass)))/(ball1.mass+ball2.mass),
        y:((2*ball1.mass*b1tb2vec.y)+(b2tb1vec.y*(ball2.mass-ball1.mass)))/(ball1.mass+ball2.mass)
      };

      let outVel1={
        x:ball1Tangent.x+outBall1.x,
        y:ball1Tangent.y+outBall1.y
      };
      let outVel2={
        x:ball2Tangent.x+outBall2.x,
        y:ball2Tangent.y+outBall2.y
      };
      let outVelocities=[
        outVel1,
        outVel2
      ];

      return outVelocities;
    }

    static getClosestPosition(point1, lineStart, lineEnd){
      let origin={
        x:0,
        y:0
      };
      let lineVec=vectorMath.unitVector(vectorMath.sub(lineEnd,lineStart));
      let pointVec=vectorMath.getVecFromLine(origin,vectorMath.sub(point1,lineStart));
      let perpendicularPoint=vectorMath.add(lineStart,(vectorMath.multiply(vectorMath.dotProduct(pointVec,lineVec),lineVec)));
      let startLine=vectorMath.getVecFromLine(lineStart,lineEnd);
      let endLine=vectorMath.getVecFromLine(lineEnd,lineStart);
      let pointStart=vectorMath.getVecFromLine(lineStart,perpendicularPoint);
      let pointEnd=vectorMath.getVecFromLine(lineEnd,perpendicularPoint);
      if(vectorMath.dotProduct(pointStart,startLine)<0){
        return lineStart;
      }else if(vectorMath.dotProduct(pointEnd,endLine)<0){
        return lineEnd;
      }else{
        return perpendicularPoint;
      }
    }

    static ballWallMove(ball,contactPoint,wallNormal){

      let outsidePosition=vectorMath.add(contactPoint,vectorMath.multiply(ball.radius,wallNormal));
      ball.position=outsidePosition;

    }


/* Polygon to Polygon Collision incomplete code

    //object1, 2 must have mass and velocity
    // force1 is force applied to object2 from object1
    static eqLinearToLinear(object1,object2,force1,force2){
      let outObj1 = {
        x:(((object1.mass-object2.mass)*force1.x)+(2*object2.mass*force2.x)) /(object1.mass+object2.mass),
        y:(((object1.mass-object2.mass)*force1.y)+(2*object2.mass*force2.y)) /(object1.mass+object2.mass)
      };

      let outObj2 ={
        x:((2*object1.mass*force1.x)+(force2.x*(object2.mass-object1.mass)))/(object1.mass+object2.mass),
        y:((2*object1.mass*force1.y)+(force2.y*(object2.mass-object1.mass)))/(object1.mass+object2.mass)
      };


      let outVelocities=[
        outObj1,
        outObj2
      ];

      return outVelocities;


    }
    //objects must have mass and velocity
    //object2 must have angular velocity
    static eqLinearToAngular(object1,object2,force1,force2){

    }

    //object1 must have angular velocity
    static eqAngularToLinear(object1,object2,force1,force2){

    }



    //collision resolution with angular velocity for the game object
    static ballPolyCollidResolution(ball,polygon,pointofContact,polygonNormal){

      //get forces applied to other objects through the normal
      //only using speed variables
      let ballForces=vectorMath.polyForcesTaken(pointOfContact,ball,polygon,polygonNormal);
      let polyForces=vectorMath.polyforcesTaken(pointOfContact,polygon,ball,vectorMath.inverseVec(polygonNormal));

      //calculate angular force on ball from polygon
      //calculate torque at point of contact, use as force on ball normal
      let polyTorqueOnBall=vectorMath.torqueAtPoint(pointOfContact,polygon,ball,polygonNormal);

      //linear and angular velocities ball is applying to the polygon
      let ballLinearVelocity=ballForces.linear;
      let ballAngularVelocity=ballForces.angular;

      let polygonLinearVelocity=polyForces.linear;
      //physics equation solve

      //linear to linear ball to poly
      //return new linear velocities
      let ltlVel=vectorMath.eqLinearToLinear(ball,polygon,ballLinearVelocity,polygonLinearVelocity)


      //get tangent linear speeds on ball, polygon and add the outSpeeds from calculations to the total speed

      //set speeds out

    }
    //return angular and linear force applied to polygon through pointOfContact with ball velocity
    //normal = normal of the wall impact has occured
    static polyForcesTaken(pointOfContact,object1,object2,normal){
      var linear={
        x:0,
        y:0
      };
      var angular={
        x:0,
        y:0
      };
      normal=vectorMath.inverseVec(normal);
      firstForce=vectorMath.dotProduct(object1.speed,normal);
      var toOrigin=vectorMath.unitVector(vectorMath.getVecFromLine(pointOfContact,object2.position));
      linear=vectorMath.dotProduct(firstForce,toOrigin);
      angular=vectorMath.sub(linear,firstForce);


      var returnForces={
        linear,
        angular
      };
      return returnForces;
    }
    //using normal of wall at pointofContact
    //calcualate force acting on normal of object2
    //object1 must have angular velocity, object 2 is a ball
    //returns angular velocity
    static torqueAtPoint(pointOfContact,object1,object2,normal){
      let linear={
        x:0,
        y:0
      };
      if(object1.angularVelocity==0){
        return linear;
      }
      //normal=vectorMath.inverseVec(normal);
      //get torque vector, origin to point of contact, CW if W>0, CCW if W<0
      var fromOrigin=vectorMath.getVecFromLine(object1.position,pointOfContact);
      var torqueVec;
      if(object1.angularVelocity>0){
        //clockwise torque
        torqueVec=vectorMath.normalVecCW(fromOrigin);
      }else if(object1.angularVelocity<0){
        //counterclockwise torque
        torqueVec=vectorMath.normalVecCCW(fromOrigin);
      }
      var appliedForce=vectorMath.dotProduct(torqueVec,normal);
      if(appliedForce<=0){
        return linear;
      }else{
        linear=vectorMath.multiply(appliedForce,normal);
      }
      return linear;

    }

*/





    /* METHODS FOR POLYGON POLYGON COLLISION
    static pointOnLine(point,lineStart,lineEnd){
      //returns true is point is on the line

      let origin={
        x:0,
        y:0
      };
      let lineVec=vectorMath.unitVector(vectorMath.sub(lineEnd,lineStart));
      let pointVec=vectorMath.getVecFromLine(origin,vectorMath.sub(point,lineStart));
      let perpendicularPoint=vectorMath.add(lineStart,(vectorMath.multiply(vectorMath.dotProduct(pointVec,lineVec),lineVec)));
      let startLine=vectorMath.getVecFromLine(lineStart,lineEnd);
      let endLine=vectorMath.getVecFromLine(lineEnd,lineStart);
      let pointStart=vectorMath.getVecFromLine(lineStart,perpendicularPoint);
      let pointEnd=vectorMath.getVecFromLine(lineEnd,perpendicularPoint);

      if(vectorMath.dotProduct(pointStart,startLine)<0){
        return false;
      }else if(vectorMath.dotProduct(pointEnd,endLine)<0){
        return false;
      }else{
        return true;
      }



    }

    static lineIntersection(line1Start, line1End,point1, line2Start, line2End, point2){
      //check if point1 in on line2 and point2 on line1
      if(vectorMath.pointOnLine(point1,line2Start,line2End) || vectorMath.pointOnLine(point2,line1Start,line1End)){
        return true;
      }
      return false;
    }
    static lineClosestPoint(line1Start,line1End,line2Start,line2End){
      //returns closest point on line1 to line2
      //  and   closest point on line2 to line1
      var point1;
      var point2;

      point1={
        x:0,
        y:0
      };
      point2={
        x:0,
        y:0
      };

      //logic
      var line1Vec=vectorMath.unitVector(vectorMath.getVecFromLine(line1Start,line1End));
      var line2Vec=vectorMath.unitVector(vectorMath.getVecFromLine(line2Start,line2End));
      var dot=vectorMath.dotProduct(line1Vec,line2Vec);

      //check if parallel
      if(Math.abs(dot)==1){

        //point1start on line2
        let p1s=vectorMath.getClosestPosition(line1Start,line2Start,line2End);
        //get distance p1s to line1Start vectorMath.getVecFromLine(line1Start,p1s);

        //point1End on line2
        let p1e=vectorMath.getClosestPosition(line1End,line2Start,line2End);
        //get distance vectorMath.getVecFromLine(line1End,p1e);

        //point1Start on line1
        let p2s=vectorMath.getClosestPosition(line2Start,line1Start,line1End);
        let p2e=vectorMath.getClosestPosition(line2End,line1Start,line1End);


        //check overlap using P1,P2,P3,P4
        let axisVec=vectorMath.unitVector(vectorMath.getVecFromLine(line1Start,line1End));
        let P1=0;
        let P2=vectorMath.dotProduct(vectorMath.getVecFromLine(line1Start,line1End),axisVec);
        let P3=vectorMath.dotProduct(vectorMath.getVecFromLine(line1Start,line2Start),axisVec);
        let P4=vectorMath.dotProduct(vectorMath.getVecFromLine(line1Start,line2End),axisVec);
        //check if overlap
        if((P1<P3 && P3<P2)){
          //P3 inside wall1
          //find end of intersection
        }else if((P1<P4 && P4<P2)){
          //P4 inside Wall1
          //find start of intersection


        }else if((P3>P1 && P4<P2)){
          //Wall2 inside Wall1

        }else if(P3<P1 && P4>P2){
          //Wall1 inside Wall2

        }else{
          //no overlap, ignore
        }




      }else{
        //must intersect at some point
        //solve line intersection
        var pointIntersection={
        x:
        (((line1Start.x*line1End.y-line1Start.y*line1End.x)*(line2Start.x-line2End.x)
        -
        (line1Start.x-line1End.x)*(line2Start.x*line2End.y-line2Start.y*line2End.x)))
        /
        ((line1Start.x-line1End.x)*(line2Start.y-line2End.y)
        -
        (line1Start.y-line1End.y)*(line2Start.x-line2End.x)),

        y:
        (((line1Start.x*line1End.y-line1Start.y*line1End.x) * (line2Start.y-line2End.y))
        -
        ((line1Start.y-line1End.y)* (line2Start.x*line2End.y-line2Start.y*line2End.x)))
        /
        ((line1Start.x-line1End.x)*(line2Start.y-line2End.y)
        -
        (line1Start.y-line1End.y)*(line2Start.x-line2End.x))
        };




        if(vectorMath.pointOnLine(pointIntersection,line1Start,line1End)){
          point1=pointIntersection;
        }else{
          point1=vectorMath.getClosestPosition(pointIntersection,line1Start,line1End);
        }

        if(vectorMath.pointOnLine(pointIntersection,line2Start,line2End)){
          point2=pointIntersection;
        }else{
          point2=vectorMath.getClosestPosition(pointIntersection,line2Start,line2End);
        }




      }



      var returnPoints={
        point1,
        point2
      };
      return returnPoints;

    }
    */



}
