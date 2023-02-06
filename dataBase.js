// const Scores = require('./db/models');
// const fs = require('fs');
// function add() {
//   const readNames = fs.readdirSync('./src/scores');
//   for (let file of readNames) {
//     const readScores = fs.readFileSync(`./src/scores/${file}`, 'utf-8');
//     const score = Scores.create({
//       PlayerName: file,
//       FinalScore: readScores[0],
//       TimeOfSurvival: readScores[1],
//     });
//     console.log(score);
//   }
// }
// add();
// module.exports = add;
