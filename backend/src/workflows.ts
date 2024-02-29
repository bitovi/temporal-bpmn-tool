import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const proxiedActivities = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function billUser(userId: string, sequenceVersion: string): Promise<string> {
  const activitySequence = await proxiedActivities.getActivitySequence(sequenceVersion);
  const activityNames = activitySequence.map(({ name }) => name);

  console.log(`Running sequence: ${activityNames}...`);
  
  if (activitySequence) {
    let nextArg: any = userId;
    for (let i = 0; i < activitySequence.length; i++) {
      const taskName = activitySequence[i].name;
      const activity = proxiedActivities[taskName as keyof typeof activities];
      if (!activity) {
        throw new Error('Invalid activity name!');
      }
      nextArg = await activity(nextArg);
    }

    return `Steps completed: ${activityNames}.
Found user ${nextArg.user.firstName} ${
  nextArg.user.lastName
}, calculated fees $${nextArg.fees.total.toFixed(2)}.`;
  }

  throw new Error("Failed to parse BPMN!");
}
