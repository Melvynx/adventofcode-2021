const SIZE = 10;

const part1 = (datas) => {
  const grid = datas.map((d) => d.split('').map(Number));
  let flashed = 0;

  const day = () => {
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
  };
  for (let i = 0; i < 100; i++) day();

  return flashed;
};

const part2 = (datas) => {
  const grid = datas.map((d) => d.split('').map(Number));
  let result = 0;

  const day = (dayId) => {
    const stack = [];
    const flash = (i, j) => {
      if (i < 0 || i > SIZE - 1 || j < 0 || j > SIZE - 1) return;

      grid[i][j] += 1;
      if (grid[i][j] !== 10) return;

      stack.push([i, j]);
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

    if (stack.length === 10 * 10) {
      result = dayId + 1;
    }
  };
  for (let i = 0; i < 400 && !result; i++) day(i);

  return result;
};

module.exports = {
  part1,
  part2,
};
