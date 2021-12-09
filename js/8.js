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
  for (const b in this) if (c(this[b])) return this[b];
};
/* segments is like
   aaa
  b   c
  b   c
   ddd
  e   f
  e   f
   ggg

  I use this name for my variables!
*/

/**
 * Function por dormir
 * @description Dormir por un tiempo determinado
 * @param {Array} datas
 * @returns {number}
 */

const part2 = (datas) => {
  return datas.reduce((acc, curr) => {
    const [input, output] = curr
      .split(' | ')
      .reduce((a, c) => [...a, c.split(' ')], []);

    // first find "easy digit"
    const numbers = {
      1: input.first((o) => o.length === 2),
      4: input.first((o) => o.length === 4),
      7: input.first((o) => o.length === 3),
      8: input.first((o) => o.length === 7),
    };

    // create an entries with the segment and the number of time it appears in the input
    // like: [ [ 'a': 2 ], [ 'b': 3 ], [ 'c': 2 ] ... ]
    const lettersCountMap = Object.entries(
      input.reduce((acc, curr) => {
        curr.split('').forEach((c) => {
          acc[c] = (acc[c] || 0) + 1;
        });
        return acc;
      }, {})
    );

    // find segment b, e and f easily because it appears a specific number of time
    const segments = {};
    segments.b = lettersCountMap.first(([, a]) => a === 6)[0]; // 6 segment with segment b
    segments.e = lettersCountMap.first(([, a]) => a === 4)[0];
    segments.f = lettersCountMap.first(([, a]) => a === 9)[0];
    // segment of number 1 is c and b, i know b so I can know c
    segments.c = numbers[1].split('').first((a) => a !== segments.f);
    segments.d = numbers[4] // number 4 segment share the same segment as number 1
      .split('') // but 2 more, the d and b, so I found the first segment not equal to b
      .first((a) => !numbers[1].includes(a) && a !== segments.b);

    // with all of this segments, I can find the rest of digits
    const fiveDigit = input.filter((a) => a.length === 5); // [2, 3, 5]
    numbers[2] = fiveDigit.first((a) => !a.includes(segments.f)); // only 2 hasn't segment f
    numbers[5] = fiveDigit.first((a) => !a.includes(segments.c)); // only 5 hasn't segment c
    numbers[3] = fiveDigit.first((a) => a !== numbers[2] && a !== numbers[5]); // find the last digit
    const sixDigit = input.filter((a) => a.length === 6); // [0, 6, 9];
    numbers[0] = sixDigit.first((a) => !a.includes(segments.d)); // only 0 hasn't segment d
    numbers[6] = sixDigit.first((a) => !a.includes(segments.c)); // only 6 hasn't segment c
    numbers[9] = sixDigit.first((a) => !a.includes(segments.e)); // only 9 hasn't segment e

    // get entries of my number like `[ [0, 'acde'], [6, 'bcf'], [2, 'bcf'] ]`
    const numbersKeys = Object.entries(numbers).map(([key, value]) => [
      key,
      value.split('').sort().join(''), // sort letters to easly comparison
    ]);

    const outputNumber = output
      .map((a) => numbersKeys.first(([, v]) => v === a.split('').sort().join(''))[0])
      .join('');

    return acc + +outputNumber;
  }, 0);
};

module.exports = {
  part1,
  part2,
};
