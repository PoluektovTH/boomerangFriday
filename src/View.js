// Сделаем отдельный класс для отображения игры в консоли.

const { EOL } = require('os');
class View {
  render(field) {
    const yourTeamName = 'Elbrus';
    // Тут всё рисуем.
    console.clear();
    console.log('\n');
    // console.log(track1.join(''));
    // console.log(track.join(''));
    // console.log(track2.join(''));
    console.log(field.map((el) => el.join('')).join(EOL));
    console.log('\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
