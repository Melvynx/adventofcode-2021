using System;
using System.Collections.Generic;
using System.Linq;

namespace adventofcode_2021
{
    class Day7
    {
        private readonly string _text;
        public Day7()
        {
            _text = System.IO.File.ReadAllText(@"../../../puzzle/7.txt");

            Console.WriteLine($"Parti1: {Part1()}");
            Console.WriteLine($"Parti2: {Part2()}");
        }

        private int Part1()
        {
            var crabs = _text.Split(",").ToList().Select(int.Parse).ToList();
            var median = crabs.OrderBy(a => a).ElementAt(crabs.Count / 2);
            return crabs.Select(v => Math.Abs(median - v)).Sum();
        }

        private double Part2()
        {
            var crabs = _text.Split(",").ToList().Select(double.Parse).ToList();
            var average = Math.Floor(crabs.Average());
            return crabs.Select(v => 
            {
                var delta = Math.Abs(v - average);
                return delta * (delta + 1) / 2; 
            }).Sum();
        }
    }
}