# lorem-ipsum.js

lorem-ipsum.js is a JavaScript module for generating passages of lorem ipsum text. Lorem ipsum text is commonly used as placeholder text in publishing, graphic design, and web development.

lorem-ipsum.js is compatible with the browser, Node.js, and React Native.

## CLI

lorem-ipsum.js includes a command line interface (CLI) program for generating passages of lorem ipsum text directly from your terminal. This CLI program is compatible with Mac OSX, Windows, and Linux. Simply install the module globally to take advantage of this feature.

```
npm i -g lorem-ipsum
```

Execute the statement `lorem-ipsum [count] [units]` from your terminal to generate a passage of lorem ipsum text. You can pass additioanl arguments to the program.

Example:

```
# One word
lorem-ipsum 1 word

# Two words
lorem-ipsum 2 words

# One sentence
lorem-ipsum 1 sentence

# Two sentences
lorem-ipsum 2 sentences

# One paragraph
lorem-ipsum 1 paragraph

# Two paragraphs
lorem-ipsum 2 paragraphs

# Two paragraphs copied to clipboard
lorem-ipsum 2 paragraphs --copy

# Two paragraphs formatted as HTML
lorem-ipsum 2 paragraphs --format html
```

*Upgrading from version 1.0?* The `--count` and `--units` options have been dropped in favor of the natural langauge interface shown in the examples above. This interface was also available in < version 2 and behaves the same way.

## Notes

The "copy to clipboard" feature is compatible on Mac and Windows systems. Linux users will need to install xclip to use this feature. To install xclip on Ubuntu: `sudo apt-get install xclip`.

## License

This software is licensed under the MIT license.

Copyright (c) 2012-2018 Nickolas Kenyeres

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
