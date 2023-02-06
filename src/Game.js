/* eslint-disable camelcase */
// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const fs = require('fs');
const { EOL } = require('os');
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const keyboard = require('./keyboard');
const { Gamer, sequelize } = require('../db/models');
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
    this.score = 0; // add this.score
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
      fs.writeFileSync(`${__dirname}/scores/${name}`, `${this.score}${EOL}`);
      this.addGamerName(name, this.score).then(() => this.hero.die());
    }

    if (
      this.enemy.position === this.boomerang.position ||
      this.boomerang.position - 1 === this.enemy.position ||
      this.boomerang.position + 1 === this.enemy.position
    ) {
      this.score += 100; // add this.score
      this.enemy.die();
    }
  }

  async addGamerName(name) {
    try {
      const gamerData = await Gamer.create(
        {
          name,
          score: this.score,
        },
        { logging: false }
      );
    } catch (error) {
      console.log(error);
    }
  }

  // async addGamerName(name) {
  //   const data = await Boomerang_scores.create({ name: `${name}`, score: `${numOfScore}`}); // доделать
  //   sequelize.close();
  // }

  play(name) {
    setInterval(() => {
      // Let's play!
      this.check(name);
      this.enemy.moveLeft();
      this.boomerang.moveRight();
      this.regenerateTrack();
      this.view.render(this.track);
      console.log(`Score: ${this.score}`);
    }, 100);
    // const numOfScore = fs.readFileSync(`${__dirname}/scores/${name}`, 'utf-8');
  }
}

module.exports = Game;
