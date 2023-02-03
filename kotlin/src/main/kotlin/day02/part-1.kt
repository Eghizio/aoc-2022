package day02.part1

import loadInput
import java.lang.Exception

fun main() {
    val input = loadInput("./src/main/kotlin/day02/input")

    val games = input.split("\n")
    val scores = games.map { mapScore(it) }

    println(scores.sum())
}

fun mapScore(game: String) =
    when (game) {
        // R P S
        "A X" -> 1 + 3
        "A Y" -> 2 + 6
        "A Z" -> 3 + 0
        "B X" -> 1 + 0
        "B Y" -> 2 + 3
        "B Z" -> 3 + 6
        "C X" -> 1 + 6
        "C Y" -> 2 + 0
        "C Z" -> 3 + 3
        else -> throw Exception("Dupa")
    }
