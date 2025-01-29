const http = require("http");
const port = 3001;

const server = http.createServer(function(req, res) {
    res.write("Hellooo");
    res.end();
});

server.listen(port, (err) => {
    if (err) {
        console.log(`Unable to connect to port ${port}`);
    } else {
        console.log(`Server listening on port ${port}`);
    }
});