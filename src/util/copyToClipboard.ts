const exec = require('child_process').exec

const PLATFORMS = {
  darwin: 'darwin',
  win32: 'win32',
  linux: 'linux',
}

/**
 * Checks if the process platform is supported.
 * @param platform  The process 'platform'.
 * @returns         True if the platform is supported.
 */
export const isSupportedPlatform = (platform: string): boolean => {
  return Object.keys(PLATFORMS).indexOf(platform) !== -1
}

/**
 * Gets the 'copy' command for the supported platform.
 * @param platform  The process 'platform'
 * @returns         The 'copy' command, e.g. 'pbcopy' for Mac.
 */
export const getCopyCommand = (platform: string): string => {
  switch (platform) {
    case PLATFORMS.darwin:
      return 'pbcopy'
    case PLATFORMS.win32:
      return 'clip'
    case PLATFORMS.linux:
    default:
      return 'xclip -selection clipboard'
  }
}

/*
 * @returns The process 'platform'.
 * @throws
 */
export const getPlatform = (): string => {
  if (!process || typeof process.platform !== 'string') {
    throw new Error(`Could not determine host operating system.`)
  }
  return process.platform
}

/**
 * Copy text to the clipboard.
 * @param text  The 'text' to copy.
 * @returns     A promise that resolves with the 'text'
 */
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
