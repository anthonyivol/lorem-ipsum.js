import Generator, { GeneratorOptions, Prng } from './lib/generator'
import makeArrayOfStrings from './util/makeArrayOfStrings'

const FORMATS = ['plain', 'html']

export class LoremIpsum {
  generator: Generator
  format: string
  suffix?: string

  constructor(
    options: GeneratorOptions,
    format: string = 'plain',
    suffix: string
  ) {
    if (FORMATS.indexOf(format) === -1) {
      throw new Error(
        `${format} is an invalid format. Please use ${FORMATS.join(' or ')}.`
      )
    }

    this.format = format
    this.suffix = suffix
    this.generator = new Generator(options)
  }

  getLineEnding() {
    if (!this.suffix) {
      const isNode = typeof module !== 'undefined' && module.exports
      const isReactNative = typeof product !== 'undefined' && product.navigator === 'ReactNative'

      if (!isReactNative && isNode) {
        return require('os').EOL
      }
      return '\n'
    }
  }

  formatStrings(strings: string[]): string[] {
    if (this.format === 'html') {
      return strings.map(str => `<p>${str}</p>`)
    }
    return strings
  }

  formatString(str: string): string {
    if (this.format === 'html') {
      return `<p>${str}</p>`
    }
    return str
  }

  generateWords(num: number, noFormat: boolean = false): string {
    const makeString = this.generator.pluckRandomWord.bind(this.generator)
    return this.formatString(makeArrayOfStrings(num, makeString).join(' '))
  }

  generateSentences(num: number, noFormat: boolean = false): string {
    const makeString = this.generator.generateRandomSentence.bind(
      this.generator
    )
    return this.formatString(
      `${makeArrayOfStrings(num, makeString).join('. ')}.`
    )
  }

  generateParagraphs(num: number): string {
    const makeString = this.generator.generateRandomParagraph.bind(
      this.generator
    )
    return this.formatStrings(makeArrayOfStrings(num, makeString)).join(
      this.getLineEnding()
    )
  }
}

export interface LoremIpsumParams {
  count?: number
  format?: string
  paragraphLowerBound?: number
  paragraphUpperBound?: number
  random?: Prng
  sentenceLowerBound?: number
  sentenceUpperBound?: number
  units?: string
  words?: string[]
  suffix?: string
}

const loremIpsum = ({
  count = 1,
  format = 'plain',
  paragraphLowerBound = 3,
  paragraphUpperBound = 7,
  random,
  sentenceLowerBound = 5,
  sentenceUpperBound = 15,
  units = 'sentences',
  words,
  suffix,
}: LoremIpsumParams): string => {
  const options = {
    sentencesPerParagraph: {
      min: paragraphLowerBound,
      max: paragraphUpperBound,
    },
    wordsPerSentence: {
      min: sentenceLowerBound,
      max: sentenceUpperBound,
    },
    random,
    words,
  }

  const loremIpsum = new LoremIpsum(options, format, suffix)

  switch (units) {
    case 'paragraphs':
    case 'paragraph':
      return loremIpsum.generateParagraphs(count)
    case 'sentences':
    case 'sentence':
      return loremIpsum.generateSentences(count)
    case 'words':
    case 'word':
      return loremIpsum.generateWords(count)
    default:
      return ''
  }
}

export default loremIpsum
