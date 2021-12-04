function part1(datas) {
  var increseCount = 0;
  datas.forEach((v, i) => {
    if (datas[i - 1]) {
      if (datas[i - 1] < v) {
        increseCount += 1;
      }
    }
  });
  return increseCount;
}

// solution 2
function part2(datas) {
  return datas
    .slice(2)
    .map((v, i) => v + datas[i + 1] + datas[i])
    .filter((v, i, a) => v > a[i - 1]).length;
}

module.exports = { part1, part2 };

// var tuples = 0;
// var increseCount = 0;

// datas.forEach((v, i) => {
//   if (datas[i - 1] && datas[i - 2]) {
//     var newValue = v + datas[i - 1] + datas[i - 2];
//     if (tuples && newValue > tuples) {
//       increseCount += 1;
//     }
//     tuples = newValue;
//   }
// });
