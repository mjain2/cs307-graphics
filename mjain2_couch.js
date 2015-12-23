
/* A Holiday Scene (3D)
Copyright (C) 2014 by Mollee Jain

This program is free software: you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.  This
program is released under the GNU Public License

Contact me at mjain2@wellesley.edu


Mollee Jain
DATE: 12/19/2014
FILENAME: couch.js
USE: This function creates a couch that is made up of differen box geometries.  The material used throughout the model is a 
Phong material.  Each part of the couch (side, base, back, and cushions) have different parameters of width, height and depth. The couch 
is positioned on the left hand side against the wall.  A clone of this couch object is rotated and positioned in the center of the room
on the z axis (it's back is visible to the viewer when the scene first rendered).

VARIABLES:
roomParams - inherited by the main html page; this gives the dimenions of the bounding box/room area to allow for positioning
couchParams
   - widthBase, heightBase and depthBase - the dimensions for the base of the couch (the bottom part underneath the cusions)
   - widthSide, heightSide, and depthSide - the dimensions for the sides of the couch (there are two of these)
   - widthBack, heightBack, and depthBack - the dimensions for the back of the couch (extends higher behind the base)
   - widthC, heightC, and depthC - the dimensions for the cusions part of the couch (rests right above the base)
*/

//dimensions for different parts of the couch
var couchParams = {
	widthBase: 20,
   heightBase: 15,
   depthBase: 60,
   widthSide: 20,
   heightSide: 20,
   depthSide: 5,
   widthBack: 10,
   heightBack: 35,
   depthBack: 70,
   widthC: 20,
   heightC: 2,
   depthC:60
}

/* createBasicBox(w,h,d,color)
This function creates a basic box object with the given dimensions.  A color argument is also passed in to set the material
color of the box object.  The mesh is returned to allow other functions to set the positioning of the box.  
*/
function createBasicBox(w,h,d,color) {
   var geom = new THREE.BoxGeometry(w,h,d);
   var mat = new THREE.MeshPhongMaterial({color:color,ambient:color});
   var mesh = new THREE.Mesh(geom,mat);
   return mesh;
}

/* createParts
This function creates all the different parts of the couch and adds them to a couch 3D object.   It returns the final
couch object. 
*/
function createParts() {
   var couch = new THREE.Object3D(); //3D object to hold different parts of the couch
   var red = "rgb(130,0,0)"; //the color for most of the couch

   //creates base
   var bottom = createBasicBox(couchParams.widthBase,couchParams.heightBase,couchParams.depthBase,red);
   bottom.position.set(0,0,0);
   couch.add(bottom); 

   //creates one side of the couch (the right side if looking at the couch with it's back in the back)
   var side = createBasicBox(couchParams.widthSide, couchParams.heightSide, couchParams.depthSide,red);
   side.position.set(0,couchParams.heightSide/2-couchParams.heightBase/2,couchParams.depthBase/2 + couchParams.depthSide/2);
   couch.add(side);

   //creates second side of the couch (the left side if looking at the couch with it's back in the back)
   var side2 = side.clone();
   side2.position.set(0,couchParams.heightSide/2-couchParams.heightBase/2,- couchParams.depthBase/2 - couchParams.depthSide/2);
   couch.add(side2);

   //creates the back of the couch
   var back = createBasicBox(couchParams.widthBack, couchParams.heightBack, couchParams.depthBack,red);
   back.position.set(-couchParams.widthBase/2 - couchParams.widthBack/2,
                     couchParams.heightBack/2-couchParams.heightBase/2,0);
   couch.add(back); 

   //creates cushions 
   var cream = "rgb(200,200,200)" //color for cushions
   var cushion1 = createBasicBox(couchParams.widthC,couchParams.heightC,couchParams.depthC,cream);
   cushion1.position.set(0,couchParams.heightBase/2+couchParams.heightC/2,0);
   couch.add(cushion1);

   return couch; //return the couch object
}

/* createCouch
This function creates a couch object and sets its position against the left wall.  A second couch object is created and
set against the front wall (so couch back is the only thing visible). 
*/
function createCouch(roomParams) {
   //create couch against the left wall
   var couch = createParts();
   couch.position.set(-roomParams.roomWidth/2 + couchParams.widthBase/2 + couchParams.widthBack,
                  -roomParams.roomHeight/2 + couchParams.heightBase/2,-couchParams.widthBack);

   //create couch against front wall (only back of couch visible)
   var couch2 = createParts();
   couch2.rotation.y = Math.PI/2;
   couch2.position.set(-roomParams.roomWidth/2 + couchParams.depthBack,
                  -roomParams.roomHeight/2 + couchParams.heightBase/2,
                  roomParams.roomDepth/2 - couchParams.widthBack - couchParams.widthBase);

   //add both couches to the scene
   scene.add(couch);
   scene.add(couch2);
}

