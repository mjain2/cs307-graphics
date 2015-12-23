
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
FILENAME: train.js
USE: This function creates a train object and train tracks.  The train is modeled different kinds of box geometry.  The train is
all PhongMaterial, yet each box geom has a different color associated with it.  The wheels of the train are created using a 
TorusGeometry.  The train tracks are also TorusGeometry.  The train tracks are situated with the center point being the location of
the chrismas tree in the scene.  The train is situated on top of the tracks, and is later animated (within the HTML page) to go around the
tracks.  

VARIABLES:
roomParams - inherited by the main html page; this gives the dimenions of the bounding box/room area to allow for positioning
*/

/* tracks()
This function creates a set of black tracks using TorusGeometry and PhongMaterial.  The tracks are rotated around the x axis to allow 
for horizontal tracks.  The tracks object is returned to allow for later positioning in the scene.
*/
function tracks() {
      var geom = new THREE.TorusGeometry(30,1,16,100,0);
      var material = new THREE.MeshPhongMaterial( {color: "rgb(0,0,0)", ambient: "rgb(0,0,0)"});
      var tracks = new THREE.Mesh(geom, material);
      tracks.rotation.x = (Math.PI/2);
      tracks.position.set(0,-50,0);
      return tracks;
}

/* createTrain()
This function creates the train using a train 3D Object to hold the different parts.  The body of the train is created
using a boxGeom, and the wheels are created using TorusGeometry.  
*/
function createTrain() {
      var train = new THREE.Object3D();

      //create the larger part of the body
      var geom =  new THREE.BoxGeometry(8,4,2);
      var material = new THREE.MeshPhongMaterial({ambient:"rgb(120,60,30)"}); //dark brown
      var mesh = new THREE.Mesh(geom,material);
      mesh.position.set(0,-47,30);
      train.add(mesh);

      //create the front part of the train (smaller box)
      var geom2 = new THREE.BoxGeometry(3,2,1);
      var material2 = new THREE.MeshPhongMaterial({ambient:"rgb(130,50,20)"}); //sandy brown
      var mesh2 = new THREE.Mesh(geom2,material2);
      mesh2.position.set(4,-48,30);
      train.add(mesh2);

      //create the spout of the train 
      var spout = new THREE.BoxGeometry(1,2,1);
      var material3 = new THREE.MeshPhongMaterial({ambient:"rgb(40,40,40)"}); //dark gray
      var sMesh = new THREE.Mesh(spout,material3);
      sMesh.position.set(2,-45,30);
      train.add(sMesh);

      //create two of the same-side wheels of the train
      var wheels = new THREE.Object3D();
      var wheel = new THREE.TorusGeometry(1,.25,10,10); //create one wheel
      var wMesh = new THREE.Mesh(wheel,material3); //same material as the spout
      wMesh.position.set(-2,-49,31.5); 
      wheel2 = wMesh.clone(); //create 2nd wheel
      wheel2.position.set(2,-49,31.5);
      wheels.add(wMesh); 
      wheels.add(wheel2);

      //create other set of wheels (on back side)
      otherWheels = wheels.clone();
      otherWheels.position.set(0,0,-3); //move to the other side
      train.add(wheels);
      train.add(otherWheels);
      return train; //return train object to allow for later positioning and animation
}


