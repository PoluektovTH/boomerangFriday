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
let time = 0;
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
    this.enemy3 = new Enemy();
    this.enemy4 = new Enemy();
    this.view = new View();
    this.upBorder = [];
    this.downBorder = [];
    this.track = [];
    this.track1 = [];
    this.track2 = [];
    this.track3 = [];
    this.track4 = [];
    this.field = [];
    keyboard.a = () => this.hero.moveLeft();
    keyboard.d = () => this.hero.moveRight();
    keyboard.w = () => this.hero.moveUp();
    keyboard.s = () => this.hero.moveDown();
    keyboard.q = () => {
      this.boomerang.fly(this.hero.position, this.hero.trackP);
    };
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.upBorder = new Array(33).fill('☣ ');
    this.downBorder = new Array(33).fill('☣ ');
    this.track = new Array(this.trackLength).fill(' ');
    this.track1 = new Array(this.trackLength).fill(' ');
    this.track2 = new Array(this.trackLength).fill(' ');
    this.track3 = new Array(this.trackLength).fill(' ');
    this.track4 = new Array(this.trackLength).fill(' ');
    this.track.unshift('🔥');
    this.track2.unshift('🔥');
    this.track1.unshift('🔥');
    this.track3.unshift('🔥');
    this.track4.unshift('🔥');
    this.track.push('🔥');
    this.track2.push('🔥');
    this.track1.push('🔥');
    this.track3.push('🔥');
    this.track4.push('🔥');
    this.field = [
      this.track1,
      this.track,
      this.track2,
      this.track3,
      this.track4,
    ];
    this.field[this.hero.trackP][this.hero.position] = this.hero.skin;
    this.field[this.enemy1.trackPe][this.enemy1.position] = this.enemy1.skin;
    this.field[this.enemy.trackPe][this.enemy.position] = this.enemy.skin;
    this.field[this.enemy2.trackPe][this.enemy2.position] = this.enemy2.skin;
    this.field[this.enemy3.trackPe][this.enemy3.position] = this.enemy3.skin;
    this.field[this.enemy4.trackPe][this.enemy4.position] = this.enemy4.skin;
    this.field[this.boomerang.trackPb][this.boomerang.position] =
      this.boomerang.skin;
  }

  check(name) {
    if (
      (this.hero.position === this.enemy.position &&
        this.hero.trackP === this.enemy.trackPe) ||
      (this.hero.position === this.enemy1.position &&
        this.hero.trackP === this.enemy1.trackPe) ||
      (this.hero.position === this.enemy2.position &&
        this.hero.trackP === this.enemy2.trackPe) ||
      (this.hero.position === this.enemy3.position &&
        this.hero.trackP === this.enemy3.trackPe) ||
      (this.hero.position === this.enemy4.position &&
        this.hero.trackP === this.enemy4.trackPe) ||
      this.hero.position <= 0 ||
      this.hero.position > this.trackLength
    ) {
      fs.appendFileSync(`${__dirname}/scores/${name}`, `${score}${EOL}`);
      this.hero.die();
    }
    if (
      (this.enemy.position === this.boomerang.position &&
        this.enemy.trackPe === this.boomerang.trackPb) ||
      (this.boomerang.position + 1 === this.enemy.position &&
        this.enemy.trackPe === this.boomerang.trackPb)
    ) {
      score += 100;
      this.enemy.die();
    }
    if (
      (this.enemy1.position === this.boomerang.position &&
        this.enemy1.trackPe === this.boomerang.trackPb) ||
      (this.boomerang.position + 1 === this.enemy1.position &&
        this.enemy1.trackPe === this.boomerang.trackPb)
    ) {
      score += 100;
      this.enemy1.die();
    }
    if (
      (this.enemy2.position === this.boomerang.position &&
        this.enemy2.trackPe === this.boomerang.trackPb) ||
      (this.boomerang.position + 1 === this.enemy2.position &&
        this.enemy2.trackPe === this.boomerang.trackPb)
    ) {
      score += 100;
      this.enemy2.die();
    }
    if (
      (this.enemy3.position === this.boomerang.position &&
        this.enemy3.trackPe === this.boomerang.trackPb) ||
      (this.boomerang.position + 1 === this.enemy3.position &&
        this.enemy3.trackPe === this.boomerang.trackPb)
    ) {
      score += 100;
      this.enemy3.die();
    }
    if (
      (this.enemy4.position === this.boomerang.position &&
        this.enemy4.trackPe === this.boomerang.trackPb) ||
      (this.boomerang.position + 1 === this.enemy4.position &&
        this.enemy4.trackPe === this.boomerang.trackPb)
    ) {
      score += 100;
      this.enemy4.die();
    }
    if (this.enemy1.position === 0) this.enemy1.die();
    if (this.enemy2.position === 0) this.enemy2.die();
    if (this.enemy3.position === 0) this.enemy3.die();
    if (this.enemy4.position === 0) this.enemy4.die();
    if (this.enemy.position === 0) this.enemy.die();
  }

  play(name) {
    setInterval(() => {
      time += (time + 50) / 1000;
      this.check(name);
      this.enemy.moveLeft();
      this.enemy1.moveLeft();
      this.enemy2.moveLeft();
      this.enemy3.moveLeft();
      this.enemy4.moveLeft();
      this.regenerateTrack();
      // this.hero.attack();
      // this.boomerang.fly();
      this.view.render(this.field, this.downBorder, this.upBorder, time, score);
      console.log(`Score: ${score}`);
      console.log(`Time passed: ${time.toFixed(1)}`);
      if (time >= 5) {
        console.log(
          `${' '.repeat(30)}Победа!\n ${' '.repeat(25)}Твои очки: ${score}`
        );
        process.exit();
      }
    }, 20);
  }
}

module.exports = Game;
