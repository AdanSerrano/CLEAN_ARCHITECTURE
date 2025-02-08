import * as schema from './schema';

import { NeonTransaction, drizzle } from 'drizzle-orm/neon-http';

import { TablesRelationalConfig } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

export type Transaction = NeonTransaction<typeof schema, TablesRelationalConfig>;