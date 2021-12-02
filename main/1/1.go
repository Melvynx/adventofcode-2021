package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    // Setup
    dat, err := os.ReadFile("data.txt")
    check(err)

    split := strings.Split(string(dat), "\n")

    var splitNumber []int
    for _, s := range split {
        i1, err := strconv.Atoi(s)

        if err == nil {
            splitNumber = append(splitNumber, i1)
        }
    }

    // Exerise 1
    increase := 0

    for i, s := range splitNumber {
        if i == 0 {
            continue
        }
        prev := splitNumber[i - 1]
        if prev < s {
            increase += 1
        }
    }

    // Exercise 2
    increase2 := 0
    lastValue := 0

    for i, s := range splitNumber {
        if i < 2 {
            continue
        }
        newValue := s + splitNumber[i - 1] + splitNumber[i - 2]
        if newValue > lastValue {
            increase2 += 1
        }
        lastValue = newValue
    }

    fmt.Println("Increase1", increase)
    fmt.Println("Increase2", increase2)
}