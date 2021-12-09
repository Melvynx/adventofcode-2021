FILE='./puzzle/9.txt'
# FILE='./puzzle/9.test.txt'

def split(word):
    return [char for char in word]

def parse_input(file):
    with open(file) as f:
        datas = []
        for line in f:
            datas.append([int(char) for char in line.strip()])
    return datas

SENTINEL = 9
def find_low(table):
    result = [] 
    for y, line in enumerate(table):
        for x, item in enumerate(line):
            right = SENTINEL if x-1 == -1 else line[x-1]
            left = SENTINEL if x+1 >= len(line) else line[x+1]
            top = SENTINEL if y-1 == -1 else table[y-1][x]
            bottom = SENTINEL if y+1 >= len(table) else table[y+1][x]

            if (item < right and item < left and item < top and item < bottom):
                result.append({ "value": item + 1, "coord": tuple([x,y]) })
    return result

def find_basin(table, low):
    result = 0
    stack = [low["coord"]]
    
    while len(stack) > 0:
        last = stack.pop(0)
        x, y = last
        if table[y][x] == SENTINEL:
            continue

        while y != SENTINEL:
            new = SENTINEL if y-1 == -1 else y-1
            if new == SENTINEL or table[new][x] == SENTINEL:
                break
            y = new

        while table[y][x] != SENTINEL:
            if x == 4 and y == 2:
                print("CC")
            right = SENTINEL if x-1 == -1 else table[y][x-1]
            left = SENTINEL if x+1 >= len(table[0]) else table[y][x+1]
            if right != SENTINEL:
                stack.append(tuple([x-1, y]))
            if left != SENTINEL:
                stack.append(tuple([x+1, y]))

            result += 1
            table[y][x] = SENTINEL

            y = SENTINEL if y+1 >= len(table) else y+1
            if y == SENTINEL:
                break

    return result


def find_basins(table, lows):
    result = []
    for low in lows:
        numberBassin = find_basin(table.copy(), low)
        result.append(numberBassin)
    return result

def multiply_list(list):
    result = 1
    for x in list:
         result = result * x
    return result

def main():
    table = parse_input(FILE)
    lows = find_low(table)
    result2 = find_basins(table, lows)

    answer1 = sum([item["value"] for item in lows])

    result2.sort()
    answer2 = multiply_list(result2[-3:])
    print("Answer1:", answer1)
    print("Answer2:", answer2)

main()