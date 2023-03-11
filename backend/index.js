    const connectToMongo = require('./db');
    const express = require('express');
    const session = require('express-session')
    const MongoDBStore = require('connect-mongodb-session')(session);
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const app = express();
    const mongoURI = "mongodb://dbGautum:Kamlesh@ac-k33on3k-shard-00-00.entrtz5.mongodb.net:27017,ac-k33on3k-shard-00-01.entrtz5.mongodb.net:27017,ac-k33on3k-shard-00-02.entrtz5.mongodb.net:27017/notebook?ssl=true&replicaSet=atlas-agjg2h-shard-0&authSource=admin&retryWrites=true&w=majority";
    const cookieParser = require('cookie-parser')
    const cors = require('cors')
    const port = 3001;

    const store = new MongoDBStore({
        uri: mongoURI,
        collection: 'sessions'
    });

    connectToMongo();

    app.use(session({
        secret: 'chiku',
        resave: false,
        saveUninitialized: true,
        store,
    }));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(express.urlencoded({
        extended:true
    }));

    app.use('/auth',require('./routes/auth'));
    app.use('/notes',require('./routes/notes'));

    app.get('/set-cookie', (req, res) => {
        res.cookie('cookieName1', 'co44', { maxAge: 900000, httpOnly: false, secure: true });
        console.log('Cookie has been set:', req.cookies);
        res.send('Cookie has been set');
      });
      
      app.get('/get-cookie', (req, res) => {
        console.log('Cookies:', req.cookies);
        res.send(req.cookies);
      });
      fetch('http://localhost:3001/get-cookie')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
  
    

    app.listen(port, () => {
        console.log(`App listening on port ${port}` )
    });
