// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track, track1, track2) {
    const yourTeamName = 'Elbrus';
    // Тут всё рисуем.
    console.clear();
    console.log('\n');
    console.log(track1.join(''));
    console.log(track.join(''));
    console.log(track2.join(''));
    console.log('\n');
    console.log(`Created by "${yourTeamName}" with love`);
  }
}

module.exports = View;
