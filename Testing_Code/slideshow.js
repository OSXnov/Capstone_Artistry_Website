let slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    let i;
    let boxes = document.getElementsByClassName("box");

    if (n > boxes.length) {
        slideIndex = 1;
    }

    if (n < 1) {
        slideIndex = boxes.length;
    }

    for (i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove("active");
    }

    boxes[slideIndex - 1].classList.add("active");
}
