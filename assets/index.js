const webcamElement = document.getElementById("webcam");
const classifier = knnClassifier.create();
let net;

async function app() {
  console.log("Loading mobilenet..");
  net = await mobilenet.load();
  console.log("Successfully loaded model");
  $("#btn").html("Upload an Image");
  // btn.style.cursor = "pointer";

  $("#file").change(async function () {
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $("#img").attr("src", dataURL);
    };
    let file = $("#file").prop("files")[0];
    reader.readAsDataURL(file);
    $("#l1").html("loading model...");
    $("#l2").html("loading model...");
    $("#l3").html("loading model...");
    // Load the model.
    // Make a prediction through the model on our image.
    const imgEl = document.getElementById("img");
    const result = await net.classify(imgEl);
    console.log(result);
    console.log(result[0]);
    $("#l1").html(
      `${result[0].className} - ${Math.floor(
        result[0].probability.toFixed(2) * 100
      )}%`
    );
    $("#l2").html(
      `${result[1].className} - ${Math.floor(
        result[1].probability.toFixed(2) * 100
      )}%`
    );
    $("#l3").html(
      `${result[2].className} - ${Math.floor(
        result[2].probability.toFixed(2) * 100
      )}%`
    );
  });
}

app();
