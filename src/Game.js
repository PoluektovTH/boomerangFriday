// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const fs = require('fs');
const keyboard = require('./keyboard');
const { EOL } = require('os');
let score = 0;
// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.boomerang = new Boomerang();
    this.hero = new Hero(); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.enemy1 = new Enemy();
    this.enemy2 = new Enemy();
    this.view = new View();
    this.track = [];
    this.track1 = [];
    this.track2 = [];
    this.field = [];
    keyboard.a = () => this.hero.moveLeft();
    keyboard.d = () => this.hero.moveRight();
    keyboard.w = () => this.hero.moveUp();
    keyboard.s = () => this.hero.moveDown();
    // keyboard.q = () => this.boomerang.fly();
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track1 = new Array(this.trackLength).fill(' ');
    this.track2 = new Array(this.trackLength).fill(' ');
    this.field = [this.track1, this.track, this.track2];
    // this.track[this.enemy.position] = this.enemy.skin;
    // this.track[this.boomerang.position] = this.boomerang.skin;
    // this.track1[this.enemy1.position] = this.enemy1.skin;
    // this.track2[this.enemy2.position] = this.enemy2.skin;
    this.field[this.hero.trackP][this.hero.position] = this.hero.skin;
    this.field[this.enemy1.trackPe][this.enemy1.position] = this.enemy1.skin;
    this.field[this.enemy.trackPe][this.enemy.position] = this.enemy.skin;
    this.field[this.enemy2.trackPe][this.enemy2.position] = this.enemy2.skin;
    this.field[this.boomerang.trackPb][this.boomerang.position] =
      this.boomerang.skin;
  }

  check(name) {
    if (this.hero.position === this.enemy.position) {
      fs.appendFileSync(`${__dirname}/scores/${name}`, `${score}${EOL}`);
      this.hero.die();
    }
    if (
      this.enemy.position === this.boomerang.position ||
      this.boomerang.position - 1 === this.enemy.position ||
      this.boomerang.position + 1 === this.enemy.position ||
      this.enemy.position === 0
    ) {
      score += 100;
      this.enemy.die();
    }
    if (
      this.enemy1.position === this.boomerang.position ||
      this.boomerang.position - 1 === this.enemy1.position ||
      this.boomerang.position + 1 === this.enemy1.position ||
      this.enemy1.position === 0
    ) {
      score += 100;
      this.enemy1.die();
    }
    if (
      this.enemy2.position === this.boomerang.position ||
      this.boomerang.position - 1 === this.enemy2.position ||
      this.boomerang.position + 1 === this.enemy2.position ||
      this.enemy2.position === 0
    ) {
      score += 100;
      this.enemy2.die();
    }
    if (this.boomerang.count < 10) this.boomerang.moveRight();
    if (this.boomerang.count >= 10) this.boomerang.moveLeft();
    if (this.boomerang.position <= this.hero.position) this.boomerang.count = 0;
  }

  play(name) {
    setInterval(() => {
      // Let's play!
      this.check(name);
      this.enemy.moveLeft();
      this.enemy1.moveLeft();
      this.enemy2.moveLeft();
      this.regenerateTrack();
      // this.hero.attack();
      // this.boomerang.fly();
      this.view.render(this.field);
      console.log(`Score: ${score}`);
    }, 20);
  }
}

module.exports = Game;
