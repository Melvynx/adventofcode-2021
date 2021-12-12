const START = 'start';
const END = 'end';

const isBigCave = (cave) => cave.toUpperCase() === cave;

const part1 = (datas) => {
  datas = datas.map((data) => data.split('-'));
  const allPoss = [];
  const findPossibilities = (currRoad) => {
    const newRoad = [...currRoad];
    datas
      .filter((d) => d.includes(newRoad[newRoad.length - 1]))
      .map((d) => d.filter((c) => c !== newRoad[newRoad.length - 1])[0])
      .filter((d) => isBigCave(d) || !newRoad.includes(d))
      .forEach((p) =>
        p.includes(END)
          ? allPoss.push([...newRoad, p])
          : findPossibilities([...newRoad, p])
      );
  };
  for (const start of datas.filter((d) => d.includes(START))) {
    findPossibilities([START, start.filter((c) => c !== START)[0]]);
  }
  return allPoss.length;
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
  const possibilities = [];

  const findPossibilities = (currRoad, canVisitedTwice = true) => {
    const newRoad = [...currRoad];
    datas
      .filter((d) => d.includes(newRoad[newRoad.length - 1]))
      .map((d) => d.filter((c) => c !== newRoad[newRoad.length - 1])[0])
      .filter(
        (d) =>
          isBigCave(d) ||
          (!newRoad.includesN(d, +canVisitedTwice + 1) && d !== START)
      )
      .forEach((p) =>
        p.includes(END)
          ? possibilities.push([...newRoad, p])
          : findPossibilities(
              [...newRoad, p],
              canVisitedTwice
                ? isBigCave(p) || !newRoad.includes(p)
                : canVisitedTwice
            )
      );
  };

  for (const start of datas.filter((d) => d.includes(START))) {
    findPossibilities([START, start.filter((c) => c !== START)[0]]);
  }
  return possibilities.length;
};

module.exports = {
  part1,
  part2,
};
