import express from 'express';
import nunjucks from 'nunjucks';

import {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    proceedRegistration
} from './pages';

const server = express();

// enable data receipt from req.body
server.use(express.urlencoded({ extended: true }));

server.use('/public', express.static('public'));

nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);
server.post('/proceed-registration', proceedRegistration);

server.listen(5500);
