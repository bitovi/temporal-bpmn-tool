# Hello World

### Running this example

1. `docker compose up --build --detach`
1. Load the UI to make edits: [http://localhost:8080/](http://localhost:8080/)
1. In another shell, `npm run workflow [number]` to run the Workflow Client.
   - `0`: getUser, and calculateFees
   - `1`: getUser, calculateFees, billUser, updateUser
   - `2`: getUser, calculateFees, billUser, updateUser, sendEmail

The Workflow should return:

```bash
Steps completed: getUser,calculateFees,billUser,updateUser,sendEmail.
Found user Austin Kurpuis, calculated fees $11.96.
```
