const { exec } = require("child_process");
const path = require("path");

// Paths for the Ansible playbook
const playbookPath = path.join(__dirname, "main.yml");

// SSH details for the VPS
const vpsIP = "<192.168.1.100>"; // Replace with your VPS IP
const sshUser = "<ubuntu>"; // Replace with your SSH username
const privateKeyPath = "<~/.ssh/id_rsa>"; // Replace with the path to your SSH private key file

// Function to run the Ansible playbook
function runAnsiblePlaybook() {
  console.log("Starting Ansible Playbook...");

  // Command to execute the playbook with host details
  const command = `ansible-playbook ${playbookPath} -u ${sshUser} -i ${vpsIP}, --private-key ${privateKeyPath}`;

  // Execute the command
  const process = exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });

  // Print real-time output
  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  process.stderr.on("data", (data) => {
    console.error(data.toString());
  });
}

// Start the playbook execution
runAnsiblePlaybook();
