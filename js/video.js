document.addEventListener("DOMContentLoaded", () => {
    // Ensure Plyr initializes correctly with proper controls
    const player = new Plyr("#player", {
      controls: [
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "airplay",
        "settings",
        "pip",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed"],
      tooltips: { controls: false, seek: true },
      clickToPlay: true,
      hideControls: false, // Optional: set to false if you want to show controls
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
      },
    });
  
    let hasStarted = false;
  
    // Function to update the body class based on video state
    function updateBodyClass(state) {
      document.body.classList.remove(
        "video-playing",
        "video-paused",
        "video-ended",
        "video-never-started"
      );
      document.body.classList.add(`video-${state}`);
    }
  
    // Event listeners for the player's state changes
    player.on("play", () => {
      hasStarted = true;
      updateBodyClass("playing");
      $(".r-mission-vid-hold").addClass("is--show");
    });
  
    player.on("pause", () => {
      if (hasStarted) {
        updateBodyClass("paused");
        $(".r-mission-vid-hold").removeClass("is--show");
      }
    });
  
    player.on("ended", () => {
      updateBodyClass("ended");
    });
  
    // Get the play button and close button elements
    const playButton = document.getElementById("r-m-playButton");
    const closeButton = document.getElementById("r-m-close-button");
  
    // Check if play button exists before adding the event listener
    if (playButton) {
      playButton.addEventListener("click", () => {
        if (!hasStarted) {
          player
            .play()
            .then(() => {
              updateBodyClass("playing");
            })
            .catch((error) => {
              console.error("Error playing video:", error);
            });
        } else {
          player.play();
        }
      });
    } else {
      console.error("Play button not found in the DOM.");
    }
  
    // Check if close button exists before adding the event listener
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        player.stop();
        hasStarted = false;
        updateBodyClass("never-started");
      });
    } else {
      console.error("Close button not found in the DOM.");
    }
  
    // Initial state when the video has never been started
    updateBodyClass("never-started");
  
    // console.log($(".test-embed-vid"));
  });
  