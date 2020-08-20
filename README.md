# Simple webhook for Github Actions

This action calls a webhook with the github action event payload.

## Inputs

### `webhook_url`

**Required** The url where we will POST the event payload.

## Outputs

### `response`

The response from the webhook. Will return an empty string if there is no response. The action expects a 200 or 201 to report a success.

## Example usage

uses: amberwilkie/action-webhook@main
with:
  webhook_url: 'https://www.google.com'