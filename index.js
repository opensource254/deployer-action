const core = require('@actions/core');
const { exec } = require('@actions/exec');

try {
    const ipAddress = core.getInput('ip-address')
    const deploymentPath = core.getInput('deployment-path')
    const sshKey = core.getInput('ssh-key')
    const now = new Date()
    
    (async () => {
        await exec('scp', ['-i', sshKey, '-r', '.', ipAddress, deploymentPath])
    })()
    core.setOutput('deployment-path', deploymentPath)
    core.setOutput('deployment-time', now.toISOString())
} catch (error) {
    core.setFailed(`Action failed with error ${error}`);
}