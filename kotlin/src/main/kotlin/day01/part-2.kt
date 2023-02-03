package day01.part2

import loadInput

fun main() {
    val input = loadInput("./src/main/kotlin/day01/input")

    val elfs = input.split("\n\n")
    val cals = elfs.map { it.split("\n").map { it.toInt() } }

    val total = cals.map { it -> it.sum() }
    val top3 = total.sortedDescending().take(3)
    println(top3.sum())
}
