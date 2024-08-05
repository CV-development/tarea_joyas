import express from 'express'
import cors from 'cors'

import { serverLog } from './middlewares/serverLog.middleware.js'
import { joyasRouter, errors } from './routers/index.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
// Middleware que aplica a todas las rutas
app.use(serverLog)

app.use(joyasRouter)
app.use(errors)

app.listen(PORT, () => console.log('Server UP!'))

export default app
