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

## Troubleshooting

If the auto-deployment isn't working:

1. Check the webhook's "Recent Deliveries" tab in GitHub to see if there are any errors
2. Verify that the Payload URL is correct
3. Contact Hostinger support if you continue to have issues

## Notes

- Any push to your repository will trigger a deployment
- This includes pushes to any branch, not just the master branch
- If you want to limit deployments to a specific branch, you may need to configure this on Hostinger's side
