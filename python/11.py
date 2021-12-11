FILE='./puzzle/11.test.txt'
FILE='./puzzle/11.txt'

def parse_input(file):
    with open(file) as f:
        datas = []
        for line in f:
            datas.append([int(char) for char in line.strip()])
    return datas

SENTINEL=9
SIZE=10

def pass_day(octopus, result, day):
    def splash_loop(i, j):
        if i < 0 or i > SIZE-1:
            return 0
        if j < 0 or j > SIZE-1:
            return 0
        octopus[i][j] += 1
        if octopus[i][j] == 10:
            octo_flash(i, j)

    def octo_flash(i, j):
        octopus[i][j] = 0
        result["flash"] += 1
        finded.append((i, j))

        splash_loop(i-1, j)
        splash_loop(i+1, j)
        splash_loop(i, j-1)
        splash_loop(i, j+1)
        splash_loop(i-1, j-1)
        splash_loop(i+1, j+1)
        splash_loop(i-1, j+1)
        splash_loop(i+1, j-1)
    finded = []
    for i in range(SIZE):
        for j in range(SIZE):
            octopus[i][j] += 1
            if octopus[i][j] == 10:
                octo_flash(i, j)
    for find in finded:
        octopus[find[0]][find[1]] = 0
    if len(finded) == 10 * 10:
        result["first"] = result["first"] if result["first"] != 0 else day + 1

def print_octopus(octopus):
    for o in octopus:
        print("".join([str(i) for i in o]))

octopus = parse_input(FILE)
result = { "flash": 0, "first": 0 }
for i in range(1000):
    pass_day(octopus, result, i)

print(result)