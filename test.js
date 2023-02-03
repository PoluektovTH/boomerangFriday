// const waitSync = require('wait-sync');
// let arr = new Array(50).fill(' ');
// const hero = '|';
// for (let i = 1; i < arr.length; i++) {
//   arr.splice(i - 1, 1, ' ');
//   arr.splice(i, 1, hero);
//   console.log(arr.join(''));
//   waitSync(1);
//   console.clear();
// }
const keypress = require('keypress');
const Hero = require('./src/game-models/Hero');
function runInteractiveConsole() {
  const hero1 = new Hero();
  const keyboard = {
    a: () => console.log(hero1.moveLeft()),
    d: () => console.log(hero1.moveRight()),
  };
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      // Вызывает команду, соответствующую нажатой кнопке.
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}
runInteractiveConsole();
