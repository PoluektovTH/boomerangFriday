// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = "🌀";
    this.position = 1;
  }

  fly() {
    this.moveRight();

    setInterval(() => {
      this.moveLeft();
    }, 2000);
  }

  moveLeft() {
    // Идём влево.

    this.position -= 2;
  }
  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
  die() {
    this.position = "?";

    this.position = 0;
  }
}

module.exports = Boomerang;
