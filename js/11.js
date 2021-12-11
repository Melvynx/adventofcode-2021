const SIZE = 10;

const loop = (datas, maxDays, part) => {
  const grid = datas.map((d) => d.split('').map(Number));
  let flashed = 0;
  let firstFullFlash = 0;

  const day = (day) => {
    const stack = [];
    const flash = (i, j) => {
      if (i < 0 || i > SIZE - 1 || j < 0 || j > SIZE - 1) return;

      grid[i][j] += 1;
      if (grid[i][j] !== 10) return;

      // he is flashed
      stack.push([i, j]);
      flashed += 1;
      flash(i - 1, j);
      flash(i + 1, j);
      flash(i, j - 1);
      flash(i, j + 1);
      flash(i - 1, j - 1);
      flash(i - 1, j + 1);
      flash(i + 1, j - 1);
      flash(i + 1, j + 1);
    };

    for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE; j++) flash(i, j);

    for (const s of stack) grid[s[0]][s[1]] = 0;

    if (stack.length === 10 * 10) firstFullFlash = firstFullFlash || day + 1;
  };
  for (let i = 0; i < maxDays; i++) day(i);

  return part === '1' ? flashed : firstFullFlash;
};

const part1 = (datas) => {
  return loop(datas, 100, '1');
};

const part2 = (datas) => {
  return loop(datas, 400, '2');
};

module.exports = {
  part1,
  part2,
};
