// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!
class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.count = 0;
    this.position = 1;
  }

  fly() {
    this.moveRight();
    this.moveLeft();
  }z
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
