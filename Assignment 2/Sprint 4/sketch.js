// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

/*
Bekkele Hamilton
November 2021
Sprint 4- Moustache tracking
*/

let video;
let poseNet;
let poses = [];
let moustacheImg;

function setup() {
  moustacheImg = loadImage("moustache.png");
  // moustacheImg.size(200, 200);

  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, { outputStride: 8, quantBytes: 4 }, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function mousePressed() {
  console.log(JSON.stringify(poses));
}

function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(0);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
    console.log(pose);

    // Create a pink ellipse for the nose
    fill(213, 0, 143);
    const nose = pose.nose;

    image(moustacheImg, nose.x - 75, nose.y, 150, 75);
  }
}
