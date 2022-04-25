const {generateError} = require('../helpers');
const {createUser, getUserById} = require('../db/users');


const newUserController = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        //esto deberia ser sustituido por JOI
        if (!email || !password) {
            throw generateError('Debes enviar un email y una password', 400);
        }  

        const id = await createUser(email,password);
        console.log (id);

        res.send({
            status: 'ok',
            message: `User created with id: ${id}`,
        });

    } catch(error) {
        next(error);
    }
};


const getUserController = async (req, res, next) => {
    try {
        const {id} = req.params;

        const user = await getUserById(id);

        res.send({
            status: 'ok',
            data: user,
        });

    } catch(error) {
        next(error);
    }    
};


const loginController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });

    } catch(error) {
        next(error);
    }    
};



module.exports = {
    newUserController,
    getUserController,
    loginController
};