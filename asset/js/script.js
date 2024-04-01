function toggleAccordion(id) {
  const accordionContent = document.getElementById(id);
  accordionContent.style.display =
    accordionContent.style.display === "block" ? "none" : "block";
  const accordionItem = accordionContent.parentElement;
  accordionItem.classList.toggle("active");
}





const canvas = document.getElementById("signatureCanvas");
const context = canvas.getContext("2d");
let isDrawing = false;
let points = [];

// Set initial styles
context.lineCap = "round";
context.lineJoin = "round";

// Add event listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  points = [];
  addPoint(
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  );
}

function draw(e) {
  if (!isDrawing) return;

  addPoint(
    e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top
  );
  drawPoints();
}

function stopDrawing() {
  isDrawing = false;
  points = [];
}

function addPoint(x, y) {
  points.push({ x, y });
}

function drawPoints() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = colorPicker.value;
  context.lineWidth = widthSlider.value;

  if (points.length < 3) {
    const b = points[0];
    context.beginPath();
    context.arc(b.x, b.y, context.lineWidth / 2, 0, Math.PI * 2, !0);
    context.fill();
    context.closePath();
    return;
  }

  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  for (var i = 1; i < points.length - 2; i++) {
    const c = (points[i].x + points[i + 1].x) / 2;
    const d = (points[i].y + points[i + 1].y) / 2;
    context.quadraticCurveTo(points[i].x, points[i].y, c, d);
  }

  context.quadraticCurveTo(
    points[i].x,
    points[i].y,
    points[i + 1].x,
    points[i + 1].y
  );
  context.stroke();
}

// Additional functions
function changeColor() {
  context.strokeStyle = colorPicker.value;
}

function changeWidth() {
  context.lineWidth = widthSlider.value;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
function showDownloadOptions() {
  const downloadOptions = document.getElementById("downloadOptions");
  downloadOptions.style.display = "block";
}

function closeDownloadOptions() {
  const downloadOptions = document.getElementById("downloadOptions");
  downloadOptions.style.display = "none";
}

function downloadSignature(format) {
  closeDownloadOptions();

  if (format === "pdf") {
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempContext.fillStyle = "#fff";
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempContext.drawImage(canvas, 0, 0);

    // Create a new pdf element and append the temporary canvas
    const pdfElement = document.createElement("div");
    pdfElement.appendChild(tempCanvas);

    // Use html2pdf to generate the PDF
    html2pdf(pdfElement, {
      margin: 10,
      filename: "signature.pdf",
      image: { type: "jpeg", quality: 1.0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  } else if (format === "image") {
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempContext.fillStyle = "#fff";
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempContext.drawImage(canvas, 0, 0);

    const dataURL = tempCanvas.toDataURL();

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "signature.png";
    link.click();
  }
}

// Event listeners for additional functions
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("input", changeColor);

const widthSlider = document.getElementById("widthSlider");
widthSlider.addEventListener("input", changeWidth);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearCanvas);
