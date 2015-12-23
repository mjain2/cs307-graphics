
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
FILENAME: vases.js
USE: This function creates a group of transparent vases that are randomly put (coordinates are arbitrary) into an order 
that is aesthetically pleasing.  Each vase is a cylinder that can be altered (using the radius variables, the height variable,
and the color variable).  Important to note: the position values were all randomly picked based on aesthetic appeal - feel free 
to modify those anyway you please. Current position of the vases is in the front left corner of the room/bounding box.

VARIABLES:
roomParams - inherited by the main html page; this gives the dimenions of the bounding box/room area
*/


/* createVase()
Creates a simple vase object.  The vase is of a cylinder geometry and a MeshPhongMaterial with the transparency set to 
a mid 0.5 level.  The arguments are: radius of the top of the cylinder, the radius at the bottom of the cylinder, the height
of the cylinder, and the color of the cylinder. The mesh of the vase object is returned to allow for later positioning */
function createVase(rTop,rBot,h,col) {
  var geom = new THREE.CylinderGeometry(rTop,rBot,h,100,100);
  var mat = new THREE.MeshPhongMaterial({color: col, ambient:col, transparent: true, opacity: 0.5, specular: 10});
  var mesh = new THREE.Mesh(geom,mat);
  return mesh;
}

/* createVases()
Creates a group of standing vases.  The vase is created from the createVase function above, then set into position.
 The arguments are: roomParams of the room. */
function createVases(roomParams) {
  //an object that is holds multiple vases
  var vases = new THREE.Object3D();

  var v1 = createVase(2.5,5,30,"rgb(130,20,130)"); //light purple
  v1.position.set(0,15,0);
  vases.add(v1);
  var v2 = createVase(1.5,3,50,"rgb(25,25,112)"); //midnightblue
  v2.position.set(8,25,8);
  vases.add(v2);
  var v3 = createVase(3,6,46,"rgb(0,100,0)"); //darkgreen
  v3.position.set(2,23,20);
  vases.add(v3);
  var v4 = createVase(2,4,34,"rgb(250,128,114)"); //salmon
  v4.position.set(14,17,14);
  vases.add(v4);
  var v5 = createVase(2.5,5,42,"rgb(0,191,255)"); //deep sky blue
  v5.position.set(20,19,20);
  vases.add(v5);
  var v6 = createVase(3,6,32,"rgb(0,255,0)"); //lime
  v6.position.set(18,21,2);
  vases.add(v6);

  scene.add(vases);
  vases.position.set(-roomParams.roomWidth/2 + 5,-roomParams.roomHeight/2,roomParams.roomDepth/4); //set position of vases in room
}