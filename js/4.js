const getValues = (datas) => ({
  numbers: datas.shift().split(',').map(Number),
  boards: datas.reduce((acc, curr) => {
    if (curr === '') {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(
        curr
          .split(' ')
          .filter((v) => v)
          .map(Number)
      );
    }
    return acc;
  }, []),
});

const traverseBingo = (numbers, boards, onFinish, beforeFinish) => {
  let ok = false;
  for (let i = 0; !ok && i < numbers.length; i++) {
    const currNumbers = numbers.slice(0, i + 1);

    for (let b = 0; !ok && b < boards.length; b++) {
      const board = boards[b];
      for (let l = 0; !ok && l < board.length; l++) {
        if (
          board[l].every((num) => currNumbers.includes(num)) ||
          board[l].every((_, k) => currNumbers.includes(board[k][l]))
        ) {
          beforeFinish?.(b);
          ok = onFinish(
            () =>
              board.reduce(
                (acc, curr) =>
                  acc +
                  curr.reduce((a, c) => a + (+!currNumbers.includes(c) && c), 0),
                0
              ) * numbers[i]
          );
          break;
        }
      }
    }
  }
};

const part1 = (datas) => {
  const { numbers, boards } = getValues(datas);

  let result = 0;
  traverseBingo(numbers, boards, (r) => {
    result = r();
    return true;
  });

  return result;
};

const part2 = (datas) => {
  const { numbers, boards } = getValues(datas);

  let result = 0;
  traverseBingo(
    numbers,
    boards,
    (r) => {
      result = !boards.length && r();
      return !boards.length;
    },
    (b) => {
      boards.splice(b, 1);
    }
  );

  return result;
};

module.exports = {
  part1,
  part2,
};
