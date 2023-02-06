// Сделаем отдельный класс для отображения игры в консоли.

const { EOL } = require('os');
class View {
  render(field, down, up) {
    const yourTeamName = 'DADI';
    // Тут всё рисуем.
    console.clear();
    console.log('\n');
    console.log(up.join(''));
    // console.log(track1.join(''));
    // console.log(track.join(''));
    // console.log(track2.join(''));
    console.log(field.map((el) => el.join('')).join(EOL));
    console.log(down.join(''));
    console.log('\n');
    console.log(`Produced by: "${yourTeamName}"`);
  }
}

module.exports = View;
