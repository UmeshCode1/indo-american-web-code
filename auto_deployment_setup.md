# Setting Up Auto-Deployment for Indo American Play School Website

This guide walks you through setting up automatic deployment from your GitHub repository to your Hostinger hosting.

## Step 1: Access GitHub Webhook Settings

1. Navigate to your repository: `https://github.com/UmeshCode1/indo-american-Play-School`
2. Go to "Settings" (tab at the top of your repository)
3. Click on "Webhooks" in the left sidebar
4. Click the "Add webhook" button

## Step 2: Configure the Webhook

Fill in the following information on the "Add webhook" page:

1. **Payload URL**: `https://webhooks.hostinger.com/deploy/a09f3dda408e91f74332abea9181c5f0`

2. **Content type**: Select `application/json` from the dropdown menu

3. **Secret**: Leave this blank (unless Hostinger has provided you with a specific secret token)

4. **SSL verification**: Keep this enabled (recommended for security)

5. **Which events would you like to trigger this webhook?**:
   - Select "Just the push event" (recommended setting)

6. **Active**: Make sure this checkbox is selected

7. Click the green "Add webhook" button at the bottom of the page

## Step 3: Verify Webhook Setup

After adding the webhook, GitHub will send a ping event to test the connection. You can verify this worked by:

1. Going back to the Webhooks page
2. Checking that your new webhook has a green checkmark
3. If there's a red exclamation mark, click on the webhook and check the "Recent Deliveries" tab to see what went wrong

## Step 4: Test the Deployment

To test that the auto-deployment is working:

1. Make a small change to your repository (e.g., edit a file)
2. Commit and push the change
3. Check your Hostinger website after a few minutes to see if the change has been deployed

## Additional Step: Setting Up SSH Key Authentication

To enable secure deployments using SSH authentication:

### Step 1: Add the SSH Key to GitHub

1. Go to your GitHub account settings
2. Click on "SSH and GPG keys" in the sidebar
3. Click "New SSH key"
4. Give your key a descriptive title like "Hostinger Deployment Key"
5. In the "Key" field, paste the following SSH key:
   ```
   ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCwE4p52hYKIjYjGrT8JjUDrthHJa+hsO7yfhiVqZ7WVd7KeBnwKuNAemKoc0Aj1Vy/bHlllqSp0LOh15cHBTVWE7W6opmOk84HFHy0wkqmWCV9GTm/bkFHyW90yVaxVqOhWt7iqTlDG9lEq7pwL0zVb/nt1cL52acWCKOsbradzb+QOWiJYscJmns3bLzGI8pekv9vENxyGeWG5S481PI4wLcv8b9eMdm1xC4sxZSASKNMvhfc0aoUGd2iqMiS15aBPAkOy/W28HXwIQIdtScrppUIpFETuJJU9chYKKf9rIZd2OWHU4ijTQaRafnkbONY/BU2yOz5DIBmIVqHCMaNSeDUZo++VbHfwS8TZ6NPjd2QvpI7FfiBfLkAYXJ4eEDsNEwW/qfCJqUJkeaSVucSVXFyZyfEvw2O2GjxCm4cnqEspnCjTN/u96hQouKzhIRP3O/qXpjR8e6qWwfBovQvHFohdHxxvlOg+oHWlVmPSiW7c4JB3PaSBIXF7B3RueM= u994612207@in-mum-web1856.main-hosting.eu
   ```
6. Click "Add SSH key"

### Step 2: Update Remote URL (If Using HTTPS)

If you're currently using HTTPS to connect to your GitHub repository, you'll need to update it to use SSH:

1. Check your current remote URL:
   ```bash
   git remote -v
   ```

2. If it shows an HTTPS URL (https://github.com/...), update it to SSH:
   ```bash
   git remote set-url origin git@github.com:UmeshCode1/indo-american-Play-School.git
   ```

### Step 3: Test the Connection

Test that your SSH connection is working correctly:

```bash
ssh -T git@github.com
```

You should see a message confirming your authentication.

### Benefits of SSH Key Authentication

- No need to enter passwords when pushing changes
- More secure than password authentication
- Required for some automated deployment workflows
- Works seamlessly with the webhook auto-deployment system

## Troubleshooting

If the auto-deployment isn't working:

1. Check the webhook's "Recent Deliveries" tab in GitHub to see if there are any errors
2. Verify that the Payload URL is correct
3. Contact Hostinger support if you continue to have issues

## Notes

- Any push to your repository will trigger a deployment
- This includes pushes to any branch, not just the master branch
- If you want to limit deployments to a specific branch, you may need to configure this on Hostinger's side
