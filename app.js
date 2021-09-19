const timeInput = document.getElementById('time'),
 startButton = document.getElementById('start'),
 pauseButton = document.getElementById('pause'),
 resetButton = document.getElementById('reset'),
 timer = document.getElementById('timer'),
 audio = new Audio('https://proxy.notificationsounds.com/message-tones/sorted-397/download/file-sounds-1069-sorted.mp3')

var currentCountdownTimeMs,
 paused = false,
 interval

startButton.addEventListener('click', () => {
  if(timeInput.value.trim().length){
    changeButtonsState()
    currentCountdownTimeMs = timeInput.value * 60 * 1000
    interval = window.setInterval(() => {
      if(!paused){
        timer.innerText = msToTime(currentCountdownTimeMs)
        currentCountdownTimeMs-=100
        if(currentCountdownTimeMs<=0){
          clearInterval(interval)
          timer.innerText = '00:00:00.0'
          audio.play()
          changeButtonsState()
        }
      }
    }, 100)
  }
})

resetButton.addEventListener('click', () => {
  changeButtonsState()
  clearInterval(interval)
  paused = false
  timer.innerText = '00:00:00.0'
})

pauseButton.addEventListener('click', () => {
  paused = !paused
})

const changeButtonsState = () => {
  startButton.disabled = !startButton.disabled
  pauseButton.disabled = !pauseButton.disabled
  resetButton.disabled = !resetButton.disabled
}

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000)/100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}