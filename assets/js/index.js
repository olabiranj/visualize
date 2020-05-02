const webcamElement = document.getElementById("webcam");
const imgEl = document.getElementById("img");
const classifier = knnClassifier.create();
let net;
let img_name;

async function app() {
  net = await mobilenet.load();
  console.log("Successfully loaded model");
  $("#btn").html("Upload an image");
  $("#file").change(async function () {
    let reader = new FileReader();
    reader.onload = async function () {
      let dataURL = reader.result;
      await $("#img").attr("src", dataURL);
      img_name = dataURL;
    };
    let file = $("#file").prop("files")[0];
    reader.readAsDataURL(file);
    $("#l1").html("loading model...");
    $("#l2").html("loading model...");
    $("#l3").html("loading model...");
    $("#btn").html("Just a moment");
    console.log("Loading mobilenet..");
    setTimeout(() => {
      updateUI();
    }, 500);
  });
}

async function updateUI() {
  // Load the model.
  // Make a prediction through the model on our image.
  // $("#img").attr("src", img_name);
  const result = await net.classify(imgEl);
  console.log(result);
  console.log(result[0]);
  $("#btn").html("Upload an image");
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
}
app();
