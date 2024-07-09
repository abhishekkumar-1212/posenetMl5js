let capture;
let singlePose;
let skeleton;

function setup() {
  createCanvas(800, 500);
  capture = createCapture(VIDEO);
  capture.size(800, 500);
  capture.hide();

  let posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('Model has loaded');
}

function draw() {
  background(0);
  image(capture, 0, 0, 800, 500);

  if (singlePose) {
    fill(255, 102, 102);

    for (let i = 0; i < singlePose.keypoints.length; i++) {
      ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 15, 16);
    }

    stroke(255);
    strokeWeight(5);

    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x, skeleton[j][0].position.y,
        skeleton[j][1].position.x, skeleton[j][1].position.y
      );
    }
  }
}
