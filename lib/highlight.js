'use strict';

const emphasize = require('emphasize');
const chalk = require('chalk');

const windows = process.platform === 'win32';
const sheet = (chalk) => ({
  comment: chalk.gray,
  quote: chalk.gray,

  keyword: chalk.green,
  addition: chalk.green,

  number: windows ? chalk.yellow : chalk.blue,
  string: chalk.green,
  'meta meta-string': chalk.cyan,
  literal: chalk.cyan,
  doctag: chalk.cyan,
  regexp: chalk.cyan,

  attribute: chalk.blue,
  attr: chalk.yellow,
  variable: chalk.yellow,
  'template-variable': chalk.yellow,
  'class title': chalk.yellow,
  'function title': chalk.yellow,
  type: chalk.yellow,

  symbol: chalk.magenta,
  bullet: chalk.magenta,
  subst: chalk.magenta,
  meta: chalk.magenta,
  'meta keyword': chalk.magenta,
  link: chalk.magenta,

  built_in: chalk.cyan,
  deletion: chalk.red,

  emphasis: chalk.italic,
  strong: chalk.bold,
  formula: chalk.inverse
});

module.exports = (stream) => {
  let level = 0;
  if (stream.isTTY) {
    if (stream.getColorDepth() >= 4) level = 1;
    if (stream.getColorDepth() >= 8) level = 2;
    if (stream.getColorDepth() >= 24) level = 3;
  }
  const colorSheet = sheet(new chalk.Instance({ level }));
  return (s) => emphasize.highlight('js', s, colorSheet).value;
};
