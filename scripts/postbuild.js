import { writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

await writeFile(
    resolve(join(import.meta.dirname, '../.yarn.installed')),
    new Date().toISOString(),
);
