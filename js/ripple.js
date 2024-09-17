//using unload function to scroll to top
$(window).on("unload", function () {
    $(window).scrollTop(0);
  });
  
  //RIPPLE EFFECT FOR HEADER
  $(".r-hero-bg-wrap").ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  });
  
  $("#r-hero-bubble").ripples({
    resolution: 512,
    dropRadius: 20,
    perturbance: 0.04,
  });
  
  //show side-nav-sticky when click on hero button
  gsap.set(".side-nav-sticky", { opacity: 0 });
  
  $("#header-dive").on("click", function () {
    gsap.to(".side-nav-sticky", { opacity: 1, duration: 0.3 });
  });
  
  //CLIP PATH ANIMATION FOR UNDERWATER SECTION
  const vids = document.querySelectorAll(".r-uw-vids");
  
  vids.forEach((vid) => {
    const overlay = vid.querySelector(".r-uw-vid.is--ab");
    const layer = vid.querySelector(".r-uw-vid-layer");
    vid.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const rect = vid.getBoundingClientRect();
      const x = Math.round(((clientX - rect.left) / vid.offsetWidth) * 100);
      const y = Math.round(((clientY - rect.top) / vid.offsetHeight) * 100);
  
      // console.log(`x: ${x}%, y: ${y}%`);
  
      gsap.to(overlay, {
        "--x": `${x}%`,
        "--y": `${y}%`,
        duration: 0.3,
        ease: "sine.out",
      });
    });
  
    vid.addEventListener("mouseover", () => {
      overlay.classList.toggle("is--active");
      layer.style.opacity = "0.7";
    });
  
    vid.addEventListener("mouseout", () => {
      overlay.classList.toggle("is--active");
      layer.style.opacity = "0.0";
    });
  });
  
  //all items that need to be recalculate when resizing
  //HORIZONTAL GSAP MOVE ANIMATION
  let scrollContainer;
  //HORIZONTAL LINE WIDTH DEFINING BASED ON CONTAINER ITEMS
  let missionMiddle;
  let missionLastSec;
  let missionTotalWidth;
  let moveContainer;
  function resizingItems() {
    //horizontal scroll
    scrollContainer = document.querySelector(".r-mission-track");
    //HORIZONTAL LINE WIDTH DEFINING BASED ON CONTAINER ITEMS
    missionMiddle = document.querySelector("#mission-2nd-group");
    missionLastSec = missionMiddle.querySelector(".r-mission-map");
    missionTotalWidth =
      missionMiddle.offsetWidth - missionLastSec.offsetWidth + 40;
    // console.log("updated");
    // console.log(missionTotalWidth);
    //total moveContainer
    moveContainer = scrollContainer.offsetWidth - window.innerWidth;
    // console.log(moveContainer);
  }
  
  resizingItems();
  
  // window.addEventListener("resize", resizingItems);
  window.addEventListener("resize", () => {
    resizingItems();
  });
  
  // horizontal section with animation
  // horizontal section with animation
  // horizontal section with animation
  let horzTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-mission-trigger",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      // markup: true,
    },
  });
  
  horzTl.to(scrollContainer, {
    ease: "none",
    x: () => -moveContainer,
    // x: () => -(moveContainer.offsetWidth - window.innerWidth) + 'px',
  });
  
  document.getElementById("r-mission-line-wrap").style.width =
    missionTotalWidth + "px";
  
  gsap.set(".r-mission-line", { width: "0%" });
  
  // // child ANIMATION
  // // gray section
  // gsap.to(".r-mission-line", {
  //   width: "100%",
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: ".r-mission-item.is--2nd",
  //     containerAnimation: horzTl,
  //     start: "left 40%",
  //     end: "96% right",
  //     scrub: true,
  //     markers: true,
  //   },
  // });
  
  //media queries
  const rm = window.matchMedia("(min-width: 600px)");
  function handlemmChange(event) {
    if (event.matches) {
      //desktop version
      console.log("is desktop");
      //line-animation
      gsap.to(".r-mission-line", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".r-mission-item.is--2nd",
          containerAnimation: horzTl,
          start: "left 40%",
          end: "96% right",
          scrub: true,
          markers: true,
        },
      });
    } else {
      //mobile version
      console.log("iss mobile");
      //line-animation
      gsap.to(".r-mission-line", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".r-mission-item.is--2nd",
          containerAnimation: horzTl,
          start: "left 30%",
          end: "85% right",
          scrub: true,
          markers: true,
        },
      });
    }
  }
  
  // Register the event listener
  rm.addListener(handlemmChange);
  
  // Initial check
  handlemmChange(rm);
  
  //stats graph animation
  const statsVid = document.querySelector("#stats-vid");
  
  statsVid.pause();
  
  //gsap set
  gsap.set("#stats1, #stats2, .r-mission-line-wrap", { opacity: 0 });
  gsap.set(
    "[m_tl1] .heading-h1 .char, [m_tl1] .r-text-17px .char, [m_tl1] .r-text-13px .char",
    {
      opacity: 0,
      "--blur-elem": 10,
    }
  );
  gsap.set(".r-mission-vid-wrap", { opacity: 0, x: "2rem" });
  gsap.set(
    "[m_tl4] .heading-h1 .char, [m_tl4] .r-text-17px .char, [m_tl4] .r-text-13px .char",
    {
      opacity: 0,
      "--blur-elem": 10,
    }
  );
  gsap.set(
    ".r-m-line-pin-wrap, .r-m-line-content.is-end, .r-m-map-content-bottom, #r-action-button, .r-action-img-parent",
    { opacity: 0 }
  );
  
  gsap.set("[m_tl5] .heading-h1 .char, [m_tl5] .r-text-17px .char", {
    opacity: 0,
    "--blur-elem": 10,
  });
  
  gsap.set("[m_tl6] .heading-h1 .char, [m_tl6] .r-text-17px .char", {
    opacity: 0,
    "--blur-elem": 10,
  });
  
  gsap.set(".r-m-awards-content-bottom, .r-m-awares-img-wrap", {
    opacity: 0,
  });
  
  gsap.set(".r-mission-full-img", { xPercent: 0 });
  
  gsap.to(".r-mission-bg-transition", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".r-uw-bottom-vid-wrap",
      start: "30% top",
      end: "bottom bottom",
      scrub: true,
    },
  });
  
  //r-mission content animation
  let m_tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-mission-trigger",
      start: "top 80%",
      end: "top top",
      scrub: true,
    },
    defaults: {
      duration: 0.8,
    },
  });
  
  m_tl1.to(
    "[m_tl1] .heading-h1 .char",
    {
      opacity: 1,
      "--blur-elem": 0,
      stagger: {
        amount: 0.2,
      },
    },
    "<+=1"
  );
  
  m_tl1.to("[m_tl1] .r-text-17px .char, [m_tl1] .r-text-13px .char", {
    opacity: 1,
    "--blur-elem": 0,
    duration: 1.2,
    stagger: {
      amount: 0.6,
    },
  });
  
  m_tl1.to(".r-mission-vid-wrap", {
    opacity: 1,
    x: "0rem",
  });
  
  m_tl1.to(
    ".r-mission-line-wrap",
    {
      opacity: 1,
    },
    "<"
  );
  
  //r-mission-stats
  let m_tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-mission-graph",
      start: "left right",
      end: "left 60%",
      containerAnimation: horzTl,
      toggleActions: "none play none reverse",
      onLeave: () => {
        if (statsVid.paused) {
          statsVid.play();
        }
      },
    },
  });
  
  m_tl3.to("#stats1", {
    opacity: 1,
    duration: 0.6,
    "--blur": "0px",
  });
  
  m_tl3.to("#stats2", {
    opacity: 1,
    duration: 0.6,
    "--blur": "0px",
  });
  
  //r-mission-map
  let m_tl4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-m-map-content",
      start: "left right",
      end: "left 80%",
      containerAnimation: horzTl,
      toggleActions: "none play none reverse",
    },
    // defaults: {
    //   duration: 0.8,
    // },
  });
  
  m_tl4.to("[m_tl4] .heading-h1 .char", {
    opacity: 1,
    "--blur-elem": 0,
    stagger: 0.03,
  });
  
  m_tl4.to("[m_tl4] .r-text-17px .char", {
    opacity: 1,
    "--blur-elem": 0,
    stagger: 0.002,
  });
  
  m_tl4.to("[m_tl4] .r-text-13px .char", {
    opacity: 1,
    "--blur-elem": 0,
    stagger: 0.002,
  });
  
  m_tl4.to(
    ".r-m-line-pin-wrap, .r-m-line-content.is-end, .r-m-map-content-bottom",
    { opacity: 1, stagger: 0.1 }
  );
  
  //r-mission-awwwards
  let m_tl5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-mission-awards",
      start: "left right",
      end: "left 80%",
      containerAnimation: horzTl,
      toggleActions: "none play none reverse",
    },
  });
  
  m_tl5.to("[m_tl5] .heading-h1 .char, [m_tl5] .r-text-17px .char", {
    opacity: 1,
    "--blur-elem": 0,
    stagger: {
      amount: 0.2,
    },
  });
  
  m_tl5.to(".r-m-awards-content-bottom, .r-m-awares-img-wrap", {
    opacity: 1,
    stagger: 0.2,
  });
  
  //r-mission-awwwards
  let m_tl6 = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-action-sec",
      start: "left right",
      end: "left 80%",
      containerAnimation: horzTl,
      toggleActions: "none play none reverse",
    },
  });
  
  m_tl6.to("[m_tl6] .heading-h1 .char, [m_tl6] .r-text-17px .char", {
    opacity: 1,
    "--blur-elem": 0,
    stagger: {
      amount: 0.2,
    },
  });
  
  m_tl6.to("#r-action-button, .r-action-img-parent", {
    opacity: 1,
    stagger: 0.2,
  });
  
  //image column
  let r_imgtl = gsap.timeline({
    scrollTrigger: {
      trigger: ".r-mission-full-img-wrap",
      start: "left right",
      end: "right left",
      containerAnimation: horzTl,
      scrub: 1,
    },
  });
  r_imgtl.to(".r-mission-full-img", { xPercent: -15 });
  
  //horizontal players
  const players = Array.from(document.querySelectorAll(".plyr__video-embed")).map(
    (p) => new Plyr(p)
  );
  
  //Horizontal Promo section
  //Horizontal Promo section
  //Horizontal Promo section
  //when clicking on each button
  $(".r-promo-butn").click(function () {
    //storing attribute to a variable
    var redItem = $(this).attr("promo-trigger");
    //check if this class has same attribute as the button
    $(".r-promo-link").each(function () {
      if ($(this).attr("promo-trigger") === redItem) {
        //then click  on tab link
        $(this).trigger("click");
      }
    });
  });
  
  $(".r-promo-butn").on("mouseenter", function () {
    $(this).siblings(".r-promo-butn").css("--r-promo", "4px");
  });
  
  $(".r-promo-butn").on("mouseleave", function () {
    $(this).siblings(".r-promo-butn").css("--r-promo", "0px");
  });
  
  //png sequence
  //png sequence
  const canvas = document.getElementById("hero-lightpass");
  const context = canvas.getContext("2d");
  
  // Set initial canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Update canvas size on window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render(); // Re-render the current frame after resizing
  });
  
  const frameCount = 248;
  
  const currentFrame = (index) =>
    `https://11th-hr-test1.netlify.app/png-sequence/IMG_${(index + 1)
      .toString()
      .padStart(3, "0")}.webp`;
  
  const images = [];
  const airpods = {
    frame: 0,
  };
  
  // Preload all images
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
  }
  
  // Render the first image when it loads
  images[0].onload = render;
  
  // GSAP animation tied to scroll
  gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none", // Ensure linear interpolation between frames
    scrollTrigger: {
      scrub: 0.5,
      trigger: ".r-lighthouse-trigger", //.r-lighthouse-trigger
      start: "top top",
      end: "bottom bottom",
    },
    onUpdate: render, // Render on each animation update
  });
  
  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    // Ensure the image fits the canvas size while maintaining aspect ratio
    const img = images[airpods.frame];
    const aspectRatio = img.width / img.height;
    let drawWidth, drawHeight, offsetX, offsetY;
  
    if (canvas.width / canvas.height > aspectRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / aspectRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * aspectRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
  
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }