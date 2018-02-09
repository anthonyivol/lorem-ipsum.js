import copyToClipboard, {
  isSupportedPlatform,
  getCopyCommand,
  getPlatform,
} from './copyToClipboard'

import { expect } from 'chai'

describe('isSupportedPlatform', () => {
  it('should return true if the platform is supported', () => {
    const supportedPlatforms = ['darwin', 'win32', 'linux']
    supportedPlatforms.forEach(platform => {
      const result = isSupportedPlatform(platform)
      expect(result).to.equal(true)
    })
  })

  it('should return false if the platform is unsupported', () => {
    const result = isSupportedPlatform('unknown')
    expect(result).to.equal(false)
  })
})

describe('getCopyCommand', () => {
  it('should return "pbcopy" on Mac', () => {
    const result = getCopyCommand('darwin')
    expect(result).to.equal('pbcopy')
  })

  it('should return "clip" on Windows', () => {
    const result = getCopyCommand('win32')
    expect(result).to.equal('clip')
  })

  it('should return "xclip" on Linux', () => {
    const result = getCopyCommand('linux')
    expect(result).to.equal('xclip -selection clipboard')
  })
})

describe('getPlatform', () => {
  it('should return the platform from the process', () => {
    const platforms = ['darwin', 'win32', 'linux']

    platforms.forEach(platform => {
      const op = process.platform
      Object.defineProperty(process, 'platform', {
        value: platform,
      })

      const result = getPlatform()
      expect(result).to.equal(platform)

      Object.defineProperty(process, 'platform', {
        value: op,
      })
    })
  })

  it('should throw an exception if there is no platform', () => {
    const op = process.platform
    Object.defineProperty(process, 'platform', {
      value: undefined,
    })

    try {
      getPlatform()
    } catch (e) {
      expect(e.message).to.equal('Could not determine host operating system.')
    }

    Object.defineProperty(process, 'platform', {
      value: op,
    })
  })
})

describe('copyToClipboard', () => {
  it('should resolve the promise with the text that was copied to the clipboard', () => {
    copyToClipboard('text to copy')
      .then(text => {
        expect(text).to.equal('text to copy')
      })
      .catch(err => undefined)
  })

  it('should reject the promise if the platform is not supported', () => {
    const op = process.platform
    Object.defineProperty(process, 'platform', {
      value: 'yellowtab',
    })

    copyToClipboard('text to copy')
      .then(() => undefined)
      .catch(err => {
        expect(err.message).to.equal('Copy is not supported for yellowtab.')

        Object.defineProperty(process, 'platform', {
          value: op,
        })
      })
  })

  it('should reject the promise if the platform cannot be determined', () => {
    const op = process.platform
    Object.defineProperty(process, 'platform', {
      value: undefined,
    })

    copyToClipboard('text to copy')
      .then(() => undefined)
      .catch(err => {
        expect(err.message).to.equal(
          'Could not determine host operating system.'
        )

        Object.defineProperty(process, 'platform', {
          value: op,
        })
      })
  })
})
