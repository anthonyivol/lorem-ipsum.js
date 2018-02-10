require('seedrandom')

interface Bounds {
  min: number
  max: number
}

interface Prng {
  (): number
}

interface Seedrandom {
  new (seed?: string): Prng
}

interface Math {
  seedrandom: Seedrandom
}

interface GeneratorOptions {
  paragraphs: Bounds
  sentences: Bounds
  random?: Prng
  seed?: string
  words: string[]
}

class Generator {
  paragraphs: Bounds
  sentences: Bounds
  random: Prng
  words: string[]

  constructor({
    paragraphs = { min: 3, max: 7 },
    sentences = { min: 5, max: 15 },
    random,
    seed,
    words,
  }: GeneratorOptions) {
    if (paragraphs.min > paragraphs.max) {
      throw new Error('Minimum number of paragraphs cannot exceed maximum')
    }

    if (sentences.min > sentences.max) {
      throw new Error('Minimum number of sentences cannot exceed maximum')
    }

    this.paragraphs = paragraphs
    this.sentences = sentences

    if (random) {
      this.random = random
    } else if (seed) {
      this.random = new Math.seedrandom(seed)
    } else {
      this.random = Math.random
    }
  }

  generateRandomInteger(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1) + min)
  }

  pluckRandomWord() {
    const min = 0
    const max = this.words.length - 1
    const index = this.generateRandomInteger(min, max)
    return this.words[index]
  }

  generateRandomSentence() {
    let sentence = ''
    let { min, max } = this.sentences

    while (min < max) {
      sentence += ` ${this.pluckRandomWord()}`
      min++
    }

    return sentence.slice(1).charAt(0).toUpperCase + sentence.slice(1)
  }
}
