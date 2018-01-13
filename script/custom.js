var context = document.getElementById('canvas').getContext('2d'),
    image = new Image(),
    $canvas = $("#canvas"),
    canvasOffset = $canvas.offset(),
    offsetX = canvasOffset.left,
    offsetY = canvasOffset.top,
    $draggable = $(".image");

image.setAttribute('crossOrigin', 'anonymous');

$draggable.draggable({
    helper: 'clone'
});

$canvas.droppable({
    drop: handleDrop
});

document.querySelector(".upload-image").addEventListener("change", addImageToCanvas, false);

function addImageToCanvas() {
    var file = document.querySelector(".upload-image").files[0],
        src = window.URL.createObjectURL(file);

    image.src = src;

    image.onload = function () {
        context.drawImage(image, 0, 0);
        window.URL.revokeObjectURL(src);
    }
}

function handleDrop(event, ui) {
    var element = new Image();
    element.src = ui.draggable[0].src;
    var x = parseInt(ui.offset.left - offsetX);
    var y = parseInt(ui.offset.top - offsetY);
    context.drawImage(element, x - 1, y);
}

function save($canvas) {
    localStorage.setItem('image' + localStorage.length, document.getElementById('canvas').toDataURL());
    var listItem = document.createElement("li");
    listItem.innerHTML = 'image' + localStorage.length;
    document.querySelector('.recent-panel-activity').appendChild(listItem);
}