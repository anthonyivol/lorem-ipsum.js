/*
export class LoremIpsum() {
  // This class is an improved interface that lets you 
  // create generator instances so you don't have to 
  // keep passing options.
}
*/

import Generator, { Prng } from './lib/generator'

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
  count = 1,
  format = 'plain',
  paragraphLowerBound = 3,
  paragraphUpperBound = 7,
  random,
  sentenceLowerBound = 5,
  sentenceUpperBound = 15,
  units = 'sentences',
  words,
}: LoremIpsumParams): string => {
  const generator = new Generator({
    paragraphs: {
      min: paragraphLowerBound,
      max: paragraphUpperBound,
    },
    sentences: {
      min: sentenceLowerBound,
      max: sentenceUpperBound,
    },
    words,
  })

  return ''
}

export default loremIpsum
