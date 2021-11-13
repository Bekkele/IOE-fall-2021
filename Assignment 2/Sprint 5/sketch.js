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
Sprint 5- Monicle and moustache being tracked individually along with colour picker 
*/
let video;
let poseNet;
let poses = [];
let colorPicker;
let moustacheImg;

function setup() {
  moustacheImg = loadImage("moustache.png");

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

    // Create a pink ellipse for the nose
    // fill(213, 0, 143);
    const nose = pose.nose;
    // ellipse(nose.x, nose.y, 20, 20);

    // Create a yellow ellipse for the right eye
    // fill(89, 76, 38);
    image(moustacheImg, nose.x - 75, nose.y, 150, 50);

    const leftEye = pose.leftEye;
    ellipse(leftEye.x, leftEye.y, 40, 40);
    fill("rgba(50%,0%,50%,0.2)");
    fill(
      `rgba(${colorPicker.color().levels[0]},${colorPicker.color().levels[1]},${
        colorPicker.color().levels[2]
      },0.2)`
    );

    // Create a yellow ellipse for the right eye
    // fill("rgba(100%,0%,100%,0.2)");
    // const leftEye = pose.leftEye;
    // ellipse(leftEye.x, leftEye.y, 40, 40);

    //   fill(0,255,0);
    //     const rightShoulder = pose.rightShoulder;
    //   ellipse(rightShoulder.x, rightShoulder.y, 20, 20 );
  }
}
