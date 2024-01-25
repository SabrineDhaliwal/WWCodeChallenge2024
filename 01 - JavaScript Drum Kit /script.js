console.log("hello World");

  function playSound(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        if (!audio) return; //stops & exits function

        audio.currentTime = 0;
        audio.play();
        key.classList.add("playing");
      }
      
      function removeTransition(e) {
        if (e.propertyName !== "transform") return; //will skip it if not a transform property.
        console.log(this);
        this.classList.remove("playing");
      }

      const keys = document.querySelectorAll(".key");
      keys.forEach((key) =>
      key.addEventListener("transitionend", removeTransition)
      );

      window.addEventListener("keydown", playSound);
