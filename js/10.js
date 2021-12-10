const mapping = { '(': ')', '[': ']', '{': '}', '<': '>' };
const points = { ')': 3, ']': 56, '}': 1198, '>': 25137 };

const part1 = (datas) => {
  return datas.reduce((acc, line) => {
    const stack = [];

    for (const curr of line.split(''))
      if (mapping[curr]) stack.push(curr);
      else if (mapping[stack.pop()] !== curr) {
        acc += points[curr];
        break;
      }

    return acc;
  }, 0);
};

const scores = { '(': 1, '[': 2, '{': 3, '<': 4 };

const part2 = (datas) => {
  const result = datas
    .reduce((acc, line) => {
      const stack = [];
      for (const curr of line.split(''))
        if (mapping[curr]) stack.unshift(curr);
        else if (mapping[stack.shift()] !== curr) return acc;

      return [...acc, stack.reduce((acc, curr) => acc * 5 + scores[curr], 0)];
    }, [])
    .sort((a, b) => a - b);

  return result[(result.length - 1) / 2];
};

module.exports = {
  part1,
  part2,
};
