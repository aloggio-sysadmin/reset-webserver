const http = require("http");
const port = 3000;

const server = http.createServer(function(req, res) {
    res.write("Hello!");
    res.end();
});

server.listen(port, (err) => {
    if (err) {
        console.log(`Unable to listen to port ${port}`);
    } else {
        console.log(`Server listening on port ${port}`);
    }
});