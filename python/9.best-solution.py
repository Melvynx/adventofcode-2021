# Best way to do exercise 9, inspired by Zitex solution

FILE='./puzzle/9.txt'
# FILE='./puzzle/9.test.txt'

SENTINEL=9

def parse_input(file):
    with open(file) as f:
        datas = []
        for line in f:
            datas.append([int(char) for char in line.strip()])
    return datas

def check(y, x):
    pos = y + x * 1j
    # to avoid finding bassin already seen
    if pos in seen:
        return 0
    
    seen.add(pos)
    
    # check if element is out of range 
    if y < 0 or y >= len(table):
        return 0
    if x < 0 or x >= len(table[0]):
        return 0
    # if current position is a 9, return now
    if table[y][x] == SENTINEL:
        return 0

    # after all this check, we are curently in a valid position
    # we can now check positions arround to find the bassin

    result = 1
    result += check(y - 1, x) # recursion for up
    result += check(y + 1, x) # recursion for down
    result += check(y, x - 1) # recursion for left
    result += check(y, x + 1) # recursion for right
    return result

seen = set()
bassins = []
table = parse_input(FILE)
for y in range(len(table)):
    for x in range(len(table[y])):
        if y + x * 1j not in seen and table[y][x] != 9:
            bassins.append(check(y, x))

bassins.sort()
print("Answer2", bassins[-1] * bassins[-2] * bassins[-3])
