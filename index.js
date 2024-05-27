import 'dotenv/config'
import express from 'express'
import fileUpload from "express-fileupload";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import skaterRouter from './routes/skaters.route.js'

export const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'));
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(fileUpload({
    createParentPath: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/skaters', skaterRouter)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('*', (_, res) => {
    res.status(404).json({ ok: false, msg: 'ruta no configurada 😐' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`)
})