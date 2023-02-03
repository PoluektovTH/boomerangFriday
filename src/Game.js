// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const keypress = require("keypress");
const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
// const Boomerang = require('./game-models/Boomerang');
const View = require("./View");
const keyboard = require("./keyboard");
const Boomerang = require("./game-models/Boomerang");
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.boomerang = new Boomerang();
    this.track = [];
    keyboard.d = () => this.hero.moveRight();
    keyboard.a = () => this.hero.moveLeft();
    // keyboard.q = () => this.boomerang.fly();
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(" ");
    this.track[this.hero.position] = this.hero.skin;
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
    if (
      this.boomerang.position - 1 === this.enemy.position ||
      this.boomerang.position + 1 === this.enemy.position ||
      this.boomerang.position === this.enemy.position
    ) {
      this.enemy.die();
      this.boomerang.die();
    }
    if (this.boomerang.position === this.hero.position) {
      this.boomerang.fly();
    }
  }

  play() {
    setInterval(() => {
      // Let's play!
      keyboard;
      this.check();
      this.boomerang.fly();
      this.enemy.moveLeft();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 200);
  }
}

module.exports = Game;
