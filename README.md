# HypeFalcon

![build](https://github.com/jocrah/hypefalcon/actions/workflows/ci.yml/badge.svg)

## About
Hypefalcon is a Slackbot that allows you to create a recognition of someone else's efforts and to make it available through a simple Slack command.
## Features

-  Users can recognize teammates' efforts

-  Users can modify/edit the recognition

-  Users can delete a recognition

-  Users may display the most recent hypes

-  Users may display a teammate's  notable recognitions over time

  
## Requirements
1. MongoDB
1. Slack app, [Create one here.](https://api.slack.com/apps)
2. Adding Slash command (`\kudo`) for app

## Setup

Clone the project

```bash
  git clone https://github.com/jocrah/hypefalcon
```

Go to the project directory

```bash
  cd hypefalcon
```

Install dependencies

```bash
  npm i
```


To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`

`SLACK_OAUTH_TOKEN`


Start the server

```bash
  npm run start
```

Expose server on served port via ngrok or any preferred tool and update the `Request URL` field under the earlier added slack command.

It should have the following format
```
https://<generated-url>/kudos/slack
```



  
## Usage

- User can recognize a team member's effort using the Slack command: `/kudo add <slack-id> <text>` where:

    -   `<slack-id>` defines the individual receiving the recognition
    -   `<text>` is your kudo for that person

- User can modify/edit kudo using the Slack command: `/kudo replace <kudo-id> <text>` where:

    -   `<action>` is 'replace' or 'delete'
    -   `<kudo-id>` is the kudo identifier
    -   `<text>` is your kudo for that person

-  User can delete a kudo using the Slack command: `/kudo delete <kudo-id>`

- User may display the most recent _n_ kudos using the Slack command: `/kudo list <n>` where `n` is an integer or `*` for all kudos

- User may display all kudos for an individual with the Slack command: `/kudo user <slack-id>`

  
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

  
## Tech Stack

Node, Express, MongoDB

  