// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.count = 0;
    this.position = -1;
    this.trackPb = 1;
  }

  fly(pos, track) {
    this.trackPb = track;
    this.position = pos;
    const int = setInterval(() => {
      if (this.count < 10) this.moveRight();
      if (this.count >= 10) this.moveLeft();
      if (this.position === pos) {
        this.position = pos;
        this.count = 0;
        clearInterval(int);
      }
    }, 100);
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.position += 1;
    this.count += 1;
  }
}
module.exports = Boomerang;
