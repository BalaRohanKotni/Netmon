const { exec } = require('child_process')

function installOoklaSpeedTestCLI() {
    exec('node -p "process.arch"', function (err, data, getter) {
        if (err) {
            console.log("error", err.message);
            return;
        }

        function script(url) {
            return `mkdir ookla && wget -O ookla.tgz ${url}  && tar -xvf ookla.tgz -C ookla && rm ookla.tgz`
        }

        if (data.trim() == "x64" || data.trim() == "x86_64") {
            url = 'https://install.speedtest.net/app/cli/ookla-speedtest-1.0.0-x86_64-linux.tgz'
            exec(script(url), function (err, data, getter) {
                if (err) {
                    console.log("Error:", err)
                    return;
                }
                console.log(data);
            });
        }
        else if (data.trim() == "arm") {
            url = 'https://install.speedtest.net/app/cli/ookla-speedtest-1.0.0-arm-linux.tgz'
            exec(script(url), function (err, data, getter) {
                if (err) {
                    console.log("Error:", err)
                    return;
                }
                console.log(data);
            });
        }
        else if (data.trim() == 'armhf') {
            url = 'https://install.speedtest.net/app/cli/ookla-speedtest-1.0.0-armhf-linux.tgz'
            exec(script(url), function (err, data, getter) {
                if (err) {
                    console.log("Error:", err)
                    return;
                }
                console.log(data);
            });
        }
        else if (data.trim() == 'aarch64' || data.trim() == 'arm64') {
            url = 'https://install.speedtest.net/app/cli/ookla-speedtest-1.0.0-aarch64-linux.tgz'
            exec(script(url), function (err, data, getter) {
                if (err) {
                    console.log("Error:", err)
                    return;
                }
                console.log(data);
            });
        }
        else if (data.trim() == 'i386') {
            url = 'https://install.speedtest.net/app/cli/ookla-speedtest-1.0.0-i386-linux.tgz'
            exec(script(url), function (err, data, getter) {
                if (err) {
                    console.log("Error:", err)
                    return;
                }
                console.log(data);
            });
        }
    });
}

module.exports.installOoklaSpeedTestCLI = installOoklaSpeedTestCLI;