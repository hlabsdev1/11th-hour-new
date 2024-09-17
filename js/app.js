//split text
let splitText;
function runSplit() {
  splitText = new SplitType("[text-split]", {
    types: "words, chars",
  });
}
runSplit();

// â€”â€”â€”â€”â€” Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    splitText.revert();
    runSplit();
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  //video attribute
  const loaderVidTest = document.querySelector(".r-loader-vid-test");
  const loaderButn = document.querySelector(".r-loader-play");
  loaderVidTest.playbackRate = 0.6;

  loaderButn.addEventListener("click", () => {
    loaderVidTest.play();
  });

  //hero loader ANIMATION
  //set element-
  gsap.set(".r-hero-button-wrap", {
    opacity: 0,
  });
  gsap.set(".r-h1.is-hero .char", {
    "--blur-elem": "6px",
    opacity: 0,
    y: "40px",
  });
  gsap.set(".r-text-17px.is-hero .char", {
    "--blur-elem": "6px",
    opacity: 0,
  });

  gsap.set("#lighthouse-text .char", { opacity: 0 });
  //loading animation
  const load_tl = gsap.timeline();

  //loader content fade in
  load_tl.to(".r-loader-content", {
    opacity: 1,
    duration: 0.4,
    delay: 0.2,
    onStart: () => {
      // $(".r-loader-play").click();
      loaderButn.click();
    },
  });

  //loader content fades after delay
  load_tl.to(
    ".r-loader-content",
    {
      opacity: 0,
      duration: 0.4,
      // delay: 0.8,
    },
    ">+=1"
  );

  //rotate loader vid when prev animation start
  load_tl.to(
    ".r-loader-embed",
    {
      rotationZ: 45,
      duration: 0.4,
      // delay: 0.8,
    },
    ">"
  );

  //loader fade out
  load_tl.to(
    ".r-loader-embed, .r-loader",
    {
      opacity: 0,
      duration: 0.4,
      // delay: 0.8,
      onComplete: () => {
        $(".r-loader").css("pointer-events", "none");
      },
    },
    ">"
  );

  //hero content fade in
  load_tl.to(".r-h1.is-hero .char", {
    opacity: 1,
    "--blur-elem": "0px",
    y: "0px",
    // duration: 1.5,
    delay: 0.1,
    ease: "sine.out",
    stagger: 0.08,
  });
  load_tl.to(".r-text-17px.is-hero .char", {
    opacity: 1,
    "--blur-elem": "0px",
    duration: 0.3,
    ease: "sine.out",
    stagger: {
      amount: 0.1,
      // from: start,
    },
  });
  load_tl.to(".r-hero-button-wrap", {
    opacity: 1,
    duration: 0.6,
    ease: "sine.out",
  });

  //on click animation
  $("#header-dive").on("click", () => {
    //remove no scroll from body
    $(".r-body").removeClass("r-no-scroll");
    //creating tl
    const headerTl = gsap.timeline();

    headerTl.to(".r-hero-content", {
      opacity: 0,
      duration: 0.4,
      delay: 0.1,
      onComplete: () => {
        $(".r-hero-content").css("pointer-events", "none");
      },
    });
    headerTl.to(
      ".header-sounds-bit",
      {
        opacity: 1,
        duration: 0.4,
        onComplete: () => {
          $(".header-sounds-bit").css("pointer-events", "auto");
        },
      },
      ">+=0.2"
    );
  });

  //Transitioning between hero and lighthouse;
  const light_tl = gsap.timeline();

  //clip path animation
  light_tl.to("#lighthouse-sec", {
    scrollTrigger: {
      trigger: ".r-lighthouse-trigger",
      start: "top top",
      end: "center center",
      scrub: 1.2,
      //   markers: true,
    },
    "--percentage": "100%",
  });

  //sailing text animation
  gsap.to("#lighthouse-text .char", {
    opacity: 1,
    "--blur-elem": "0px",
    stagger: {
      amount: 0.8,
    },
    scrollTrigger: {
      trigger: ".r-lighthouse-trigger",
      start: "80%",
      end: "+=20%",
      scrub: 1.2,
    },
  });

  //Transitioning between sailing bg and content;
  const sailingTransition = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-sailing-trigger",
      start: "top top",
      end: "10%",
      scrub: 1.2,
      // markers: true,
    },
  });

  sailingTransition.to(".hero-and-lighthouse-sec-wrap", {
    opacity: 0,
  });

  //For user pointing
  const pointer_tl = gsap.timeline();

  pointer_tl.to(".r-sailing-img-sec", {
    scrollTrigger: {
      trigger: ".r-sailing-trigger",
      start: "20% top",
      end: "bottom bottom",
      toggleActions: "play none reverse none",
      onEnter: () => {
        $(".r-sailing-img-sec").css("pointer-events", "auto");
      },
      onLeave: () => {
        $(".r-sailing-img-sec").css("pointer-events", "none");
      },
      onEnterBack: () => {
        $(".r-sailing-img-sec").css("pointer-events", "auto");
      },
      onLeaveBack: () => {
        $(".r-sailing-img-sec").css("pointer-events", "none");
      },
    },
  });

  // //sailing text animation
  gsap.set("#sailing-bg-h2 .char", { opacity: 0, "--blur-elem": "5px" });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".r-sailing-trigger",
        start: "12% top",
        end: "25% top",
        scrub: 1.2,
      },
    })
    .to("#sailing-bg-h2 .char", {
      opacity: 1,
      "--blur-elem": "0px",
      stagger: 0.02,
    });

  //underwater section animation
  gsap.set(
    ".subtitle .char, .r-uw-item-content .r-h2 .char, [underwater-para] .char, .r-uw-top-content .r-h2 .char",
    {
      opacity: 0,
      "--blur-elem": "6px",
    }
  );

  //top item
  const topItem = document.querySelectorAll(".r-uw-top-content");

  topItem.forEach((item) => {
    const titleChars = item.querySelectorAll(".r-h2 .char");
    const subTitleChars = item.querySelectorAll(".subtitle .char");
    // console.log(subTitleChars);

    let tl_item = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "center center",
        scrub: 1.2,
        // markers: true,
      },
    });
    tl_item.to(subTitleChars, {
      opacity: 1,
      "--blur-elem": "0px",
      duration: 0.2,
      ease: "sine.out",
      stagger: {
        amount: 0.2,
        // from: start,
      },
    });
    tl_item.to(titleChars, {
      opacity: 1,
      "--blur-elem": "0px",
      duration: 0.8,
      ease: "sine.out",
      stagger: {
        amount: 1,
        // from: start,
      },
    });
  });

  //bottom items
  const underItem = document.querySelectorAll(".r-uw-item-content");

  underItem.forEach((item) => {
    const titleChars = item.querySelectorAll(".r-h2 .char");
    const subTitleChars = item.querySelectorAll(".subtitle .char");
    const bodyChars = item.querySelectorAll("[underwater-para] .char");
    const buttons = item.querySelectorAll(".r-uw-audio-butn-wrap");
    // console.log(subTitleChars);

    let tl_item = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "center center",
        scrub: 1.2,
        // markers: true,
      },
    });

    tl_item.to(subTitleChars, {
      opacity: 1,
      "--blur-elem": "0px",
      duration: 0.2,
      ease: "sine.out",
      stagger: {
        amount: 0.2,
        // from: start,
      },
    });

    tl_item.to(titleChars, {
      opacity: 1,
      "--blur-elem": "0px",
      duration: 0.8,
      ease: "sine.out",
      stagger: {
        amount: 1,
        // from: start,
      },
    });

    tl_item.to(bodyChars, {
      opacity: 1,
      "--blur-elem": "0px",
      duration: 0.8,
      ease: "sine.out",
      stagger: {
        amount: 1,
        // from: start,
      },
    });

    tl_item.from(buttons, {
      opacity: 0,
    });
  });

  //media queries
  const mm = window.matchMedia("(min-width: 600px)");
  function handlemmChange(event) {
    if (event.matches) {
      //desktop version
      console.log("is desktop");
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".r-sailing-trigger",
            start: "18% top",
            end: "24% top",
            scrub: 1.2,
          },
        })
        .to("#sailing-bg-h2", { fontSize: "6.75rem" });
    } else {
      //mobile version
      console.log("iss mobile");
      const bgScene = document.querySelector(".r-jellyfish-scene"); //.r-scenes
      bgScene.remove();
      $(".r-uw-hover-text-wrap").each(function (index) {
        $(this).find(".r-text-13px").html("click to see more");
      });
    }
  }

  // Register the event listener
  mm.addListener(handlemmChange);

  // Initial check
  handlemmChange(mm);
});