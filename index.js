const axios = require("axios");
const { exec } = require("child_process");

async function restart() {
    while (true) {
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

        await axios.get("https://aabode.com/")
        .then(response => {
            // Site is working
            console.log("Site is working: ", formatDate);
        })
        .catch(async error => {
            if (error.status && error.status == 504) {
                exec("sudo systemctl restart tomcat", (execError, stdout, stderr) => {
                // exec("date", (execError, stdout, stderr) => {
                    if (execError) {
                        console.log("Failed to restart tomcat server: ", execError);
                        console.log("stdout: ", stdout);
                        console.log("stderr: ", stderr);
                    } else {
                        console.log("Restart tomcat success:", formatDate);
                    }
                });
            } else {
                console.log("error: ", error);
            }
        });

        await new Promise(resolve => setTimeout(resolve, 300000)); // 300000 = 5 minutes // 10000 = 10 seconds
    }
}

restart();