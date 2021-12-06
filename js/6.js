const DAYS = 256;

const part1 = (datas) => {
  console.log(datas);
  const fishs = datas[0].split(',').map(Number);

  for (let day = 1; day <= Math.min(80, 256); day++) {
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
  const fishs = datas[0].split(',').map(Number);

  let state = new Array(9).fill(0);
  fishs.forEach((e) => {
    state[e] += 1;
  });

  for (let day = 1; day <= DAYS; day++) {
    const updated = new Array(9).fill(0);

    state.forEach((e, i) => {
      updated[i] = state[i + 1];
    });

    updated[6] += state[0];
    updated[8] = state[0];
    state = updated;
  }

  console.log(state);
  return state.reduce((a, b) => a + b, 0);
};

module.exports = {
  part1,
  part2,
};
