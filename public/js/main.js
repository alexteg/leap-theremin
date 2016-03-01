(function() {

  function limit(value, min, max) {
    if(value < min) {
      return min;
    }
    if(value > max) {
      return max;
    }
    return value;
  }

  var frameCount = 0;

  var audioContext = new AudioContext();
  var gainNode = audioContext.createGain();
  var oscillator = audioContext.createOscillator();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = 0;

  oscillator.start();

  // Setup Leap loop with frame callback function
  var controllerOptions = {enableGestures: true};

  Leap.loop(controllerOptions, function(frame) {
    if(frame.fingers.length > 0 && typeof frame.fingers[1] != 'undefined') {

      var fingerPositionX = frame.fingers[1].dipPosition[0];
      var frequency = limit(fingerPositionX + 300, 0, 600);
      frequency = Math.round(frequency * 2 + 30);

      var fingerPositionY = frame.fingers[1].dipPosition[1];
      fingerPositionY = limit(fingerPositionY, 0, 300);

      var volume = Math.round(fingerPositionY / 3) / 100;

      console.log(frequency, volume);

      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;
    } else {
      gainNode.gain.value = 0;
    }
    frameCount++;
  });
})();
