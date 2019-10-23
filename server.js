const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const environment = process.env.NODE_ENV !== 'production'
const app = next({ dev: environment })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = new Koa()
	const router = new Router()

	router.all('*', async context => {
		await handle(context.req, context.res)
		context.response = false
	})

	server.use(async (context, next) => {
		context.res.statusCode = 200
		await next()
	})

	server.use(router.routes())
	server.listen(port, () => {
		console.log(`> Ready on http://localhost:${port}`)
	})
})