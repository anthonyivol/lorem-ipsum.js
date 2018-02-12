import program from 'commander'
import loremIpsum from '../index'
import copyToClipboard from '../util/copyToClipboard'

const DESC = 'Generates one or more words|sentences|paragraphs'

const FORMATS_REGEX = /^(plain|html)$/i
const UNITS_REGEX = /^(paragraphs|paragraph|sentences|sentence|words|word)$/i

program
  .version('2.0.0')
  .usage('generate 3 words')
  .usage('generate 3 words --format html --copy')
  .command(`[count] [units]`, DESC)
  .option('-c --copy', 'Copy')
  .option('-f --format <format>', 'Format', FORMATS_REGEX, 'plain')
  .action((num: string = '1', units: string = 'sentence') => {
    if (UNITS_REGEX.test(units) === false) {
      console.error(
        `${units} is not valid. Choose from paragraph(s), sentence(s) or word(s).`
      )
      process.exit(1)
    }

    const count = parseInt(num)
    if (!count || count < 1) {
      console.log(`${count} is not valid. Choose a number >= 1`)
      process.exit(1)
    }

    const output = loremIpsum({
      count,
      units,
      format: program.format,
    })

    console.log(output)
    if (program.copy === true) {
      copyToClipboard(output)
        .then(() => {
          console.log('✓ copied')
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  })

program.parse(process.argv)
