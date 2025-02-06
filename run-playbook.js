const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Paths for Ansible files
const playbookPath = path.join(__dirname, "main.yml");

// Retrieve VPS details from environment variables
const vpsIP = process.env.VPS_IP;  // Set in Render's dashboard
const sshUser = process.env.SSH_USER;  // Set in Render's dashboard
const privateKeyPath = "/etc/ssh/private_key.pem";  // Path to the private key uploaded to the Render instance

// Function to run the Ansible playbook
function runAnsiblePlaybook() {
  console.log("Starting Ansible Playbook...");

  // Command to execute the playbook with inline host and key details
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
