// Основной файл.
// Запускает игру.
const Game = require('./src/Game');

// Инициализация игры с настройками.
const name = process.argv[2];
const game = new Game({
  trackLength: 30,
});

// Запуск игры.
game.play(name);
