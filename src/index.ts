import Generator, { GeneratorOptions, Prng } from './lib/generator'
import makeArrayOfStrings from './util/makeArrayOfStrings'

const FORMATS = ['plain', 'html']

export class LoremIpsum {
  generator: Generator

  constructor(options: GeneratorOptions, format: string = 'plain') {
    if (FORMATS.indexOf(format) === -1) {
      throw new Error(
        `${format} is an invalid format. Please use ${FORMATS.join(' or ')}.`
      )
    }

    this.generator = new Generator(options)
  }

  generateWords(num: number): string {
    const makeString = this.generator.pluckRandomWord.bind(this)
    return makeArrayOfStrings(num, makeString).join(' ')
  }

  generateSentences(num: number): string {
    const makeString = this.generator.generateRandomSentence.bind(this)
    return `${makeArrayOfStrings(num, makeString).join('. ')}.`
  }

  generateParagraphs(num: number): string {
    const makeString = this.generator.generateRandomParagraph.bind(this)
    return makeArrayOfStrings(num, makeString).join(' ')
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
}

const loremIpsum = ({
  count = 1,{
  format = 'plain',
  paragraphLowerBound = 3,
  paragraphUpperBound = 7,
  random,
  sentenceLowerBound = 5,
  sentenceUpperBound = 15,
  units = 'sentences',
  words,
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

  const generator = new LoremIpsum(options, format)

  switch (units) {
    case 'paragraphs':
    case 'paragraph':
      return generator.generateParagraphs(count)
    case 'sentences':
    case 'sentence':
      return generator.generateSentences(count)
    case 'words':
    case 'word':
      return generator.generateWords(count)
    default:
      return ''
  }
}

export default loremIpsum
