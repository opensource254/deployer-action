const core = require('@actions/core');
const { exec } = require('@actions/exec');
const github = require('@actions/github');
try {
    const ipAddress = core.getInput('ip-address')
    const deploymentPath = core.getInput('deployment-path')
    const sshKey = core.getInput('ssh-key')
    const username = core.getInput('username')
    const now = new Date()
    const githubWorkSpace = process.env.GITHUB_WORKSPACE

    const deploy = async () => {
        await exec('ssh-keyscan', ['-H', ipAddress, '>>', '~/.ssh/known_hosts'])
        await exec('ssh', ['-o', 'StrictHostKeyChecking=no', '-i', sshKey, `${username}@${ipAddress}`, `"mkdir -p ${deploymentPath}"`])
        await exec('scp', ['-i', sshKey, '-r', './*', `${username}@${ipAddress}:${deploymentPath}`])
    }

    deploy()
    core.setOutput('deployment-path', deploymentPath)
    core.setOutput('deployment-time', now.toISOString())
} catch (error) {
    const e = new Error(error)
    core.setFailed(`Action failed with message: ${e.message}`)
    core.setFailed(e.stack)
    core.setFailed(error)
}