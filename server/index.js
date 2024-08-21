const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');
app.use(express.static('build'));	//Agergado
const path = require('path');		//Agergado

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
app.use('/api/imagenes',require('./routes/imagenes'));
app.use('/api/cuentas',require('./routes/cuentas'));
app.use('/api/ingresos',require('./routes/ingresos'));
app.use('/api/personas',require('./routes/personas'));
app.use('/api/contactos',require('./routes/contactos'));
app.use('/api/fonos',require('./routes/fonoaudiologos'));
app.use('/api/pacientes',require('./routes/pacientes'));

app.use('/api/escenarios',require('./routes/escenarios'));
app.use('/api/rehabilitaciones',require('./routes/rehabilitaciones'));

app.use('/api/personajes', require('./routes/personajes'));

app.use('/api/decorativos', require('./routes/decorativos'));

app.use('/api/resultadoComprarProducto', require('./routes/resultadoComprarProducto'));

app.use((req, res) => {
	res.status(404).json({ errors: { global: "Seguimos trabajando en eso. Vuelva a intentarlo más tarde cuando lo implementemos." } });
});

// iniciando el servidor
app.listen(app.get('port'),() => {
	console.log(`Servidor en el puerto: ${app.get('port')}`);
	console.log(new Date().toLocaleString('es-AR', {
		timeZone: 'America/Argentina/Buenos_Aires'
	}));
	process.env.TZ = 'America/Argentina/Buenos_Aires';


});
app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));});  //Agregado

