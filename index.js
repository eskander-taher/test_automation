const { exec } = require("child_process");

function executeShellCommand(command) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command);

    let stdoutData = "";
    let stderrData = "";

    childProcess.stdout.on("data", (data) => {
      stdoutData += data;
    });

    childProcess.stderr.on("data", (data) => {
      stderrData += data;
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve(stdoutData);
      } else {
        reject(new Error(stderrData));
      }
    });
  });
}

async function commitChanges() {
  try {
    const gitAdd = await executeShellCommand("git add .");
    console.log(gitAdd);

    const gitCommit = await executeShellCommand(`git commit -m "add solution"`);
    console.log(gitCommit);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

commitChanges();
