package day03.part1

import loadInput

fun main() {
    val input = loadInput("./src/main/kotlin/day03/input")
    val rucksacks = input.split("\n")
    val comps = rucksacks.map { splitToCompartments(it) }

    val intersections = comps.map { it[0].toSet().intersect(it[1].toSet()).first() }
    val prios = intersections.map { toPriority(it) }

    println(prios.sum())
}

fun splitToCompartments(r: String) = listOf(r.substring(0, r.length / 2), r.substring(r.length / 2))

fun toPriority(s: Char) = s.code - if (s.isLowerCase()) 96 else 64 - 26
