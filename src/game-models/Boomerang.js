// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor(position) {
    this.skin = "🌀";
    this.position = position;
  }

  fly() {
    let right = setInterval(() => {
      this.moveRight();
    }, 100);

    setTimeout(() => {
      {
        clearInterval(right), this.moveLeft();
      }
    }, 1000);
  }

  moveLeft() {
    // Идём влево.
    let left = setInterval(() => {
      this.position -= 1;
    }, 100);
    setTimeout(() => {
      clearInterval(left);
    }, 1000);
  }
  moveRight() {
    // Идём вправо.

    this.position += 1;
  }
  die() {
    this.position = "?";
  }
}

module.exports = Boomerang;
