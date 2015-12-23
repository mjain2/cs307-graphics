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
FILENAME: fireplace.js
USE: This function creates a fireplace.  The fireplace contains a mantle (created using box geometries and texture mapping) and 
a plane with a slightly transparent mapping of a fire.  The material used for the mantle is PhongMaterial and BasicMaterial for the 
fire plane.  The parameters to set the fireplace dimensions are defined in fireParams and are used for both the mantle and the plane 
construction. The mantle + fire is positioned in the middle of the back wall.  

VARIABLES:
roomParams - inherited by the main html page; this gives the dimenions of the bounding box/room area to allow for positioning
fireParams
   - fWidth, fHeight, and fDepth - the dimensions for the mantle.  The height is used for the creation of the fire (on the plane).
*/

//dimensions 
var fireParams = {
	fWidth: 10,
	fHeight: 50,
	fDepth: 10
}

/* createPlane
This function creates a square plane (with fHieght).  An image of a fire is loaded as a texture for the plane.  A little 
opacity is added to this image to allow for it to appear a little softer in the scene. The material is a basic material. 
The mesh of the plane is returned (to allow for later modifications to position).
*/
function createPlane() {
  var plane = new THREE.PlaneGeometry(fireParams.fHeight,fireParams.fHeight);
  var texture = new THREE.ImageUtils.loadTexture('fire.jpg',new THREE.UVMapping);
  var material = new THREE.MeshBasicMaterial({color:"rgb(255,255,255)", map: texture,transparent: true, opacity: 0.55});
  var mesh = new THREE.Mesh(plane,material);
  return mesh
}

/* createOnePartOfMantle(w,h,d)
This function creates one side of the mantle (ie. one pillar).  The geometry is a boxGeom and a texture of white brick is 
added to the PhongMaterial.  The mesh is returned (allow for later positional changes).
*/
function createOnePartOfMantle(w,h,d) {
	var pillar = new THREE.BoxGeometry(w,h,d);
	var texture = new THREE.ImageUtils.loadTexture('mantle.jpg', new THREE.UVMapping);
	var mat = new THREE.MeshPhongMaterial({color:"rgb(255,255,255)", map:texture});
	var mesh = new THREE.Mesh(pillar,mat);
	return mesh;
}

/* createMantle(roomParams)
This function creates the entire white brick mantle (using an 3D object holder).  
*/
function createMantle(roomParams) {
	var mantle = new THREE.Object3D(); 
	var fire = createPlane(); //create fire inside mantle

	//left side of mantle
	var leftSide = createOnePartOfMantle(fireParams.fWidth , fireParams.fHeight ,  fireParams.fDepth);
	leftSide.position.set(-fireParams.fHeight/2,0,0);

	//right side of the mantle
	var rightSide = leftSide.clone();
	rightSide.position.set(fireParams.fHeight/2,0,0);

	//top of the mantle (extended width wise a little so it juts out over the sides of the mantle)
	var topSide = createOnePartOfMantle(fireParams.fHeight+(fireParams.fWidth*2),fireParams.fWidth, fireParams.fDepth*1.25);
	topSide.position.set(0,fireParams.fHeight/2,fireParams.fDepth/8);

	mantle.add(fire);
	mantle.add(leftSide);
	mantle.add(rightSide);
	mantle.add(topSide);
	//positioned along the back wall
	mantle.position.set(0,-roomParams.roomHeight/2 + fireParams.fHeight/2,-roomParams.roomDepth/2 + fireParams.fDepth/2);
	scene.add(mantle); //mantle added to scene

}

