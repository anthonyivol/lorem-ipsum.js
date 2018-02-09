import { words } from './dictionary'
import { expect } from 'chai'

describe('words', () => {
  it('should be an array', () => {
    expect(words.constructor).to.equal(Array)
  })

  it('should contain 62 words', () => {
    expect(words.length).to.equal(62)
  })

  it('should only contain strings', () => {
    words.forEach(word => {
      expect(typeof word).to.equal('string')
    })
  })
})
