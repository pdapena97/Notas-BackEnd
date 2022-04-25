require('dotenv').config();

const express = require ('express');
const morgan = require('morgan');

const {
    newUserController,
    getUserController,
    loginController
} = require('./controllers/users');

const {
    getNotesController,
    newNoteController,
    getSingleNoteController,
    deleteNoteController
} = require('./controllers/notes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));


// Rutas de usuario
app.post ('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);


// Rutas de notes
app.get('/', getNotesController);
app.post('/', newNoteController);
app.get('/note/:id', getSingleNoteController);
app.delete('/note/:id', deleteNoteController);


// Middleware de 404
app.use((req,res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});


// Lanzamos el servidor
app.listen(3000, () => {
    console.log('Servidor funcionando!');
});