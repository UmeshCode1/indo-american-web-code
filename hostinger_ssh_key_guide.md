# Hostinger SSH Key Configuration Guide

This guide explains how to use the SSH key provided by Hostinger for deployment.

## The SSH Key

The SSH key provided by Hostinger:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCwE4p52hYKIjYjGrT8JjUDrthHJa+hsO7yfhiVqZ7WVd7KeBnwKuNAemKoc0Aj1Vy/bHlllqSp0LOh15cHBTVWE7W6opmOk84HFHy0wkqmWCV9GTm/bkFHyW90yVaxVqOhWt7iqTlDG9lEq7pwL0zVb/nt1cL52acWCKOsbradzb+QOWiJYscJmns3bLzGI8pekv9vENxyGeWG5S481PI4wLcv8b9eMdm1xC4sxZSASKNMvhfc0aoUGd2iqMiS15aBPAkOy/W28HXwIQIdtScrppUIpFETuJJU9chYKKf9rIZd2OWHU4ijTQaRafnkbONY/BU2yOz5DIBmIVqHCMaNSeDUZo++VbHfwS8TZ6NPjd2QvpI7FfiBfLkAYXJ4eEDsNEwW/qfCJqUJkeaSVucSVXFyZyfEvw2O2GjxCm4cnqEspnCjTN/u96hQouKzhIRP3O/qXpjR8e6qWwfBovQvHFohdHxxvlOg+oHWlVmPSiW7c4JB3PaSBIXF7B3RueM= u994612207@in-mum-web1856.main-hosting.eu
```

## What This SSH Key Is For

This SSH key has been generated by Hostinger for your hosting account. It serves two main purposes:

1. **Repository Authentication**: When added to GitHub, it allows your Hostinger server to pull code from your private GitHub repository.

2. **Automated Deployments**: It enables the auto-deployment system to function, updating your website automatically when you push changes.

## How to Add This Key to GitHub

1. Log in to your GitHub account
2. Go to Settings → SSH and GPG keys
3. Click "New SSH key"
4. Title: "Hostinger Deployment Key" 
5. Key type: "Authentication Key"
6. Paste the SSH key above into the "Key" field
7. Click "Add SSH key"

## Important Notes

- This key belongs to your Hostinger server, not your local machine
- You do not need this key on your local computer
- The key is already properly configured on your Hostinger hosting account
- This key allows Hostinger to authenticate with GitHub when deploying your website

## Troubleshooting

If automatic deployments are not working after adding this key:

1. Verify the key is correctly added to GitHub
2. Check that the repository URL in Hostinger's deployment settings uses SSH format (`git@github.com:username/repo.git`)
3. Make sure the webhook is properly configured as described in the auto_deployment_setup.md file

## Hostinger's Git Deployment Flow

1. You push changes to GitHub
2. GitHub sends a webhook notification to Hostinger
3. Hostinger uses this SSH key to authenticate with GitHub
4. Hostinger pulls the latest changes from your repository
5. Your website is automatically updated

For more information, contact Hostinger support or refer to their documentation on Git deployments.
