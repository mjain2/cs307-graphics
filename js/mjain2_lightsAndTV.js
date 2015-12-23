
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
FILENAME: lightsAndTV.js
USE: This function creates little string lights along the top perimeter of the room.  It also creates a TV object.  
The string lights are white spheres (SphereGeom) that are repeated along the edges of the room.  Another part of the decor is the TV
object, which is a boxGeometry with a transparent white plane overlaid on top of it.  The TV is found on the right wall, about halfway up.

VARIABLES:
roomParams - inherited by the main html page; this gives the dimenions of the bounding box/room area to allow for positioning
tvParams - 
	- widthTV, heightTV - the width and height of the box Geometry that creates the black part of the TV.  
	- depth - specifies both the depth of the boxGeom (black) of the TV and the offset that the screen has from the wall
*/




/* -------------------- CREATE STRING LIGHTS ------------------------------*/

/* createLight(x,y,z)
This function creates a single light bulb using Sphere Geometry and adds it to the scene.  The position of the bulb is 
determined based on the arguments passed in (x,y,z).
*/
function createLight(x,y,z) {
      //create small sphere, then curve to connect to another white sphere
      var geom = new THREE.SphereGeometry(1);
      var mat = new THREE.MeshPhongMaterial({color: "rgb(255,255,255)", ambient: "rgb(255,255,255)"});
      var bulb = new THREE.Mesh(geom,mat);
      scene.add(bulb);
      bulb.position.set(x,y,z); //sets position based on arguments
    }

/* createLights(halfRoomWidth, halfRoomHeight, halfRoomDepth)
This function creates a string of lights along each wall using half the roomParameters.  The lights are shifted slightly
down on the y-axis so they are within the room.  
*/
function createStringLights(halfRoomWidth, halfRoomHeight, halfRoomDepth) {

  var yPos = halfRoomHeight - 5; //shift lights slightly down on y-axis so they remain within the room
  //create lights across the z axis
  for (i=-halfRoomDepth;i<=halfRoomDepth;i=i+5) {
    createLight(halfRoomWidth,yPos,i);
    createLight(-halfRoomWidth,yPos,i);
  }
  //create lights across the x axis
  for (j=-halfRoomWidth;j<=halfRoomWidth;j=j+5) {
    createLight(j,yPos,-halfRoomDepth);
    createLight(j,yPos,halfRoomDepth);
  }
}

/* -------------------- CREATE TV  ------------------------------*/
//dimensions
var tvParams = {
  widthTV: 60,
  heightTV: 40,
  depth: 4
}

/* createScreen(roomParams)
This function creates a transparent screen (a plane).  The opacity of the screen is set at 0.4.  The mesh is rotated
(so it's vertical) and returned to allow for later modifications.
*/
function createScreen() {
  var plane = new THREE.PlaneGeometry(tvParams.widthTV,tvParams.heightTV);
  var material = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)", side: THREE.DoubleSide,
  		transparent: true, opacity: 0.4, specular: 50}); 
  var mesh = new THREE.Mesh(plane,material);
  mesh.rotation.y = Math.PI/2; //make screen vertical
  return mesh;
}

/* createTV(roomParams)
This function creates a transparent screen (a plane).  The opacity of the screen is set at 0.4, and the screen
is positioned so it is slightly left of the tvBox. The screen and blackBox is added to the tvBox 3D object holder,
and added to the scene.  The TV is positioned on the left wall.
*/
function createTV(roomParams) {
  var theScreen = createScreen(roomParams);
  theScreen.position.set(-tvParams.depth/1.5,0,0)
  var tvBox = new THREE.Object3D();
  var box = blackBox(tvParams.widthTV*1.25,tvParams.heightTV*1.25,tvParams.depth);
  box.rotation.y = Math.PI/2;
  tvBox.add(box);
  tvBox.add(theScreen);
  tvBox.position.set(roomParams.roomWidth/2-tvParams.depth/2,0,0)
  scene.add(tvBox);
}

/* blackBox(w,h,d) 
This function creates a simple black box that will be put behind the TV screen.
*/
function blackBox(w,h,d) {
  var geom = new THREE.BoxGeometry(w,h,d);
  var mat = new THREE.MeshPhongMaterial({color:"rgb(0,0,0)",ambient:"rgb(0,0,0)"}); //black
  var mesh = new THREE.Mesh(geom,mat);
  return mesh;
}