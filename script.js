let capture;
let noseX , noseY;
let  reyeX, reyeY;
let leyeX, leyeY;
let singlePose;
let skeleton;       // Skeleton is the 2d array . 
       
function setup() {
  createCanvas(800, 500);
  capture = createCapture(VIDEO);
  capture.size(800, 500);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
  console.log(poses);

  if (poses.length > 0) {
    singlePose = poses[0].pose; // keypoints come inside the single poses
  skeleton=poses[0].skeleton;


  }

  console.log(noseX + " " + noseY);
}

function modelLoaded() {
  console.log('Model has loaded');
}

function draw() {
  background(0); // Clear the canvas with a black background (or any color you prefer)
  image(capture, 0, 0, 800, 500); // Draw the video capture on the canvas

  fill(255, 102, 102); // Light blue color code
  
  // to detect all the body part we traverse keypoints by using the for loop 17 times loops is going on 
  if (singlePose){
  for( let i=0;i<singlePose.keypoints.length;i++){
ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y, 15,16);
  }
  stroke(255,255); // for color 
  strokeWeight(5);
  for(let j=0;j<skeleton.length;j++){
    line(skeleton[j][0].position.x, skeleton[j][0].position.y,skeleton[j][1].position.x,skeleton[j][1].position.y);
  }


  }
  
}
