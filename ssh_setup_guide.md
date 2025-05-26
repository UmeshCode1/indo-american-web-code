# SSH Setup Guide for Indo American Play School Website

This guide provides detailed instructions for setting up SSH authentication between your GitHub repository and Hostinger hosting.

## Why Use SSH Authentication?

SSH (Secure Shell) provides several benefits for your deployment workflow:

1. **Security**: Uses cryptographic keys instead of passwords
2. **Convenience**: No need to enter passwords for each push
3. **Automation**: Essential for automated deployment workflows
4. **Reliability**: Less prone to authentication issues

## Step 1: Add SSH Key to GitHub

1. Log in to your GitHub account
2. Click on your profile icon in the top right corner
3. Select "Settings" from the dropdown menu
4. In the left sidebar, click on "SSH and GPG keys"
5. Click the green "New SSH key" button
6. Enter a descriptive title (e.g., "Hostinger Deployment Key")
7. In the "Key" field, paste your SSH key:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCwE4p52hYKIjYjGrT8JjUDrthHJa+hsO7yfhiVqZ7WVd7KeBnwKuNAemKoc0Aj1Vy/bHlllqSp0LOh15cHBTVWE7W6opmOk84HFHy0wkqmWCV9GTm/bkFHyW90yVaxVqOhWt7iqTlDG9lEq7pwL0zVb/nt1cL52acWCKOsbradzb+QOWiJYscJmns3bLzGI8pekv9vENxyGeWG5S481PI4wLcv8b9eMdm1xC4sxZSASKNMvhfc0aoUGd2iqMiS15aBPAkOy/W28HXwIQIdtScrppUIpFETuJJU9chYKKf9rIZd2OWHU4ijTQaRafnkbONY/BU2yOz5DIBmIVqHCMaNSeDUZo++VbHfwS8TZ6NPjd2QvpI7FfiBfLkAYXJ4eEDsNEwW/qfCJqUJkeaSVucSVXFyZyfEvw2O2GjxCm4cnqEspnCjTN/u96hQouKzhIRP3O/qXpjR8e6qWwfBovQvHFohdHxxvlOg+oHWlVmPSiW7c4JB3PaSBIXF7B3RueM= u994612207@in-mum-web1856.main-hosting.eu
```

8. Click "Add SSH key"

## Step 2: Configure Local Git Repository

If your local repository is currently using HTTPS, you'll need to update it to use SSH:

1. Open your terminal/command prompt
2. Navigate to your local repository:
   ```bash
   cd "u:\indo american web code"
   ```

3. Check your current remote URL:
   ```bash
   git remote -v
   ```

4. If it shows an HTTPS URL (like `https://github.com/UmeshCode1/indo-american-Play-School.git`), update it to use SSH:
   ```bash
   git remote set-url origin git@github.com:UmeshCode1/indo-american-Play-School.git
   ```

## Step 3: Test the SSH Connection

Test that your SSH connection is working correctly:

```bash
ssh -T git@github.com
```

You might see a warning about the authenticity of the host. Type "yes" to continue. Then you should see a message like:

```
Hi UmeshCode1! You've successfully authenticated, but GitHub does not provide shell access.
```

## Step 4: Push Using SSH

Now try pushing a change to test your SSH configuration:

```bash
# Make a small change
echo "SSH test successful $(Get-Date)" >> ssh_test.md

# Commit and push
git add ssh_test.md
git commit -m "Test SSH authentication"
git push origin master
```

If everything is configured correctly, the push will succeed without prompting for a password.

## Troubleshooting

### Issue: Permission Denied (publickey)

If you see "Permission denied (publickey)" when trying to connect to GitHub:

1. Make sure the SSH key is correctly added to your GitHub account
2. Verify that the SSH key being used matches the one added to GitHub
3. Check that your repository URL is using the SSH format (`git@github.com:...`)

### Issue: Host Key Verification Failed

If you see "Host key verification failed":

1. Remove the old host key:
   ```bash
   ssh-keygen -R github.com
   ```
2. Try connecting again, and accept the new host key when prompted

## Additional Resources

- [GitHub's guide on SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Hostinger's guide on SSH keys](https://support.hostinger.com/en/articles/1583302-how-to-generate-ssh-keys)

## Notes for Hostinger Deployment

When using Hostinger's Git deployment feature, this SSH key is already configured on the server side. This key allows your Hostinger server to authenticate with GitHub and pull updates automatically whenever changes are pushed.
