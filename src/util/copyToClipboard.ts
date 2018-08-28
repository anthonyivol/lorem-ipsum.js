const exec = require('child_process').exec

const PLATFORMS = {
  darwin: 'darwin',
  win32: 'win32',
  linux: 'linux',
}

export const isSupportedPlatform = (platform: string): boolean => {
  return Object.keys(PLATFORMS).indexOf(platform) !== -1
}

export const getCopyCommand = (platform: string): string => {
  switch (platform) {
    case 'darwin':
      return 'pbcopy'
    case 'win32':
      return 'clip'
    default:
      return 'xclip -selection clipboard'
  }
}

export const getPlatform = (): string => {
  if (!process || typeof process.platform !== 'string') {
    throw new Error(`Could not determine host operating system.`)
  }
  return process.platform
}

const copyToClipboard = (text: string): Promise<string> => {
  return new Promise(
    (resolve: (text: string) => void, reject: (error: Error) => void) => {
      try {
        const platform = getPlatform()
        if (!isSupportedPlatform(platform)) {
          throw new Error(`Copy is not supported for ${platform}.`)
        }
        const command = `echo "${text}" | ${getCopyCommand(platform)}`
        exec(command, (err: Error) => {
          if (err) throw err
          return resolve(text)
        })
      } catch (e) {
        return reject(e)
      }
    }
  )
}

export default copyToClipboard
