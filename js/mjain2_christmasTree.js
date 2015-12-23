
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
FILENAME: chrismasTree.js
USE: This function creates a christmas tree with presents under. The tree, trunk and star at the top of the tree use a cylinder
geometry and phong material.  The presents at the bottom of the tree are texture mapped and are created using a box geometry. The
different parts of the tree are created and then added to a 3D Object.  

VARIABLES:
roomParams - inherited by the main html page; this gives the dimenions of the bounding box/room area to allow for positioning
params - 
	- trunkRad,trunkHeight - create the brown trunk of the tree
	- treeBotRadius, treeHeight - create the tree
	- starRad - create the star at the top of the tree
*/

//dimensions
var params = {
      trunkRad: 5,
      trunkHeight: 10,
      treeBotRadius: 20,
      treeHeight: 50,
      starRad: 2.5,
}	

//object that holds a tree object
var createTree = new THREE.Object3D();

/* createSimpleCylinder(top,bottom,height,rSeg,hSeg,color)
This function creates a simple cylinder object.  This will be used an modified throughout the code. */
function createSimpleCylinder(top,bottom,height,rSeg, hSeg,color) {
  var geom = new THREE.CylinderGeometry(top, bottom, height,rSeg, hSeg); 
  var material = new THREE.MeshPhongMaterial({color: color, ambient:color}); //for lighting
  var body = new THREE.Mesh(geom,material);
  return body; //allow for modification of cylinder position later in code
}

/* -------------------- TREE + STAR GEOMETRY ------------------------------*/
/* makeTree(offset)
This creates a tree - a trunk and the branches.  The christmas tree is created using two simple cylinder shapes.  
The position desired is then set. The offset is used to shift the tree to the correct position in the scene*/
function makeTree(offset) {
	//create trunk of the tree
  var cyl = createSimpleCylinder(params.trunkRad,params.trunkRad,params.trunkHeight,
                                40,40,"rgb(160,82,45)"); //sienna
  cyl.position.set(0,params.trunkRad-offset,0);
  createTree.add(cyl);

  //create the tree
  var tree = createSimpleCylinder(0,params.treeBotRadius,params.treeHeight,
                                  40,2,"rgb(0,100,0)"); //forest green
  tree.position.set(0,params.treeHeight-params.treeBotRadius+params.trunkRad-offset,0);
  createTree.add(tree);
}

/* createStar(offset)
This creates a star on the top of the tree using a cylinder geometry.  Two cone objects are created, inverted so they
look like a star on top of the tree.  The offset is used to shift the star to the top of the tree.*/
function createStar(offset) {
  //create the top part of the star 
  var topStar = createSimpleCylinder(0,params.starRad,params.starRad,
                                    40,2,"rgb(255,215,0)"); //gold
  topStarPosition = params.treeHeight + params.trunkHeight + params.starRad;
  topStar.position.set(0,topStarPosition - offset,0);
  createTree.add(topStar);

  //create the bottom part of the star
  var bottomStar = createSimpleCylinder(params.starRad,0,params.starRad,
                                        40,2,"rgb(255,215,0)"); //gold
  botStarPosition = topStarPosition - params.starRad;
  bottomStar.position.set(0,botStarPosition - offset,0);
  createTree.add(bottomStar);
}


/* -------------------- CREATE ALL PRESENTS ------------------------------*/
/* createPresent(w,h,l,imagename)
This creates a small stack of presents under the tree with different dimensions.  
The texture of each of these presents is also different. Dimensions are provided as arguments and the imagename
to be loaded (ie. gold wrapping paper) will be loaded as a texture.*/
function createPresent(w,h,l,imagename) {
  var textureGeom = new THREE.BoxGeometry(w,h,l);

  //load two different textures:
  //THREE.ImageUtils.crossOrigin = '';
  var paper = new THREE.ImageUtils.loadTexture(imagename,
                                                    new THREE.UVMapping);

  var wrapping = [];
  for (i = 0; i<6;i++) {
    wrapping[i] = new THREE.MeshPhongMaterial({map: paper})
  }

  //the given barn geometry
  var textureMat = new THREE.MeshFaceMaterial(wrapping); 
  var textureMesh = new THREE.Mesh(textureGeom, textureMat); //create a mesh object
  return textureMesh;       //allows for later modification
}

/* createAllPresents(offset)
This specifies the dimensions and number of presents under the tree.  The texture of each present is also specified.
Each present is then added to the tree object.  The offset allows for positioning of the presents */
function createAllPresents(offset) {
  var p1 = createPresent(5,7.5,5,'gold_wrap.jpg');
  p1.position.set(2.5,3.75-offset,7.5);
  var p2 = createPresent(5.5,5.5,5.5,'red_wrap.jpg');
  p2.position.set(-5,3.75-offset,10);
  var p3 = createPresent(5.5,9,10,'purple_wrap.jpg');
  p3.position.set(8.75,4.5-offset,0); //far right present
  var p4 = createPresent(12.5,5,12.5,'gold_wrap.jpg');
  p4.position.set(-10,3.75-offset,0); //far left present
  createTree.add(p1);
  createTree.add(p2);
  createTree.add(p3);
  createTree.add(p4);
}

/* christmasTree(roomParams)
This function creates a christmas tree! It creates the tree, the star, and the presents under the tree. It returns the
tree object. */
function christmasTree(roomParams) {
	var offset = (0.5*roomParams.roomHeight);	
	makeTree(offset);
	createStar(offset);
	createAllPresents(offset);
	return createTree; //can adjust the position of the tree + presents around in a scene
}




