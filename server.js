require('dotenv').config()

const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const KoaSubdomain = require('koa-subdomain')
const admin = require('firebase-admin')
const serverCredentials = require('./credentials/firebase/server')

const port = parseInt(process.env.PORT, 10) || 3000
const environment = process.env.NODE_ENV !== 'production'
const app = next({ dev: environment })
const handle = app.getRequestHandler()

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serverCredentials)
}, 'server')

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  const subdomain = new KoaSubdomain()

  server.subdomainOffset = 1

  router.get('*', async context => {
    const [ subdomain ] = context.state.wildcardSubdomains

    context.req.subdomain = subdomain
    context.response = false
    await handle(context.req, context.res)
  })

  subdomain.use('*', router.routes())

  server.use(async (context, next) => {
    context.req.firebaseServer = firebase
    context.res.statusCode = 200
    await next()
  })

  server.use(subdomain.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
