(function() {
  var audioContext = new AudioContext();
  var gainNode = audioContext.createGain();
  var oscillator = audioContext.createOscillator();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = 0;
  oscillator.start();

  Leap.loop({ enableGestures: true }, function(frame) {
    if(frame.fingers.length > 0 && typeof frame.fingers[1] != 'undefined') {

      var fingerPositionX = frame.fingers[1].dipPosition[0] + 300;
      var frequency =Math.min(Math.max(fingerPositionX, 0), 600);
      frequency = Math.round(frequency * 2 + 30);

      var fingerPositionY = frame.fingers[1].dipPosition[1] - 100;
      fingerPositionY = Math.min(Math.max(fingerPositionY, 0), 400);

      var volume = Math.round(fingerPositionY / 4) / 100;

      console.log('Frequency:', frequency, 'Hz', 'Volume:', volume);
      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;
    } else {
      gainNode.gain.value = 0;
    }
  });
})();
