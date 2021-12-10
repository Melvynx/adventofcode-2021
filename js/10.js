const mapping = {
  '(': { v: ')', p: 3, i: 1 },
  '[': { v: ']', p: 57, i: 2 },
  '{': { v: '}', p: 1197, i: 3 },
  '<': { v: '>', p: 25137, i: 4 },
};

const part1 = (datas) => {
  return datas.reduce((acc, line) => {
    const stack = [];

    for (const curr of line.split('')) {
      if (mapping[curr]) {
        stack.push(curr);
      } else if (mapping[stack.pop()].v !== curr) {
        acc += Object.values(mapping).filter((a) => a.v === curr)[0].p;
        break;
      }
    }
    return acc;
  }, 0);
};

const part2 = (datas) => {
  const result = datas
    .reduce((acc, line) => {
      const stack = [];

      for (const curr of line.split('')) {
        if (mapping[curr]) {
          stack.push(curr);
        } else if (mapping[stack.pop()].v !== curr) {
          return acc;
        }
      }

      if (stack.length >= 0) {
        acc.push(
          stack.reverse().reduce((acc, curr) => acc * 5 + mapping[curr].i, 0)
        );
      }

      return acc;
    }, [])
    .sort((a, b) => a - b);

  return result[(result.length - 1) / 2];
};

module.exports = {
  part1,
  part2,
};
