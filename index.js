import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar Base de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log('Error'))

//Definir puerto
const port = process.env.PORT || 3000;

// Habilitar pug
app.set('view engine', 'pug');

// Obtener el ano actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

// Agregar body parser para leer los datos del formulario de testimoniales
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
});