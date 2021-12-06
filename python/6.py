import json

FILE='../puzzle/6.test.txt'
POINT_X=0
POINT_Y=1
START=0
END=1


def parse_input(file):
    with open(file) as f:
        datas = [int(i) for i in f.readline().split(',')]
        fishes = [0] * 9
        for d in datas:
            fishes[d] += 1
    return fishes

def pass_one_day(fishes):
    out = [0] * 9
    for i in range(len(fishes)-1):
        out[i] = fishes[i + 1]
    out[6] += fishes[0]
    out[8] = fishes[0]
    return out

def main():
    fishes = parse_input(FILE)

    # PARTI 1
    # for i in range(256):
    #     print("Start day", i, "with", len(fishes), "fish")
    #     for y in range(len(fishes)):
    #         if fishes[y] == 0:
    #             fishes.append(8)
    #             fishes[y] = 6
    #         else:
    #             fishes[y] -= 1

    # PARTI 2
    for i in range(256):
        fishes = pass_one_day(fishes)
        
    result = 0
    for i in range(len(fishes)):
        result += fishes[i]
    print(result)


main()