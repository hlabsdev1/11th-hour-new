//initially
$(".r-mute-butn").addClass("is--muted");
$(".r-audio-icon-wrap").css("display", "none");

//Header Sound Code
//Header Sound Code
//Header Sound Code
//Header Sound Code

// Constants
let heroAudio = document.querySelector(".header-sound");
let lyricsContainer = document.querySelector(".header-lyrics");
const heroPauseButn = document.querySelector("#hero-pause-butn");
let IntroStart = document.querySelector("#header-dive");
let lyrics = [];
let lyricTimeouts = [];
let startTime = 0;
let elapsedTime = 0;
let currentLyricIndex = 0;

// Initialize event listeners
IntroStart.addEventListener("click", () => {
  // heroAudio.play();
  // heroAudio.currentTime = elapsedTime / 1000; // Resume from where it was paused
  // resumeLyrics();
  heroAudio.volume = 0;
  headerFadeIn(heroAudio);
  $(".r-mute-butn").removeClass("is--muted");
  $(".r-mute-butn").find(".r-audio-text").html("Sound on");
  $(".r-audio-icon-wrap").css("display", "block");
});

// Toggle click event
heroPauseButn.addEventListener("click", () => {
  // if (heroAudio.paused) {
  //   heroAudio.play();
  //   heroAudio.currentTime = elapsedTime / 1000; // Resume from where it was paused
  //   resumeLyrics();
  // } else {
  //   heroAudio.pause();
  //   pauseLyrics();
  // }
  headerFadeOut(heroAudio);
});

heroAudio.addEventListener("playing", start);
heroAudio.addEventListener("pause", pauseLyrics);

// Listen for when the audio finishes
heroAudio.addEventListener("ended", () => {
  resetAudioAndLyrics();
});

async function loadFile(fileName) {
  try {
    let response = await fetch(fileName);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.text();
    return data.trim().split("\n"); // Break lines to array
  } catch (error) {
    console.error("Error loading file:", error);
    return [];
  }
}

// Parse a single line of the lyrics file
function parseLyricLine(line) {
  try {
    let timeMatch = line.match(/\[(\d{2}):(\d{2}\.\d{2})\]/);
    if (!timeMatch) return null;

    let minute = parseInt(timeMatch[1]);
    let second = parseFloat(timeMatch[2]);
    if (isNaN(minute) || isNaN(second)) return null;

    let text = line.split("]").pop().trim();
    return { time: (minute * 60 + second) * 1000, text };
  } catch (error) {
    console.error("Error parsing line:", line, error);
    return null;
  }
}

// Start syncing lyrics
async function start() {
  lyrics = await loadFile(
    "https://11th-hr-test1.netlify.app/lyrics-added/header-lyric.lrc"
  ).then((lines) => lines.map(parseLyricLine).filter((line) => line !== null));

  //new code
  // Set initial lyric as the first one
  // currentLyricIndex = 0;
  // displayLyrics(currentLyricIndex);

  startTime = Date.now() - elapsedTime;
  updateLyrics();
}

// Update lyrics
function updateLyrics() {
  lyrics.forEach((line, index) => {
    if (index >= currentLyricIndex) {
      let timeout = setTimeout(() => {
        if (!heroAudio.paused) {
          currentLyricIndex = index;
          displayLyrics(currentLyricIndex);
        }
      }, line.time - elapsedTime);
      lyricTimeouts.push(timeout);
    }
  });
}

// Pause lyrics
function pauseLyrics() {
  elapsedTime = Date.now() - startTime; // Calculate elapsed time
  clearLyricTimeouts(); // Clear all timeouts
}

// Resume lyrics
function resumeLyrics() {
  startTime = Date.now() - elapsedTime;
  updateLyrics();
}

// Clear lyric timeouts
function clearLyricTimeouts() {
  lyricTimeouts.forEach((timeout) => clearTimeout(timeout));
  lyricTimeouts = []; // Reset the timeouts array
}

// Display lyrics with vertical scrolling effect
function displayLyrics(currentIndex) {
  lyricsContainer.innerHTML = ""; // Clear the container

  lyrics.forEach((line, index) => {
    let div = document.createElement("div");
    div.innerText = line.text;
    div.classList.add("lyric-line");
    if (index === currentIndex) {
      div.classList.add("current");
    }
    lyricsContainer.appendChild(div);
  });

  let currentLyric = lyricsContainer.querySelector(".current");
  if (currentLyric) {
    gsap.to(lyricsContainer, {
      scrollTo: {
        y: currentLyric,
        offsetY:
          lyricsContainer.offsetHeight / 2 - currentLyric.offsetHeight / 2,
      },
      duration: 1,
      ease: "power2.out",
    });
  }
}

// Reset audio and lyrics when audio finishes
function resetAudioAndLyrics() {
  elapsedTime = 0;
  currentLyricIndex = 0;
  clearLyricTimeouts(); // Clear all timeouts

  // Reset the audio and start again
  heroAudio.currentTime = 0;
  heroAudio.volume = 0;
  headerFadeIn(heroAudio);
  // heroAudio.play();

  // Reset lyrics and start from the beginning
  start();
}

