import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { user } from './controllers/user.controller.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use("*", cors())
app.use("*", logger())
app.route("/user", user)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
