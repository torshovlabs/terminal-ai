#!/usr/bin/env node
import { join } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const file = join(process.cwd(), 'db.json');
const adapter = new JSONFile(file);

// Provide a default value so that if db.json is empty, lowdb knows what structure to use.
export const db = new Low(adapter, { defaultValue: { queries: [], apiKeys: [] } });

export async function initDb() {
  await db.read();
  // No need to manually set default data if you provided it in the constructor.
  await db.write();
}