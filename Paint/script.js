let canvas = document.getElementById('paintCanvas');
let ctx = canvas.getContext('2d');
let painting = false;
let currentTool = 'pencil';
let currentColor = '#000';
let brushWidth = 3;

canvas.addEventListener('mousedown', () => {
    painting = true;
});

canvas.addEventListener('mouseup', () => {
    painting = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

document.querySelectorAll('.tool').forEach(tool => {
    tool.addEventListener('click', function() {
        currentTool = this.getAttribute('data-tool');
    });
});

document.getElementById('colorPicker').addEventListener('change', function() {
    currentColor = this.value;
});

document.getElementById('brushSize').addEventListener('input', function() {
    brushWidth = this.value;
});

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';

    switch (currentTool) {
        case 'pencil':
            ctx.strokeStyle = currentColor;
            break;
        case 'pen':
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = brushWidth + 3;
            break;
        case 'crayon':
            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
            break;
        default:
            ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

const saveBtn = document.getElementById('saveBtn');
const confirmationBox = document.getElementById('confirmationBox');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

saveBtn.addEventListener('click', () => {
    confirmationBox.style.display = 'block';
});

yesBtn.addEventListener('click', () => {
    saveDrawing();
    confirmationBox.style.display = 'none';
});

noBtn.addEventListener('click', () => {
    confirmationBox.style.display = 'none';
});

function saveDrawing() {
    const dataURL = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'garabato.png';
    a.click();
}

