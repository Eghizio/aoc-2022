import java.io.File

fun loadInput(fileName: String) = File(fileName).readText(Charsets.UTF_8).trimEnd()

fun main(args: Array<String>) {
    println("Hello Advent of Code!")
}
