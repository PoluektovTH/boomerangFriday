// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const keypress = require("keypress");
const Hero = require("./game-models/Hero");
const Enemy = require("./game-models/Enemy");
const View = require("./View");
const { runInteractiveConsole } = require("./keyboard");
const Boomerang = require("./game-models/Boomerang");
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    // this.boomerang = new Boomerang();
    this.track = [[], [], []];
    // keyboard.d = () => this.hero.moveRight();
    // keyboard.a = () => this.hero.moveLeft();
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    for (let i = 0; i < this.track.length; i++) {
      this.track = new Array(this.trackLength).fill(" ");
      this.track[this.hero.position] = this.hero.skin;
      this.track[this.enemy.position] = this.enemy.skin;
      this.track[this.hero.boomerang.position] = this.hero.boomerang.skin;
    }
  }

  check() {
    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
    if (
      this.hero.boomerang.position - 1 === this.enemy.position ||
      this.hero.boomerang.position + 1 === this.enemy.position ||
      this.hero.boomerang.position === this.enemy.position
    ) {
      this.enemy.die();
      this.hero.boomerang.die();
    }
    if (this.hero.boomerang.position < this.hero.position) {
      this.hero.boomerang.die();
    }
  }

  play() {
    runInteractiveConsole(this.hero);
    setInterval(() => {
      // Let's play!

      this.check();
      // this.boomerang.fly();
      this.enemy.moveLeft();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 200);
  }
}

module.exports = Game;
