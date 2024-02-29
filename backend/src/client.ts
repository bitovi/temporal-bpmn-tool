import { Connection, Client } from '@temporalio/client';
import { billUser } from './workflows';
import { nanoid } from 'nanoid';

const { TEMPORAL_ADDRESS = 'localhost:7233' } = process.env;
const sequenceVersion = process.argv[2] || '2';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: TEMPORAL_ADDRESS });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(billUser, {
    taskQueue: 'hello-world',
    // type inference works! args: [name: string]
    args: ['0123456789', sequenceVersion],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
