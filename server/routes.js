module.exports = (app, serviceRegister) => {
    app.put('/service/:intent/:port', (req, res, next) => {
        let ip = req.connection.remoteAddress.replace('::ffff:', '');
        serviceRegister.add(req.params.intent, req.params.port, ip)
        res.json({result: 'Pong'})
    })

            // Handle 500
    app.use((error, req, res, next) => {
        if (error) return console.log(error)
        if (!res.headersSent) return res.status(500).send(error);
        next();
    });

    app.use('/*', (req, res) => {
        res.status(404).send({ status: 0, message: 'No such endpoint' });
    }); // default entry 
}