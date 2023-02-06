// Основной файл.
// Запускает игру.
const Game = require("./src/Game");

// Инициализация игры с настройками.
const game = new Game({
  trackLength: 50,
});

// Запуск игры.
game.play();
