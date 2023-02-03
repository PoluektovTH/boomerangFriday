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
    this.view = new View();
    this.track = [];
    keyboard.a = () => this.hero.moveLeft();
    keyboard.d = () => this.hero.moveRight();
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');
    this.track[this.enemy.position] = this.enemy.skin;
    this.track[this.boomerang.position] = this.boomerang.skin;
    this.track[this.hero.position] = this.hero.skin;
  }

  check(name) {
    if (this.hero.position === this.enemy.position) {
      fs.writeFileSync(`${__dirname}/scores/${name}`, `${score}${EOL}`);
      this.hero.die();
    }
    if (
      this.enemy.position === this.boomerang.position ||
      this.boomerang.position - 1 === this.enemy.position ||
      this.boomerang.position + 1 === this.enemy.position
    ) {
      score += 100;
      this.enemy.die();
    }
  }

  play(name) {
    setInterval(() => {
      // Let's play!
      this.check(name);
      this.enemy.moveLeft();
      this.boomerang.moveRight();
      this.regenerateTrack();
      this.view.render(this.track);
      console.log(`Score: ${score}`);
    }, 100);
  }
}

module.exports = Game;
