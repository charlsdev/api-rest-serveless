import { serve } from '@hono/node-server'
import chalk from 'chalk'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import 'dotenv/config'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import './dev'

import { auth } from './auth'
import { posts } from './posts'

const port = process.env.APP_PORT || 3000
const app = new Hono()

app.use('*', logger())

app.get('/', c => c.json({ msg: 'Welcome to API with HonoJS... 🌍' }))

app.route('/api', auth)
app.route('/api', posts)

serve(
   {
      fetch: app.fetch.bind(app),
      port: Number(port),
   },
   () =>
      console.log(
         chalk.blackBright.bold(`[${dayjs().format('DD-MM-YYYY')} - ${dayjs().format('HH:mm:ss')}]`) +
            chalk.yellowBright.bold(' - Servidor en el puerto ') +
            chalk.blueBright.italic(`${port}`),
      ),
)
