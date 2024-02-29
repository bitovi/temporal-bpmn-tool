# Hello World

### Running this example

1. `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).
1. `npm install` to install dependencies.
1. `npm run start.watch` to start the Worker.
1. In another shell, `npm run workflow [number]` to run the Workflow Client.
   - `0`: getUser, and calculateFees
   - `1`: getUser, calculateFees, billUser, updateUser
   - `2`: getUser, calculateFees, billUser, updateUser, sendEmail

The Workflow should return:

```bash
Steps completed: getUser,calculateFees,billUser,updateUser,sendEmail.
Found user Austin Kurpuis, calculated fees $11.96.
```
