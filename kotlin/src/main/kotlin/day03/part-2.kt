package day03.part2

import loadInput

fun main() {
    val input = loadInput("./src/main/kotlin/day03/input")
    val rucksacks = input.split("\n")
    val groups = rucksacks.chunked(3)

    val intersections = groups.flatMap { it[0].toSet().intersect(it[1].toSet()).intersect(it[2].toSet()) }
    val prios = intersections.map { toPriority(it) }

    println(prios.sum())
}

fun toPriority(s: Char) = s.code - if (s.isLowerCase()) 96 else 64 - 26
