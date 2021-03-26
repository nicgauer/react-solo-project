const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

//Static routes, serve react build files in production
if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend', 'build', 'index.html')
            )
    })
    
    //serves the static assets in the front end's build folder
    router.use(express.static(path.resolve('../frontend/build')));
    
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(path.resolve(__dirname, '../../frontend', 'build', 'index.html'));
    })
}

if(process.env.NODE_ENV !== 'production'){
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.status(201).json({});
    });
}

router.get('/hello/world', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('hello world');
});

module.exports = router;