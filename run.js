const fs = require('fs');

const start = (id, isTest) => {
  const result = {
    title: `AoC 2021 - Day ${id}`,
    time: 0,
    answer: {
      part1: null,
      part2: null,
    },
  };
  const exercise = require(`./js/${id}.js`);

  const puzzle = fs
    .readFileSync(
      `./puzzle/${id.split('.')[0]}${isTest ? '.test' : ''}.txt`,
      'utf-8'
    )
    .split('\n');

  result.answer.part1 = runWithTime([...puzzle], exercise.part1);
  result.answer.part2 = runWithTime([...puzzle], exercise.part2);

  return result;
};

const runWithTime = (puzzle, func) => {
  var startTime = performance.now();
  const result = func(puzzle);
  var endTime = performance.now();
  return {
    timeElapsed: `${Math.round((endTime - startTime) * 1000) / 1000}ms`,
    result,
  };
};

function save(day, result) {
  const data = JSON.stringify(result, null, 2);

  const path = `stats/${day.split('.')[0]}/results.txt`;
  const date = new Date().toUTCString();

  try {
    fs.appendFileSync(path, `\n${date}\n`, 'utf-8');
    const dataLine = data.replaceAll('\\n', '\n').replaceAll('"', '');
    fs.appendFileSync(path, dataLine, 'utf-8');
  } catch (e) {
    fs.mkdirSync(`stats/${day}`, { recursive: true });
    fs.writeFileSync(path, '', 'utf-8');
    save(day, result);
  }
}

module.exports = { start, save };