//Header Sound Code End
//Header Sound Code End
//Header Sound Code End
//Header Sound Code End

//underwater sound start
//underwater sound start
//underwater sound start

$("[underwater-audio-butn]").each(function (index) {
  let button = $(this);
  let url = $(this).find(".r-song-url").text();
  let song = new Howl({
    src: [url],
    volume: 0.3,
    onend: function () {
      button.removeClass("is--playing");
    },
  });
  $(this).on("click", function () {
    $("[underwater-audio-butn].is--playing").not($(this)).click();
    $(this).toggleClass("is--playing");
    if ($(this).hasClass("is--playing")) {
      song.play();
      bgAudioDown(bgSound);
    } else {
      song.stop();
      bgAudioUp(bgSound);
    }
  });

  //fade when scrolling
  //get parent
  const parent = $(this).closest(".r-uw-item-content");
  // scroll fading sound
  const underwaterSound_tl = gsap.timeline({
    scrollTrigger: {
      trigger: parent,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => {
        song.stop();
        $(this).removeClass("is--playing");
        bgAudioUp(bgSound);
      },
      onLeaveBack: () => {
        song.stop();
        $(this).toggleClass("is--playing");
        bgAudioUp(bgSound);
      },
    },
  });
});

//background sound-
const bgAudioUrl = document.querySelector(".r-bg-audio").textContent;
let bgSound = new Howl({
  src: [bgAudioUrl],
  volume: 0,
  loop: true,
});

//fading sound variables
let soundDuration = 500;

function bgAudioUp(audio) {
  if (audio.volume() < 1) {
    audio.fade(audio.volume(), 0.4, soundDuration);
  }
  // Check if the music is paused, and if so, play it
  // audio.play();
  if (!audio.playing()) { //audio.pause()
    audio.play();
  }
}

function bgAudioDown(audio) {
  // Check if the volume is greater than 0 before starting the fade out
  if (audio.volume() > 0) {
    // Gradually decrease the volume to 0 over 1200 milliseconds (1.2 seconds)
    audio.fade(audio.volume(), 0, soundDuration);

    // Set a timeout to pause the audio once the fade out is complete
    setTimeout(() => {
      if (audio.volume() === 0) {
        audio.pause();
      }
    }, soundDuration); // 1200 milliseconds corresponds to the fade out duration
  }
  console.log("bg paused");
}

//global mute button
$(".r-mute-butn").on("click", function () {
  $(this).toggleClass("is--muted");
  if ($(this).hasClass("is--muted")) {
    Howler.mute(true);
    heroAudio.muted = true;
    //changing inner text
    $(this).find(".r-audio-text").html("Sound off");
  } else {
    Howler.mute(false);
    heroAudio.muted = false;
    $(this).find(".r-audio-text").html("Sound on");
  }
});

// scroll fading sound
const fade_tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".r-hero-trigger",
    start: "top center",
    end: "bottom center",
    onLeave: () => {
      headerFadeOut(heroAudio);
      bgAudioUp(bgSound);
      // console.log("fading out");
    },
    onEnterBack: () => {
      headerFadeIn(heroAudio);
      bgAudioDown(bgSound);
      // console.log("fading in");
    },
  },
});

// Function to gradually decrease volume
function headerFadeOut(audio) {
  const duration = 500; // Duration of fade-out effect in milliseconds
  const interval = 2; // Interval for volume decrease

  let targetVolume = 0; // Target volume (mute)
  let currentVolume = audio.volume; // Current volume
  let volumeStep = (currentVolume - targetVolume) / (duration / interval); // Volume decrease per interval

  // Set volume decrementally
  const decreaseVolume = () => {
    if (currentVolume > targetVolume) {
      currentVolume -= volumeStep;
      if (currentVolume < targetVolume) {
        currentVolume = targetVolume;
        audio.pause();
      }
      audio.volume = currentVolume;
      setTimeout(decreaseVolume, interval);
    }
  };

  decreaseVolume(); // Start decreasing volume gradually
}

function headerFadeIn(audio) {
  const duration = 500; // Duration of fade-in effect in milliseconds
  const interval = 2; // Interval for volume increase

  let targetVolume = 1; // Target volume (max volume)
  let currentVolume = audio.volume; // Current volume
  let volumeStep = (targetVolume - currentVolume) / (duration / interval); // Volume increase per interval

  // Function to incrementally increase the volume
  const increaseVolume = () => {
    if (currentVolume < targetVolume) {
      currentVolume += volumeStep;
      if (currentVolume > targetVolume) {
        currentVolume = targetVolume;
      }
      audio.volume = currentVolume;
      setTimeout(increaseVolume, interval);
    }
  };

  // Play audio and start increasing volume
  if (audio.paused) {
    audio.play();
    audio.currentTime = elapsedTime / 1000; // Resume from where it was paused
  }
  increaseVolume();
}