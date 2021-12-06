FILE='../puzzle/5.txt'
POINT_X=0
POINT_Y=1
START=0
END=1


def parse_input(file):
    with open(file) as f:
        datas = []
        for line in f:
            coords = line.rstrip().split("->")
            coordX = coords[0].split(",")
            coordY = coords[1].split(",")

            tuples = ((int(coordX[0]), int(coordX[1])), (int(coordY[0]), int(coordY[1])))
            # [PART 1]
            if tuples[START][POINT_X] == tuples[END][POINT_X] or tuples[START][POINT_Y] == tuples[END][POINT_Y]:
                datas.append(tuples)
            # [PART 2]
            # datas.append(tuples)
    return datas

def print_grid(grid):
    for line in grid:
        print("".join(line))

def draw_grid(datas):
    grid = []

    max_x = max([max(data[START][POINT_X], data[END][POINT_X]) for data in datas])
    max_y = max([max(data[START][POINT_Y], data[END][POINT_Y]) for data in datas])

    for _ in range(max_y+1):
        line = ["." for _ in range(max_x+1)]
        grid.append(line)

    for data in datas:
        draw_line(grid, data)

    return grid

def draw_line(grid, coord):
    x1 = coord[START][POINT_X]
    y1 = coord[START][POINT_Y]

    draw_point(grid, x1, y1)
    while x1 != coord[END][POINT_X] or y1 != coord[END][POINT_Y]:
        x1 += 0 if x1 == coord[END][POINT_X] else 1 if x1 < coord[END][POINT_X] else -1
        y1 += 0 if y1 == coord[END][POINT_Y] else 1 if y1 < coord[END][POINT_Y] else -1

        draw_point(grid, x1, y1)

def draw_point(grid, x, y):
    curr = grid[y][x]
    newNumber = curr == "." and 1 or int(curr) + 1
    grid[y][x] = str(newNumber)

def get_overlap(grid):
    overlap = 0
    for line in grid:
        for char in line:
            if char == "." or char == "1":
                continue
            overlap += 1
    return overlap

def main():
    datas = parse_input(FILE)
    grid = draw_grid(datas)
    print_grid(grid)
    overlap = get_overlap(grid)
    print("Overlap:", overlap)

main()