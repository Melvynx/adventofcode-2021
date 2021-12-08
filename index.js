const { table } = require('table');
const { start, save } = require('./run');

const args = process.argv.slice(2);

const day = args[0] || '0';

const isTest = args[1] === '--test' || args[1] === '-t';

if (day === '0') {
  throw new Error('Please specify a day');
}

const answers = start(day, isTest);

const data = [
  ['', 'Part 1', 'Part 2'],
  ['Result', answers.answer.part1.result, answers.answer.part2.result],
  ['Time', answers.answer.part1.timeElapsed, answers.answer.part2.timeElapsed],
];

const config = {
  columnDefault: {
    width: 14,
  },
  header: {
    alignment: 'center',
    content: answers.title,
  },
};

const result = table(data, config);
console.log(result);

save(day, result);
