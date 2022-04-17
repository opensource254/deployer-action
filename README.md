# Deployer Action

This  action that helps you deploy applications to your VPS. Without exposing your git credentials or SSH keys

## Inputs

## `ip-address`

**Required** The public IP Address of your VPS.

## `deployment-path`

**Required** The path to your deployment directory. Defaults to `/var/www/`


## `SSH-key`

**Required** The path to your SSH key.

## Outputs

## `deployment-time`

The time the deployment was completed

## Example usage

```yml
uses: opensource254/deployer-action
with:
  - ip-address: <your-ipv4-ip>
  - deployment-path: /var/www/your-domain.com
  - SSH-key: ${{ secrets.SSH_KEY }}
```