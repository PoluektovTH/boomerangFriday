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


check() {
  if (this.hero.position !== this.hero.boomerang.position) {
    this.hero.boomerang.fly();
  }
  if (this.hero.boomerang.position <= this.hero.position) {
    this.hero.boomerang.position = undefined;
    this.hero.boomerang.direction = 'right';
  }
  if (this.hero.position === this.enemy.position) {
    this.hero.dieHero();
    console.clear();
    // console.log(this.count);
    // console.log(this.timer);
    // console.log(this.name);
    const addUser = async ()=>{
      try {
        await User.bulkCreate({nickname:this.name, scores:this.count})
      } catch (err) {
        console.log(err);
      }
    } 
    addUser()
    process.exit();
  }
  if (this.hero.boomerang.position >= this.enemy.position) {
    this.enemy.dieEnemy();
    this.count += 1;
    this.hero.boomerang.direction = 'left';
    this.enemy = new Enemy(this.trackLength);
  }
  if (this.hero.boomerang.position === this.trackLength - 1) {
    this.hero.boomerang.direction = 'left';
  }

  if(this.count >= 5) {
    this.hero.boomerang.skin = '🌪';
    }
    if(this.count >= 10) {
    this.hero.skin = '💃';
    } 
}
