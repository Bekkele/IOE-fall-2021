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
Sprint 3- Monicle and colorPicker integration 
*/

let video;
let poseNet;
let poses = [];
let colorPicker;

function setup() {
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
  // https://p5js.org/reference/#/p5/createColorPicker
  colorPicker = createColorPicker("#ed225d");
  colorPicker.position(0, height + 5);
}

function modelReady() {
  select("#status").html("Model Loaded");
}

function mousePressed() {
  console.log(JSON.stringify(poses));
}

function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
    console.log(pose);

    const leftEye = pose.leftEye;
    ellipse(leftEye.x, leftEye.y, 40, 40);
    fill("rgba(50%,0%,50%,0.2)");
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //Template string
    fill(
      `rgba(${colorPicker.color().levels[0]},${colorPicker.color().levels[1]},${
        colorPicker.color().levels[2]
      },0.2)`
    );
  }
}
