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
    const githubWorkspace = env.GITHUB_WORKSPACE;

    const deploy = async () => {
        await exec('chmod', ['+x', `${githubWorkspace}/scp.sh`])
        await exec(`./${githubWorkspace}/scp.sh`, [sshKey, ipAddress, deploymentPath, usename])
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