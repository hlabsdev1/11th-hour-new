// console.log(pins);

// Define a media query
const mediaQuery = window.matchMedia("(min-width: 600px)");

// Function to handle the media query match
function handleMediaQueryChange(event) {
  if (event.matches) {
    // If the media query matches (i.e., the viewport is 600px or more)
    console.log("Viewport is 600px or more");
    $(".fs-global-pin").on("click", function () {
      //removing active class from rest when clicking on item
      $(".fs-global-pin").removeClass("is--active");
      $(".r-m-map-img").removeClass("is--active");
      $(".r-map-content-anime").removeClass("is--active");
      //adding active class to target class
      $(this).addClass("is--active");
      var redItem = $(this).attr("r-map-item");
      //for image
      $(".r-m-map-img").each(function () {
        if ($(this).attr("r-map-item") === redItem) {
          $(this).addClass("is--active");
          // console.log("what happening");
        }
      });

      //for content
      $(".r-map-content-anime").each(function () {
        if ($(this).attr("r-map-item") === redItem) {
          $(this).addClass("is--active");
          console.log("what happening");
        }
      });
    });
  } else {
    // If the media query does not match (i.e., the viewport is more than 600px)
    console.log("Viewport is less than 600px");
    // Add your JavaScript code for larger screens here

    $(".fs-global-pin").on("click", function () {
      //removing active class from rest when clicking on item
      $(".fs-global-pin").removeClass("is--active");
      $(".ab-mob-card-item").removeClass("is--active");
      //adding active class to target class
      $(this).addClass("is--active");
      var redItem = $(this).attr("r-map-item");
      //for image
      $(".ab-mob-card-item").each(function () {
        if ($(this).attr("r-map-item") === redItem) {
          $(this).addClass("is--active");
          // console.log("what happening");
          $(".ab-mob-card-close-butn").addClass("is--active");
        }
      });
    });

    //clicking on close button
    $(".ab-mob-card-close-butn").on("click", function () {
      $(".ab-mob-card-item").removeClass("is--active");
      $(".ab-mob-card-close-butn").removeClass("is--active");
    });
  }
}

// Register the event listener
mediaQuery.addListener(handleMediaQueryChange);

// Initial check
handleMediaQueryChange(mediaQuery);