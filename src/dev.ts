import figlet from 'figlet'
import chalk from 'chalk'

console.log(
   chalk.greenBright.bold(
      figlet.textSync('Hono JS', {
         font: 'Slant',
         horizontalLayout: 'fitted',
         verticalLayout: 'default',
         whitespaceBreak: true
      })
   )
)
console.log()
console.log(chalk.redBright.bold(' Author: ') + chalk.whiteBright.italic('charlsdev'))
console.log(chalk.redBright.bold(' Version: ') + chalk.whiteBright.italic('1.0.0'))
console.log(chalk.redBright.bold(' License: ') + chalk.whiteBright.italic('MIT'))
console.log(chalk.redBright.bold(' Description: ') + chalk.whiteBright.italic('Task runner for HonoJS'))
console.log()