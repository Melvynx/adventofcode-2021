const part1 = (datas) => {
  const numbers = datas[0].split(',').map(Number);
  const median = numbers.sort((a, b) => a - b)[Math.floor(numbers.length / 2)];
  return numbers.reduce((acc, curr) => Math.abs(curr - median) + acc, 0);
};

const part2 = (datas) => {
  const numbers = datas[0].split(',').map(Number);
  const avg = Math.floor(numbers.reduce((a, b) => a + b, 0) / numbers.length);
  return numbers.reduce((acc, curr) => {
    const delta = Math.abs(curr - avg);
    return (delta * (delta + 1)) / 2 + acc;
  }, 0);
};

module.exports = {
  part1,
  part2,
};
