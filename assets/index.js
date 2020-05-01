const webcamElement = document.getElementById("webcam");
const classifier = knnClassifier.create();
let net;

async function app() {
  $("#file").change(async function () {
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $("#img").attr("src", dataURL);
    };
    let file = $("#file").prop("files")[0];
    reader.readAsDataURL(file);
    document.getElementById("l1").innerHTML = "loading model...";
    document.getElementById("l2").innerHTML = "loading model...";
    document.getElementById("l3").innerHTML = "loading model...";
    console.log("Loading mobilenet..");
    // Load the model.
    net = await mobilenet.load();
    console.log("Successfully loaded model");
    // Make a prediction through the model on our image.
    const imgEl = document.getElementById("img");
    const result = await net.classify(imgEl);
    console.log(result);
    console.log(result[0]);
    document.getElementById("l1").innerHTML = `${
      result[0].className
    } - ${Math.floor(result[0].probability.toFixed(2) * 100)}%`;
    document.getElementById("l2").innerHTML = `${
      result[1].className
    } - ${Math.floor(result[1].probability.toFixed(2) * 100)}%`;
    document.getElementById("l3").innerHTML = `${
      result[2].className
    } - ${Math.floor(result[2].probability.toFixed(2) * 100)}%`;
  });
}

app();
