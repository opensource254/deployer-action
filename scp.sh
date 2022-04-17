#!/bin/sh

sshKey=$1
ipAddress=$2
directory=$3
username=$4

chmod 600 $sshKey

if [ -z "$sshKey" ] || [ -z "$ipAddress" ] || [ -z "$directory" ] || [ -z "$username" ]; then
    echo "Usage: $0 <sshKey> <ipAddress> <directory> <username>"
    exit 1
fi


## ssh into the server and copy the files from the local directory to the remote directory
ssh -i $sshKey $username@$ipAddress "mkdir -p $directory"
scp -i $sshKey -r ./* $username@$ipAddress:$directory
