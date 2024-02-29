import fs from 'fs';
import path from 'path';
import BpmnModdle from 'bpmn-moddle';

const moddle = new BpmnModdle();

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  previousBillingDate: string;
}

interface Fees {
  subTotal: number;
  total: number;
  tax: number;
}

export async function getActivitySequence(diagram: string): Promise<{ name: string }[]> {
  // TODO load from a DB
  const bpmn = await fs.promises.readFile(path.join(process.cwd(), `bpmn-examples/diagram-${diagram}.bpmn`), 'utf8');

  // The types are wrong :(
  const bpmnTree = (await moddle.fromXML(bpmn)) as any;
  const tasks: { name: string }[] = bpmnTree?.rootElement?.rootElements?.[0]?.flowElements?.filter(
    (element: { $type: string }) => {
      return element.$type === 'bpmn:Task';
    }
  );

  return tasks;
}

export async function getUser(userId: string): Promise<{ user: User }> {
  // TODO lookup user dynamically
  console.log(`Getting user ${userId}...`);
  return {
    user: {
      id: '0123456789',
      firstName: 'Austin',
      lastName: 'Kurpuis',
      email: "a@kurpuis.com",
      previousBillingDate: '2024-02-28T18:12:22.173Z',
    },
  };
}

export async function calculateFees({ user }: { user: User }): Promise<{ user: User; fees: Fees }> {
  // TODO calculate fees
  console.log(`Calculating fees for ${user.id}...`);
  const fees = {
    subTotal: 10.99,
    total: 10.99 * 1.0886,
    tax: 10.99 * 0.0886,
  };
  return { user, fees };
}

export async function billUser({ user, fees }: { user: User; fees: Fees }): Promise<{ user: User; fees: Fees }> {
  // TODO bill user
  console.log(`Billing user ${user.id} ${fees.total}...`);
  return { user, fees };
}

export async function updateUser({ user, fees }: { user: User; fees: Fees }): Promise<{ user: User; fees: Fees }> {
  // TODO update user record
  console.log(`Updating user ${user.id}...`);
  user.previousBillingDate = new Date().toISOString();
  return { user, fees };
}

export async function sendEmail({ user, fees }: { user: User; fees: Fees }): Promise<{ user: User; fees: Fees }> {
  // TODO sent email to user
  console.log(`Sending email to ${user.email}...`);
  return { user, fees };
}