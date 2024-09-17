//before anything happen we want the slider image to be append on circular images.
$(".popup-img-trigger").click(function () {
    $(".swiper-slide.is--r-image .r-s-carousel-img").each(function () {
      let img = $(this);
      var orderItem = img.attr("order-num");
      $(".r-s-carousel_item").each(function () {
        if ($(this).attr("order-num") === orderItem) {
          $(this).append(img);
        }
      });
    });
  });
  
  $(function () {
    $(".popup-img-trigger").click();
  });
  
  //POPUP SLIDER SECTION
  //POPUP SLIDER SECTION
  //POPUP SLIDER SECTION
  
  const swiperTest = new Swiper(".swiper.is--r-image", {
    slidesPerView: "auto",
    slideToClickedSlide: true,
    // slideActiveClass: "is--active",
    // loop: true,
    navigation: {
      nextEl: ".r-swiper-arrow-wrap .swiper-button-next",
      prevEl: ".r-swiper-arrow-wrap .swiper-button-prev",
      disabledClass: "is--disabled",
    },
    // custom pagination
    pagination: {
      el: ".r-pagination-wrap",
      bulletActiveClass: "is--active",
      clickable: true,
      bulletRender: function (index, className) {
        // Customize the bullet element
        return `<span class="${className}" data-slide-index="${index}"></span>`;
      },
    },
    on: {
      init: function () {
        assignAttributesToBullets();
        const outerSlideTextContainer = document.querySelector(
          ".r-outside-slider-content"
        );
      },
      slideChange: function () {
        //creating variable for currentIndex
        let currentSlideNumber = this.realIndex + 1;
        //adding index to text
        $(".r-current-index").text(currentSlideNumber);
        // updateOuterSlideText(this);
      },
    },
  });
  
  // Function to assign attributes to bullets
  function assignAttributesToBullets() {
    const bullets = document.querySelectorAll(
      ".r-pagination-wrap .swiper-pagination-bullet"
    );
    bullets.forEach((bullet, index) => {
      bullet.setAttribute("order-num", `${index + 1}`);
      // console.log("showing");
    });
  }
  
  //sm line slider
  const swiperLine = new Swiper(".swiper.is--r-title", {
    slidesPerView: 1,
    direction: "vertical",
    spaceBetween: 0,
    effect: "fade",
    slideActiveClass: "is--active",
    allowTouchMove: false,
  });
  
  swiperTest.controller.control = swiperLine;
  
  //calc total slides
  const allSlides = document.querySelectorAll(".swiper-slide.is--r-image");
  const totalSlides = allSlides.length;
  $(".r-total-slides").text(totalSlides);
  
  //gsap set
  gsap.set("[r-popup-fade]", { opacity: 0 });
  gsap.set(".r-popup-right-layer", { opacity: 0 });
  
  // when clicking on each carousel item
  $(".r-s-carousel_item").click(function () {
    //storing attribute to a variable
    var redItem = $(this).attr("order-num");
    //showing popup using add class
    $(".r-popup").addClass("is--active");
    $(".r-body").addClass("r-no-scroll");
    //gsap animation
    gsap.to(".r-popup-layer, .r-popup-right-layer", {
      opacity: 1,
      duration: 0.8,
      delay: 0.6,
    });
    gsap.to("[r-popup-fade]", { opacity: 1, duration: 0.8, delay: 1 });
    //check if this pagination has same attribute as the slide
    $(".r-pagination-wrap .swiper-pagination-bullet").each(function () {
      if ($(this).attr("order-num") === redItem) {
        //then click  on ppagination
        $(this).trigger("click");
        // console.log($(this).attr("order-num"));
      }
    });
  });
  
  $(".r-close-butn").click(function () {
    $(this).closest(".r-popup").removeClass("is--active");
    $(".r-body").removeClass("r-no-scroll");
    gsap.to(".r-popup-layer, [r-popup-fade], .r-popup-right-layer", {
      opacity: 0,
      duration: 0.8,
    });
    moveBack();
    $(".r-s-carousel-img.is--test").css("z-index", 1);
  });
  
  $(".swiper-slide.is--image").click(function () {
    $(this).css("opacity", "0.5");
    console.log("test");
  });
  
  function extraMove() {
    const e = $(".r-s-carousel-img.is--test");
    const targetContainers = $(".swiper-slide.is--r-image");
  
    // Loop through each image in .r-s-carousel_item
    e.each(function () {
      const orderNum = $(this).attr("order-num");
      const rImg = $(this);
      //prev state
      const state = Flip.getState(rImg);
      $(".r-s-ab-middle").append(rImg);
      Flip.from(state, {
        duration: 0.8,
        absolute: true,
        stagger: 0.1,
        ease: "power1.inOut",
      });
      gsap.delayedCall(1, function () {
        // Loop through each target container to find a match based on order-num
        targetContainers.each(function () {
          const targetContainer = $(this);
          const targetOrderNum = targetContainer.attr("order-num");
  
          if (orderNum === targetOrderNum) {
            // Grab the state of the image(s)
            const newState = Flip.getState(rImg);
  
            // Append the image to the matching target container
            targetContainer.append(rImg);
  
            // Animate the transition from the initial state to the new state
            Flip.from(newState, {
              duration: 1,
              absolute: true,
              ease: "power1.inOut",
            });
          }
        });
      });
    });
  }
  
  function moveBack() {
    const e = $(".r-s-carousel-img.is--test");
    const targetContainers = $(".r-s-carousel_item");
  
    // Loop through each image in .r-s-carousel_item
    e.each(function () {
      const orderNum = $(this).attr("order-num");
      const rImg = $(this);
      //prev state
      const state = Flip.getState(rImg);
      $(".r-s-ab-middle").append(rImg);
      Flip.from(state, {
        duration: 1,
        absolute: true,
        stagger: 0.1,
        ease: "power1.inOut",
      });
      gsap.delayedCall(1.2, function () {
        // Loop through each target container to find a match based on order-num
        targetContainers.each(function () {
          const targetContainer = $(this);
          const targetOrderNum = targetContainer.attr("order-num");
  
          if (orderNum === targetOrderNum) {
            // Grab the state of the image(s)
            const newState = Flip.getState(rImg);
  
            // Append the image to the matching target container
            targetContainer.append(rImg);
  
            // Animate the transition from the initial state to the new state
            Flip.from(newState, {
              duration: 0.6,
              absolute: true,
              ease: "power1.inOut",
            });
          }
        });
      });
    });
  }
  
  // when clicking on r carousel item above function happening
  
  $(".r-s-carousel_item").each(function (index) {
    const item = $(this);
    item.on("click", function () {
      //adding css
      item.find(".r-s-carousel-img.is--test").css("z-index", 3);
      extraMove();
    });
  });
  
  //globe-
  $(".fs-global-pin").on("click", function () {
    //removing active class from rest when clicking on item
    $(".r-m-map-img").removeClass("is--active");
    //adding active class to target class
    var redItem = $(this).attr("r-map-item");
    //for image
    $(".r-m-map-img").each(function () {
      if ($(this).attr("r-map-item") === redItem) {
        $(this).addClass("is--active");
        // console.log("what happening");
      }
    });
  });
  
  // when clicking on back to img1
  $("#back-img").click(function () {
    //storing attribute to a variable
    var redItem = $(this).attr("order-num");
    //check if this pagination has same attribute as the slide
    $(".r-pagination-wrap .swiper-pagination-bullet").each(function () {
      if ($(this).attr("order-num") === redItem) {
        //then click  on ppagination
        $(this).trigger("click");
        // console.log($(this).attr("order-num"));
      }
    });
  });