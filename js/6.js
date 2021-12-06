const DAYS = 256;

const part1 = (datas) => {
  const fishs = datas[0].split(',').map(Number);

  for (let day = 1; day <= Math.min(80, DAYS); day++) {
    fishs.forEach((e, i) => {
      if (e === 0) {
        fishs[i] = 6;
        fishs.push(8);
      } else {
        fishs[i] = fishs[i] - 1;
      }
    });
  }

  return fishs.length;
};

const part2 = (datas) => {
  const state = datas[0]
    .split(',')
    .reduce((acc, e) => (acc[e] += 1) && acc, new Array(9).fill(0));

  for (let i = 1; i <= DAYS; i++) {
    const zero = state[0];
    for (let i = 0; i < 8; i++) state[i] = state[i + 1];
    state[6] += zero;
    state[8] = zero;
  }

  return state.reduce((a, b) => a + b, 0);
};

module.exports = {
  part1,
  part2,
};
