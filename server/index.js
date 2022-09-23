const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');

// settings

app.set('port', process.env.PORT || 3001);
app.set('json spaces',2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

// routes
app.use('/api',require('./routes/'));
app.use('/api/user',require('./routes/users'));

app.use((req, res) => {
	res.status(404).json({ errors: { global: "Seguimos trabajando en eso. Vuelva a intentarlo más tarde cuando lo implementemos." } });
});

// iniciando el servidor
app.listen(app.get('port'),() => {
	console.log(`Servidor en el puerto: ${app.get('port')}`);
});
