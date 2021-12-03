let datas = require('fs').readFileSync('datas3.txt', 'utf-8').split('\n');

const reduceMultiplyBinary = (acc, curr) => acc * parseInt(curr, 2);

const answer1 = datas
  .map((v) => v.split(''))
  .reduce(
    (acc, curr) => {
      curr.forEach((v, i) => {
        acc[i] += v;
      });
      return acc;
    },
    datas[0].split('').map(() => '')
  )
  .reduce(
    (acc, curr) => {
      const count = curr.split('').filter((v) => +v).length;
      acc[0] += +(count > datas.length / 2); // ? '1' : '0';
      return acc;
    },
    ['']
  )
  .reduce(
    (acc, curr) => {
      acc[0] = curr;
      acc[1] = curr
        .split('')
        .map((v) => +!+v)
        .join('');
      return acc;
    },
    ['', '']
  )
  .reduce(reduceMultiplyBinary, 1);

const getMaxus = (a, i) =>
  a.filter((v) => v[i] === +(a.filter((v) => !+v[i]).length >= a.length / 2) + '');

const getMinux = (a, i) =>
  a.filter((v) => v[i] === +(a.filter((v) => !+v[i]).length < a.length / 2) + '');

const calcExercise2 = (a, func) => {
  let result = [...a];
  for (let i = 0; result.length !== 1; i++) result = func(result, i);
  return result[0];
};

const answer2 = [
  calcExercise2(datas, getMinux),
  calcExercise2(datas, getMaxus),
].reduce(reduceMultiplyBinary, 1);

console.log({ answer1, answer2 });
