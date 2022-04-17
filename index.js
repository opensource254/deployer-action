import core from '@actions/core';
import { exec } from '@actions/exec';

try {
    const ipAddress = core.getInput('ip-address')
    const deploymentPath = core.getInput('deployment-path')
    const sshKey = core.getInput('ssh-key')
    const now = new Date()

    // Copy the repo using scp
    const scpCommand = `scp -i ${sshKey} -r . ${ipAddress}:${deploymentPath}`
    console.log(`Executing: ${scpCommand}`)
    
    (async () => {
        await exec(scpCommand)
    })()
    core.setOutput('deployment-path', deploymentPath)
    core.setOutput('deployment-time', now.toISOString())
} catch (error) {
    core.setFailed(error)
}