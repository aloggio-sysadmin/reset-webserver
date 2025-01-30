const axios = require("axios");
const { exec } = require("child_process");

async function restart() {
    while (true) {
        // This will wait until the response is given, might take a few seconds or a minute if response is 504
        await axios.get("https://aasdfsdfdsfsdfsdfbode.com/")
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
                
                // exec("sudo systemctl restart tomcat", (error, stdout, stderr) => {
                exec("date", (execError, stdout, stderr) => {
                    if (execError) {
                        console.log("Failed to restart tomcat server: ", execError);
                        console.log("stdout: ", stdout);
                        console.log("stderr: ", stderr);
                    } else {
                        console.log("Restart tomcat success:", formatDate, stdout, execError, stderr);
                    }
                });
            } else {
                console.log("error: ", error);
            }
        });

        await new Promise(resolve => setTimeout(resolve, 10000)); // 300000 = 5 minutes // 10000 = 10 seconds
    }
}

restart();