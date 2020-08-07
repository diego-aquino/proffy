import express from 'express';
import nunjucks from 'nunjucks';

import { pageLanding, pageStudy, pageGiveClasses } from './pages';

const server = express();
server.use('/public', express.static('public'));

nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

server.get('/', pageLanding);
server.get('/study', pageStudy);
server.get('/give-classes', pageGiveClasses);

server.listen(5500);
