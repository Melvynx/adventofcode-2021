const { table } = require('table');
const { start, save } = require('./run');

const day = process.argv[process.argv.length - 1] || '0';

if (day === '0') {
  throw new Error('Please specify a day');
}

const answers = start(day);

const data = [
  ['', 'Part 1', 'Part 2'],
  ['Result', answers.answer.part1.result, answers.answer.part2.result],
  ['Time', answers.answer.part1.timeElapsed, answers.answer.part2.timeElapsed],
];

const config = {
  columnDefault: {
    width: 10,
  },
  header: {
    alignment: 'center',
    content: answers.title,
  },
};

const result = table(data, config);
console.log(result);

save(day, result);
