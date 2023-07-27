// Alien ship class
class AlienShip {
    constructor() {
      this.hull = getRandomNumber(3, 6);
      this.firepower = getRandomNumber(2, 4);
      this.accuracy = getRandomNumber(0.6, 0.8);
    }
  
    isHit() {
      return Math.random() < this.accuracy;
    }
  }
  
  // USS Assembly (player's ship)
  const ussAssembly = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
    isHit() {
      return Math.random() < this.accuracy;
    }
  };
  
  // Function to get a random number within a range
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Game logic functions
  function attack() {
    if (alienShips.length === 0) {
      window.alert('Congratulations! You have destroyed all alien ships!');
      return;
    }
  
    const alienShip = alienShips[0];
  
    // Player attacks alien ship
    if (ussAssembly.isHit()) {
      alienShip.hull -= ussAssembly.firepower;
      if (alienShip.hull <= 0) {
        alienShips.shift(); // Remove destroyed alien ship
        document.getElementById('result').innerText = 'You destroyed the alien ship!';
      } else {
        // Alien ship retaliates
        if (alienShip.isHit()) {
          ussAssembly.hull -= alienShip.firepower;
          if (ussAssembly.hull <= 0) {
            document.getElementById('result').innerText = 'Your ship has been destroyed! Game Over!';
          } else {
            document.getElementById('result').innerText = 'Your ship was hit, but you can attack again.';
          }
        } else {
          document.getElementById('result').innerText = 'You attacked, but the alien ship dodged the attack!';
        }
      }
    } else {
      // Player missed the attack
      // Alien ship retaliates
      if (alienShip.isHit()) {
        ussAssembly.hull -= alienShip.firepower;
        if (ussAssembly.hull <= 0) {
          document.getElementById('result').innerText = 'Your ship has been destroyed! Game Over!';
        } else {
          document.getElementById('result').innerText = 'Your attack missed, but the alien ship hit you. You can attack again.';
        }
      } else {
        document.getElementById('result').innerText = 'Your attack missed, and the alien ship missed too. You can attack again.';
      }
    }
  
    // Update the GUI after the attack
    updateGUI();
  }
  
  function retreat() {
    document.getElementById('result').innerText = 'You chose to retreat! Game Over!';
  }
  
  // Function to update the GUI with current ship details
  function updateGUI() {
    document.getElementById('uss-hull').innerText = ussAssembly.hull;
    document.getElementById('uss-firepower').innerText = ussAssembly.firepower;
    document.getElementById('uss-accuracy').innerText = ussAssembly.accuracy.toFixed(2);
  
    for (let i = 0; i < alienShips.length; i++) {
      const alienShip = alienShips[i];
      const shipElement = document.getElementById(`alien-ship-${i + 1}`);
      shipElement.querySelector(`#alien-hull-${i + 1}`).innerText = alienShip.hull;
      shipElement.querySelector(`#alien-firepower-${i + 1}`).innerText = alienShip.firepower;
      shipElement.querySelector(`#alien-accuracy-${i + 1}`).innerText = alienShip.accuracy.toFixed(2);
    }
  }
  
  // Initialize the game with six random alien ships
  const alienShips = [];
  for (let i = 0; i < 6; i++) {
    alienShips.push(new AlienShip());
  }
  
  // Update the GUI with initial ship details
  updateGUI();
  