const EASY_DIGIT = [2, 3, 4, 7];
const part1 = (datas) => {
  return datas.reduce(
    (acc, cur) =>
      cur
        .split(' | ')
        .reduce((a, c) => [...a, c.split(' ')], [])[1]
        .reduce((a, o) => a + +EASY_DIGIT.includes(o.length), 0) + acc,
    0
  );
};

// To avoid many repeated code with `filter(...)[0]` and useless loop
Array.prototype.first = function (c) {
  for (const b in this) if (typeof c === 'function' && c(this[b])) return this[b];
};

const part2 = (datas) => {
  return datas.reduce((acc, curr) => {
    const [input, output] = curr
      .split(' | ')
      .reduce((a, c) => [...a, c.split(' ')], []);

    const numbers = {
      1: input.first((o) => o.length === 2),
      4: input.first((o) => o.length === 4),
      7: input.first((o) => o.length === 3),
      8: input.first((o) => o.length === 7),
    };

    const lettersCountMap = Object.entries(
      input.reduce((acc, curr) => {
        curr.split('').forEach((c) => {
          acc[c] = (acc[c] || 0) + 1;
        });
        return acc;
      }, {})
    );

    const segments = {};
    segments.b = lettersCountMap.first(([, a]) => a === 6)[0];
    segments.e = lettersCountMap.first(([, a]) => a === 4)[0];
    segments.f = lettersCountMap.first(([, a]) => a === 9)[0];
    segments.d = numbers[4]
      .split('')
      .first((a) => !numbers[1].includes(a) && a !== segments.b);
    segments.c = numbers[1].split('').first((a) => a !== segments.f);

    const fiveDigit = input.filter((a) => a.length === 5);
    numbers[2] = fiveDigit.first((a) => !a.includes(segments.f));
    numbers[5] = fiveDigit.first((a) => !a.includes(segments.c));
    numbers[3] = fiveDigit.first((a) => a !== numbers[2] && a !== numbers[5]);
    const sixDigit = input.filter((a) => a.length === 6);
    numbers[0] = sixDigit.first((a) => !a.includes(segments.d));
    numbers[6] = sixDigit.first((a) => !a.includes(segments.c));
    numbers[9] = sixDigit.first((a) => !a.includes(segments.e));

    const numbersKeys = Object.entries(numbers).map(([key, value]) => [
      key,
      value.split('').sort().join(''),
    ]);

    const outputNumber = output
      .map((a) => numbersKeys.first(([, v]) => v === a.split('').sort().join(''))[0])
      .join('');

    return +outputNumber + acc;
  }, 0);
};

module.exports = {
  part1,
  part2,
};
