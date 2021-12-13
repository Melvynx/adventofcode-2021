FILE='./puzzle/13.test.txt'
# FILE='./puzzle/13.txt'

def parse_input(file):
    with open(file) as f:
        coords = []
        instructions = []
        for line in f:
            if line.startswith('fold'):
                instructions.append(line.strip())
            elif line.count(',') == 1:
                coords.append([int(char) for char in line.strip().split(',')])
    return coords, instructions

def get_fold_number(i, number):
    return number + i + 1, number - i - 1

def fold_board(board, axe, number):
    if axe == "y":
        for i in range(len(board) - number - 1):
            prev_i, new_i = get_fold_number(i, number)
            for y in range(len(board[0])):
                board[new_i][y] = '#' if board[new_i][y] == '#' else board[prev_i][y]
        return board[:number]
    elif axe == "x":
        for i in range(len(board[0]) - number - 1):
            prev_i, new_i = get_fold_number(i, number)
            for y in range(len(board)):
                board[y][new_i] = '#' if board[y][new_i] == '#' else board[y][prev_i]
        return [row[:number] for row in board]

def generate_board(coords):
    board = []
    max_x = max([c[0] for c in coords])
    max_y = max([c[1] for c in coords])
    
    for _ in range(max_y+1):
        board.append(["." for _ in range(max_x+1)])
    for coord in coords:
        x, y = coord
        board[y][x] = '#'
    return board

def print_board(board):
    for o in board:
        print("".join([str(i) for i in o]))

coords, instructions = parse_input(FILE)
board = generate_board(coords)

for instruction in instructions: #part 1: `instructions[:1]``
    axe, number = instruction[instruction.index('=') - 1:].split("=")
    board = fold_board(board, axe, int(number))

print_board(board) #part 2
result = 0
for row in board:
    result += row.count('#')
print("Part1", result)
