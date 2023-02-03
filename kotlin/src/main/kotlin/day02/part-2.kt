package day02.part2

import loadInput
import java.lang.Exception

fun main() {
    val input = loadInput("./src/main/kotlin/day02/input")

    val games = input.split("\n")
    val scores = games.map { mapScoreResults(it) }

    println(scores.sum())
}

fun mapScoreResults(game: String) =
    when (game) {
        // R P S
        // L D W
        "A X" -> 3 + 0
        "A Y" -> 1 + 3
        "A Z" -> 2 + 6
        "B X" -> 1 + 0
        "B Y" -> 2 + 3
        "B Z" -> 3 + 6
        "C X" -> 2 + 0
        "C Y" -> 3 + 3
        "C Z" -> 1 + 6
        else -> throw Exception("Dupa $game")
    }
