let bgvideo = document.querySelector(".video")
let heading = document.querySelector(".heading")

function keyPressed() {
  bgvideo.style.display = "none"
  canvas.style.display = "flex"
  heading.style.display = "flex"
  fingers.loop();
}

let facemesh;
let video;
let predictions = [];
let bg
let fingers;
function setup() {

   createCanvas(700, 400);
  video = createCapture();
  video.size(width, height);
  
  
  fingers = createVideo(['asset/FBG.mp4']);
  fingers.hide()
  facemesh = ml5.facemesh(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new predictions are made
  facemesh.on("predict", results => {
    predictions = results;
   
  
  });


  // Hide the video element, and just show the canvas
  video.hide();

}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  //  image(video, 10, 10, 1920, 1080);

background(0);
// image(fingers, 0, 0); 
filter(GRAY);
image(fingers, 0, 0); // draw a second copy to canvas



  // We can call both functions to draw all keypoints
  drawKeypoints();
 
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;

    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      
      fill(255, 255, 255);
      ellipse(x, y, 3, 3);
    }
  }
}

