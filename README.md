# NASA-SpaceApps-2020

Description | Value | Link
----------- | ------------ | ------------
Challenge   | Can You Hear Me Now? | https://2020.spaceappschallenge.org/challenges/connect/can-you-hear-me-now/details
Team        | HelloMars | https://2020.spaceappschallenge.org/challenges/connect/can-you-hear-me-now/teams/hellomars/project


![Image of Infrastructure](docs/infrastructure.png)

# Development

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [sls](https://www.serverless.com/framework/docs/getting-started/)


## Configure AWS CLI

```bash
export AWS_ACCESS_KEY_ID=<access_key_id>
export AWS_SECRET_ACCESS_KEY=<secret_access_key>
export AWS_DEFAULT_REGION=<region>
```



# Deployment

Satellite Tracker deployment:
```bash
sls deploy
```

How to create stack:
```bash
STACK_NAME="nasa-challenge"
aws --profile home cloudformation create-stack \
    --stack-name $STACK_NAME \
    --template-body file://infrastructure/hellomars.yml \
    --timeout-in-minutes 10 \
    --parameters <value>
```

How to update stack:
```bash
STACK_NAME="nasa-challenge"
aws --profile home cloudformation create-change-set \
    --stack-name $STACK_NAME \
    --change-set-name=update-$(date +%s) \
    --template-body file://infrastructure/hellomars.yml \
    --parameters <value>
```

# Testing

To test Satellite Tracker execute:
```bash
sls invoke -f satellite_tracker --path data.json
```
