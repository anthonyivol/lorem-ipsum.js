import capitalize from '../util/capitalize'
import randomSeed from 'random-seed'
import { words } from './dictionary'

export interface Bounds {
  min: number
  max: number
}

export interface Prng {
  (): number
}

export interface SeedRandom {
  new (seed?: string): Prng
}

export interface Math {
  seedrandom: SeedRandom
}

export interface GeneratorOptions {
  sentencesPerParagraph: Bounds
  wordsPerSentence: Bounds
  random?: Prng
  seed?: string
  customWords?: string[]
}

class Generator {
  sentencesPerParagraph: Bounds
  wordsPerSentence: Bounds
  random: Prng
  words: string[]

  constructor({
    sentencesPerParagraph = { min: 3, max: 7 },
    wordsPerSentence = { min: 5, max: 15 },
    random,
    seed,
    customWords,
  }: GeneratorOptions) {
    if (sentencesPerParagraph.min > sentencesPerParagraph.max) {
      throw new Error(
        'Minimum number of sentences per paragraph cannot exceed maximum'
      )
    }

    if (wordsPerSentence.min > wordsPerSentence.max) {
      throw new Error(
        'Minimum number of words per sentence cannot exceed maximum'
      )
    }

    this.sentencesPerParagraph = sentencesPerParagraph
    this.wordsPerSentence = wordsPerSentence
    this.words = customWords || words

    if (random) {
      this.random = random
    } else if (seed) {
      this.random = randomSeed.create(seed).random
    } else {
      this.random = Math.random
    }
  }

  generateRandomInteger(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1) + min)
  }

  generateRandomSentence(): string {
    const words = []
    const { min, max } = this.wordsPerSentence

    let cursor = 0
    const bound = this.generateRandomInteger(min, max)

    while (cursor < bound) {
      words.push(this.pluckRandomWord())
      cursor++
    }

    return capitalize(words.join(' '))
  }

  generateRandomParagraph(): string {
    const sentences = []
    const { min, max } = this.sentencesPerParagraph

    let cursor = 0
    const bound = this.generateRandomInteger(min, max)

    while (cursor < bound) {
      sentences.push(this.generateRandomSentence())
      cursor++
    }

    return sentences.join('. ').trim()
  }

  pluckRandomWord(): string {
    const min = 0
    const max = this.words.length - 1
    const index = this.generateRandomInteger(min, max)
    return this.words[index]
  }
}

export default Generator
