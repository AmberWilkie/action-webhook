const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default

const callWebhook = async _ => {
  try {
    // `who-to-greet` input defined in action metadata file
    const url = core.getInput('webhook_url');
    console.log(`url: ${url}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    const response = await axios.post(url, payload)
    console.log('AMBER ---------------------> ', response)
    return response.json()
  } catch (error) {
    console.log('AMBER ---------------------> ', error)
    core.setFailed(error.message);
  }
}

callWebhook()