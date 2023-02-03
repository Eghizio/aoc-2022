package day01.part1

import loadInput

fun main() {
    val input = loadInput("./src/main/kotlin/day01/input")

    val elfs = input.split("\n\n")
    val cals = elfs.map { it.split("\n").map { it.toInt() } }

    val total = cals.map { it -> it.sum() }
    println(total.max())
}
