import type { StoryCopy } from '../types';

import { enCopy as enBase } from './en.base';
import { enBatch } from './en.batch';

/** Hand-authored launch stories followed by the imported Hindi pack. */
export const enCopy: StoryCopy[] = [...enBase, ...enBatch];
