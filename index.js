const core = require('@actions/core');
const { exec } = require('@actions/exec');
const github = require('@actions/github');
try {
    const ipAddress = core.getInput('ip-address')
    const deploymentPath = core.getInput('deployment-path')
    const sshKey = core.getInput('ssh-key')
    const usename = core.getInput('usename')
    const now = new Date()

    const env = process.env;
    const actionPath = env.GITHUB_ACTION_PATH

    const deploy = async () => {
        await exec('chmod', ['+x', './scp.sh'])
        await exec(`./scp.sh`, [sshKey, ipAddress, deploymentPath, usename])
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