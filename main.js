objects = [];
status = "";

function preLoad()
{
  video =createVideo('video.mp4'); 
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando objetos!";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
    
}

function gotResult()
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.lenght; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objeto detectado!";
            document.getElementById("numberOfObjects").innerHTML = "Número de objetos: " + objects.lenght;

            fill("#40E0D0");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#EEAD2D");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}