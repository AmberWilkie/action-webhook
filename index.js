const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios').default

const callWebhook = async _ => {
  try {
    const url = core.getInput('webhook_url');
    console.log(`url: ${url}!`);
    const payload = JSON.stringify(github.context.payload)
    console.log(`The event payload: ${payload}`);
    const response = await axios.post(url, payload)
    if (![200, 201].includes(response.status === 200)) {
      core.setFailed('There was a problem! ', response.error);
    }
    core.setOutput('response', response.data)
  } catch (error) {
    console.log('error: ', error)
    core.setFailed(error.message);
  }
}

callWebhook()