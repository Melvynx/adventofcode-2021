# Melvynx's Advent Of Code

It's my first time in the adventure of a Advent Of Code.

I will make the AoC's challenges in this repository in:

- Golang
- Python
- JavaScript
- ... maybe more

## JavaScript

For the JavaScript, I made a automation script to run the AoC's challenges.

### Tutorial

With a file architecture like this:

```
js/
  ├── 1.js
  ├── 2.js
  ├── 3.js

puzzle/
  ├── 1.txt
  ├── 1.test.txt
  ├── 2.txt
  ├── 2.test.txt
  ├── 3.txt
  ├── 3.test.txt
```

The file inside the JS folder must export 2 functions named like this:

```js
function part1(datas) {
  return '101';
}

function part2(datas) {
  return '505';
}

module.exports = { part1, part2 };
```

Next you can execute, for example the day 3, with:

```bash
node ./ 3

>
╔══════════════════════════════════════╗
║           AoC 2021 - Day 3           ║
╟────────────┬────────────┬────────────╢
║            │ Part 1     │ Part 2     ║
╟────────────┼────────────┼────────────╢
║ Result     │ 101        │ 505        ║
╟────────────┼────────────┼────────────╢
║ Time       │ 2.845ms    │ 83.278ms   ║
╚════════════╧════════════╧════════════╝
```

If you want run the script with the test files, you can do it with:

```
node ./ 3 test
```

And the JS file will be executed with the test files. (puzzle/3.test.txt)
