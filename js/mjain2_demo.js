
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
  /* -------------------- INITIALIZATION ------------------------------*/
  var scene = new THREE.Scene(); //always need a scene and a renderer
  var renderer = new THREE.WebGLRenderer();
  TW.mainInit(renderer,scene); //initialize
  THREE.ImageUtils.crossOrigin = "anonymous"; //allows for proper loading of images

  //parameters of the room (width,height,depth) = bounding box
  var roomParams = {
    roomWallColor:"rgb(70,130,200)", //mute blue color (backup, in case texture fails)
    roomCeilingColor:"rgb(255,222,173)",//navajo 
    roomFloorColor: "rgb(240,160,90)", //sandy brown-ish color (backup, in case texture fails)
    roomWidth: 150, 
    roomHeight: 100,
    roomDepth: 150,
  };

  var t = 0; //used as a timestamp in animation

  //to allow for ease of position setting of camera and other objects
  var halfRoomHeight = roomParams.roomHeight/2;
  var halfRoomWidth = roomParams.roomWidth/2;
  var halfRoomDepth = roomParams.roomDepth/2;

  //define floor and wall textures
  THREE.ImageUtils.crossOrigin = '';
  var texture = new THREE.ImageUtils.loadTexture('brick.jpg',new THREE.UVMapping);
  var carpet = new THREE.ImageUtils.loadTexture('carpet.jpg',new THREE.UVMapping);
  var colorMaterials = [
    //right wall -  blue
    new THREE.MeshPhongMaterial({map: texture, color: roomParams.roomWallColor, side: THREE.BackSide}),  
    //left wall -  blue
    new THREE.MeshPhongMaterial({map: texture, color: roomParams.roomWallColor, side: THREE.BackSide}),  
    //ceiling - navajo
    new THREE.MeshPhongMaterial({ambient: roomParams.roomCeilingColor, color: roomParams.roomCeilingColor,side: THREE.BackSide}), 
    //floor - sandy brown
    new THREE.MeshPhongMaterial({map:carpet, color: roomParams.roomFloorColor, side: THREE.BackSide}), 
    //front wall (not visible when initially rendered)- blue
      new THREE.MeshPhongMaterial({map: texture,color: roomParams.roomWallColor, side: THREE.BackSide}),  
    //back wall (visible when initially rendered) - blue
     new THREE.MeshPhongMaterial({map: texture,color: roomParams.roomWallColor, side: THREE.BackSide}),  
  ];

/* -------------------- ADD LIGHT TO THE SCENE ------------------------------*/

/*  addLight()
This adds ambient and directional light to the scene. The directional light position is set to a corner */
function addLight() {
  var ambient = new THREE.AmbientLight("rgb(220,220,220)"); //gainsboro
  scene.add(ambient);
  var directional = new THREE.DirectionalLight("rgb(50,50,50)"); 
  //darker rgb for slight directional light in scene
  directional.position.set(50,50,100); //reset location of light source
  scene.add(directional);
}

/* -------------------- ADD OBJJECTS TO SCENE ------------------------------*/
/* createBox(colors)
This function creates the room.  A boxGeometry with the specified parameters is first created, then the material and color of the faces is set.  The boxMesh is created then added to the scene.  See roomParams for specified paramters  */
function createBox(colors) {
  var geom = new THREE.BoxGeometry(roomParams.roomWidth,roomParams.roomHeight,roomParams.roomDepth); //100,100,100 box
  var faces = new THREE.MeshFaceMaterial(colors); //phong material
  var boxMesh = new THREE.Mesh(geom,faces); 
  scene.add(boxMesh); //add box to the scene
};

/* createTreeAndTracks()
This function creates the tree, train, and tracks and adds them to the scene (after positioning them).  The
train object is returned so it can later be animated  */
function createTreeAndTracks() {
  var treeAndTrain = new THREE.Object3D();
  var tree = christmasTree(roomParams);
  var train = createTrain();  
  var trainTracks = tracks();
  treeAndTrain.add(tree);
  treeAndTrain.add(train);
  treeAndTrain.add(trainTracks);
  scene.add(treeAndTrain);
  treeAndTrain.position.set(halfRoomWidth*(.5),0,-halfRoomDepth*(0.4));
  //renderTrain(t,train);
  return train;
}

/* drawScene()
This function creates the scene.  It creates the room, the train & tree & tracks, string lights, the mantle & fire,
the couches, the TV, and the vases.  Light is also added here.  */
function drawScene() {
  createBox(colorMaterials);
  var trainObject = createTreeAndTracks();
  createStringLights(halfRoomWidth,halfRoomHeight,halfRoomDepth);
  createMantle(roomParams);
  addLight();
  createCouch(roomParams);
  createTV(roomParams);
  createVases(roomParams);
  return trainObject; //use for animation
}

var train = drawScene(); //draws the scene and obtains the train object used for animation
window.onload = TW.render; //render only after everything has been loaded (ie. textures)

//set up camera
var camera = TW.cameraSetup(renderer,
             scene,
             {minx: -halfRoomWidth, maxx: halfRoomWidth,
              miny: -halfRoomHeight, maxy: halfRoomHeight,
              minz: -halfRoomDepth,maxz: halfRoomDepth});

/* -------------------- ANIMATE THE TRAIN ------------------------------*/
/* UPDATE()
This function updates the train's position in the scene using the helper renderTrain method. */
function update (train) {
  function renderTrain(t,train) {
    if(t<100) { //gives animation an eventual stopping point
      t+=0.01; //arbitrary time units
      train.rotation.y += 0.03; //rotates train object 
      train.position.x = Math.cos(t) + 0; //moves train object along x axis
      train.position.z = Math.sin(t) + 0; //moves train object along y axis
      renderer.render(scene,camera.cameraObject); 
     }
  }
  renderTrain(t,train); //renders the new positin of the train
}

/* animate()
This function uses update and render() to animate the train. */
function animate () {
 update(train); //updates the train's position
 TW.render(); //renders the scene
 animationID = requestAnimationFrame(animate);
}

animate();
//END OF SCRIPT
