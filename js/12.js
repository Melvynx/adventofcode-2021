const START = 'start';
const END = 'end';

const isBigCave = (cave) => cave.toUpperCase() === cave;

const part1 = (datas) => {
  datas = datas.map((data) => data.split('-'));
  let possibilities = 0;
  const findPossibilities = (currRoad) =>
    datas
      .filter((d) => d.includes(currRoad[currRoad.length - 1]))
      .map((d) => (d[0] === currRoad[currRoad.length - 1] ? d[1] : d[0]))
      .forEach(
        (d) =>
          (isBigCave(d) || !currRoad.includes(d)) &&
          (d === END ? possibilities++ : findPossibilities([...currRoad, d]))
      );
  for (const start of datas.filter((d) => d.includes(START)))
    findPossibilities([START, start.filter((c) => c !== START)[0]]);

  return possibilities;
};

Array.prototype.includesN = function (s, n) {
  const copy = [...this];
  for (let i = 0; i < n; i++) {
    if (!copy.includes(s)) return false;
    copy.splice(copy.indexOf(s), 1);
  }
  return true;
};

const part2 = (datas) => {
  datas = datas.map((data) => data.split('-'));
  let possibilities = 0;

  const findPossibilities = (currRoad, canVisitedTwice = true) => {
    const newRoad = [...currRoad];
    datas
      .filter((d) => d.includes(currRoad[currRoad.length - 1]))
      .map((d) => (d[0] === currRoad[currRoad.length - 1] ? d[1] : d[0]))
      .filter(
        (d) =>
          isBigCave(d) || (!newRoad.includesN(d, canVisitedTwice + 1) && d !== START)
      )
      .forEach((d) =>
        d === END
          ? possibilities++
          : findPossibilities(
              [...newRoad, d],
              canVisitedTwice && (isBigCave(d) || !newRoad.includes(d))
            )
      );
  };
  for (const start of datas.filter((d) => d.includes(START)))
    findPossibilities([START, start.filter((c) => c !== START)[0]]);

  return possibilities;
};

module.exports = {
  part1,
  part2,
};
