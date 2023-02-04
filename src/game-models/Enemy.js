// Враг.
class Enemy {
  constructor() {
    this.generateSkin();
    this.position = Math.floor(Math.random() * (60 - 50) + 50);
    this.trackPe = Math.floor(Math.random() * 3);
  }

  generateSkin() {
    const skins = [
      '👾',
      '💀',
      '👹',
      '👻',
      '👽',
      '👿',
      '💩',
      '🤡',
      '🤺',
      '🧛',
      '🧟',
      '🎃',
    ];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.generateSkin();
    this.position = Math.floor(Math.random() * (60 - 50) + 50);
    this.trackPe = Math.floor(Math.random() * 3);
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
