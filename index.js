const core = require('@actions/core');
const { exec } = require('@actions/exec');
try {
    const ipAddress = core.getInput('ip-address')
    const deploymentPath = core.getInput('deployment-path')
    const sshKey = core.getInput('ssh-key')
    const usename = core.getInput('usename')
    const now = new Date()

    const deploy = async () => {
        let output = ''
        let errorOutput = ''
        await exec('chmod', ['+x', './scp.sh'])
        await exec('./scp.sh', [sshKey, ipAddress, deploymentPath, usename], {
            listeners: {
                stdout: (data) => {
                    output += data.toString()
                },
                stderr: (data) => {
                    errorOutput += data.toString()
                }
            }
        })
    }

    deploy()
    core.setOutput('deployment-path', deploymentPath)
    core.setOutput('deployment-time', now.toISOString())
    core.setOutput('deployment-output', output)
} catch (error) {
    const e = new Error(error)
    core.setFailed(`Action failed with message: ${e.message}`)
    core.setFailed(e.stack)
    core.setFailed(error)
}