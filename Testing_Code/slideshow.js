var slideshows = document.querySelectorAll('[data-component="slideshow"]');

// Define the time interval outside of the function
var time = 5000;

// Apply to all slideshows that you define with the markup wrote
slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {
  var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`); // Get an array of slides
  var index = 0;

  slides[index].classList.add('active');  // Add the 'active' class to the first slide

  // Set the interval to advance to the next slide
  setInterval(() => {
    slides[index].classList.remove('active'); // Remove the 'active' class from the current slide

    // Go over each slide incrementing the index
    index++;

    // If you go over all slides, restart the index to show the first slide and start again
    if (index === slides.length) index = 0;

    slides[index].classList.add('active'); // Add the 'active' class to the next slide
  }, time);
}
