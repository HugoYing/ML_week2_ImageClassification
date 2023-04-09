/*

This code is to explore the relationship between
image pixel and object recognition.

Users can adjust the pixel value of the picture 
by pressing the UP or DOWN key on the keyboard 
to compare the accuracy of object recognition 
under different pixel values.

Let's have a try!

*/


let classifier,
    result_string = "Predicting...",
    img,
    resizedImg,
    x = 50;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
  img = loadImage("cat2.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  classifier.classify(resizedImg, weKnow);
  noSmooth();
  
}

function draw() {
  background(225);
  
  resizedImg = createImage(x, x);
  img.resize(100,100); 
  resizedImg.copy(img, 0, 0, img.width, img.height, 0, 0, resizedImg.width, resizedImg.height);
  classifier.classify(resizedImg, weKnow); 
  image(resizedImg, 0, 0, width, height);
  
  

  fill(0);
  textSize(20);
  textAlign(CENTER);
  text(result_string, 0, height-20, width, 40);

  
}



function weKnow(error, results) {
  console.log(results);
  
  if (!error) {
    console.log("We think we know what this is...");
    console.log(results); 
    result_string = `This is a ${results[0].label}, I'm ${(Math.ceil(results[0].confidence * 100))}% confident.`;
    
  }else {
    console.log("There was an error determining the object within the image -> "+error);   
  }
  
}

function keyPressed(){
  //img.uploadPixels();
  if (keyCode === UP_ARROW){
    x += 10;
  }
  else if(keyCode === DOWN_ARROW){
    x -= 10;
  }
}