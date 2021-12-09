// Solution 1
const part1 = (datas) => {
  const r = datas.reduce(
    (curr, acc) => {
      let [direction, step] = acc.split(' ');
      step = Number(step);

      switch (direction) {
        case 'up':
          curr.depth -= step;
          break;
        case 'down':
          curr.depth += step;
          break;
        case 'forward':
          curr.horizontal += step;
      }
      return curr;
    },
    { horizontal: 0, depth: 0 }
  );
  return r.depth * r.horizontal;
};

// Solution 2
const part2 = (datas) => {
  const r = datas.reduce(
    (curr, acc) => {
      let [direction, step] = acc.split(' ');
      step = Number(step);

      switch (direction) {
        case 'up':
          curr.aim -= step;
          break;
        case 'down':
          curr.aim += step;
          break;
        case 'forward':
          curr.horizontal += step;
          curr.depth += curr.aim * step;
      }
      return curr;
    },
    { horizontal: 0, depth: 0, aim: 0 }
  );
  return r.horizontal * r.depth;
};

module.exports = { part1, part2 };
