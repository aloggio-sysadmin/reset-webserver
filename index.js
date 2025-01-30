const http = require("http");
const axios = require("axios");
const { exec } = require("child_process");
const port = 3000;

const server = http.createServer(function(req, res) {
    res.end();
});

async function restart() {
    // This will wait until the response is given, might take a few seconds or a minute if response is 504
    await axios.get("https://asdasdfasdf.com/")
    .then(response => {
        // Site is working
        console.log("Site is working..");
    })
    .catch(async err => {
        let error = err;
        error.status = 504;
        
        if (error.status && error.status == 504) {
            const date = new Date(Date.now());
            const formatDate = date.toLocaleString("en-AU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });
            
            exec("sudo systemctl status tomcat", (error, stdout, stderr) => {
                if (error) {
                    console.error("Failed to restart server");
                }

                console.log("Restart tomcat success:", formatDate);
                console.log("stdout: ", stdout);
            });
        } else {
            console.log("error: ", error);
        }
    });

    await new Promise(resolve => setTimeout(resolve, 30000)); // 30000 = 30 sec, 3600000 = 1 hour
}

server.listen(port, (err) => {
    if (err) {
        console.log(`Unable to listen to port ${port}`);
        process.exit(1);
    } else {
        console.log(`Server listening on port ${port}`);
        restart();
    }
});