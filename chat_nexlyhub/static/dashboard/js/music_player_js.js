 var songRows = document.getElementsByClassName('music-play');
  var songElements = document.getElementsByClassName('song');
  var currentIndex = -1; // Index of the currently selected song
  var progressBar = document.getElementById('progress-bar');
  var currentTimeDisplay = document.getElementById('current-time');
  var totalTimeDisplay = document.getElementById('total-time');
  var progressBarContainer = document.getElementById('progress-bar-container');
  var gifImg = document.getElementById('gif_img');

  // Create an array to store the Howl instances for each song
  var songs = [];

  // Create Howl instances for each song
  for (var i = 0; i < songElements.length; i++) {
    var songElement = songElements[i];
    var songSrc = songElement.getAttribute('src');

    // Create the Howl instance
    var song = new Howl({
      src: [songSrc],
      html5: true,
      onend: function () {
        // Handle the end of the audio track
        console.log('Finished playing the sound.');
        songRows[currentIndex].classList.remove('playing');
        gifImg.style.opacity = '0';
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
      },
      onplay: function () {
        // Update the total time display
        totalTimeDisplay.textContent = formatTime(songs[currentIndex].duration());
      },
      onseek: function () {
        // Update the current time display when seeking
        currentTimeDisplay.textContent = formatTime(songs[currentIndex].seek());
      },
      onplayerror: function () {
        // Handle play error
        console.log('Error playing the sound.');
      }
    });

    // Store the song instance in the array
    songs.push(song);

    // Find the associated play button
    var playButton = songElement.parentElement.querySelector('.hwe__btn-play');

    // Add click event listener to each play button
    playButton.addEventListener('click', function () {
      var songIndex = Array.from(songElements).indexOf(this.parentElement.querySelector('.song'));
      playSong(songIndex);
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
      var trackName = this.closest('tr').querySelector('td:nth-child(2)').textContent;
      var producer = this.closest('tr').querySelector('td:nth-child(3)').textContent;
      document.getElementById('trackName').innerHTML = trackName;
      document.getElementById('producerName').innerHTML = producer;

    });
  }
progressBarContainer.addEventListener('click', seekSong);

// Function to handle seeking the song
function seekSong(event) {
  // Calculate the seek position based on the click event
  var progressBarWidth = progressBarContainer.offsetWidth;
  var clickPosition = event.clientX - progressBarContainer.getBoundingClientRect().left;
  var seekPosition = clickPosition / progressBarWidth;

  // Calculate the seek time in seconds
  var songDuration = songs[currentIndex].duration();
  var seekTime = songDuration * seekPosition;

  // Seek to the calculated position
  songs[currentIndex].seek(seekTime);
}

  // Function to play a selected song
  function playSong(index) {
    // Pause the current song if it's playing
    if (currentIndex !== -1) {
      songs[currentIndex].stop();
      songRows[currentIndex].classList.remove('playing');
      songRows[currentIndex].classList.add('pause');
    }

    // Update the currentIndex with the selected index
    currentIndex = index;

    // Play the selected song
    songs[currentIndex].play();
    songRows[currentIndex].classList.remove('pause');
    songRows[currentIndex].classList.add('playing');

    // Show the player controls
    playerControls.style.display = 'block';
    playerControls.style.display = 'block';
    setInterval(updateProgressBar, 1000);
  }

  // Format the time in HH:MM:SS format
  function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  // Update the progress bar based on the current time of the song
 function updateProgressBar() {
  if (currentIndex !== -1 && songs[currentIndex]) {
    var currentTime = songs[currentIndex].seek();
    var duration = songs[currentIndex].duration();
    var progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = progressPercentage + '%';
    currentTimeDisplay.textContent = formatTime(currentTime);
  }
}

  // Get the player controls
  var playerControls = document.getElementById('player-controls');
  var playButton = document.getElementById('play-button');
  var pauseButton = document.getElementById('pause-button');
  var previousButton = document.getElementById('previous-button');
  var nextButton = document.getElementById('next-button');
  var volumeSlider = document.getElementById('volume-slider');


  // Add event listeners to the controls
  playButton.addEventListener('click', function () {
    songs[currentIndex].play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    songRows[currentIndex].classList.add('playing');
    gifImg.style.opacity = '1';
  });

  pauseButton.addEventListener('click', function () {
    songs[currentIndex].pause();
    playButton.style.display = 'block';
    pauseButton.style.display = 'none';
    songRows[currentIndex].classList.remove('playing');
    gifImg.style.opacity = '0';

  });

  previousButton.addEventListener('click', function () {
    // Handle previous track functionality
    var prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = songElements.length - 1;
    }
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    playSong(prevIndex);
    var currentTableRow = document.querySelector('tr.music-play.playing');
    var trackName = currentTableRow.querySelector('td:nth-child(2)').textContent;
    var producer = currentTableRow.querySelector('td:nth-child(3)').textContent;
    document.getElementById('trackName').innerHTML = trackName;
    document.getElementById('producerName').innerHTML = producer;
  });

  nextButton.addEventListener('click', function () {
    // Handle next track functionality
    var nextIndex = currentIndex + 1;
    if (nextIndex >= songElements.length) {
      nextIndex = 0;
    }

    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    playSong(nextIndex);
    var currentTableRow = document.querySelector('tr.music-play.playing');
    var trackName = currentTableRow.querySelector('td:nth-child(2)').textContent;
    var producer = currentTableRow.querySelector('td:nth-child(3)').textContent;
    document.getElementById('trackName').innerHTML = trackName;
    document.getElementById('producerName').innerHTML = producer;
  });

  volumeSlider.addEventListener('input', function () {
    songs[currentIndex].volume(volumeSlider.value);
  });

setInterval(updateProgressBar, 1000);
