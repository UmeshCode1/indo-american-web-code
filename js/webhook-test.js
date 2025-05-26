// webhook-test.js - A simple script to verify webhooks are working
console.log("Webhook test - Auto-deployment verification");

// Get current date and time
const now = new Date();
document.addEventListener('DOMContentLoaded', function() {
    // This will only execute if included in an HTML file
    console.log("Webhook test script loaded at: " + now.toString());
    
    // Create a hidden element with the deploy time
    const deployTimeElement = document.createElement('div');
    deployTimeElement.id = 'auto-deploy-timestamp';
    deployTimeElement.style.display = 'none';
    deployTimeElement.dataset.deployTime = now.toString();
    document.body.appendChild(deployTimeElement);
});

// This comment can be updated to test the webhook
// Last webhook test: May 26, 2025 - Auto-deployment test confirmed
