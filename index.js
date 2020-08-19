const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default

const callWebhook = async _ => {
  try {
    const url = core.getInput('webhook_url');
    console.log(`url: ${url}!`);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
    const response = await axios.post(url, payload)
    console.log('AMBER ---------------------> response: ', response.data)
    if (!response.status === 200) {
      core.setFailed('Puffbot detects a problem!');
    }
    core.setOutput(response.data)
  } catch (error) {
    console.log('AMBER ---------------------> error:', error)
    core.setFailed(error.message);
  }
}

callWebhook()