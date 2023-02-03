package day04.part2

import loadInput

fun main() {
    val input = loadInput("./src/main/kotlin/day04/input")
    val rows = input.split("\n")

    val overlaps = rows.map {
        val (first, second) = toSectionPair(it)
        val (a, b) = first
        val (x, y) = second
        if (a in x..y || b in x..y || x in a..b || y in a..b) 1 else 0
    }

    println(overlaps.sum())
}

fun toSectionPair(row: String) = row.split(",").map { it.split("-").map { it.toInt() } }
