import 'dotenv/config'
import express from 'express'

export const app = express()

const __dirname = import.meta.dirname
app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use('*', (_, res) => {
    res.status(404).json({ ok: false, msg: 'ruta no configurada 😐' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})