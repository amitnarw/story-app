import type { StoryCopy } from '../types';

import { hiCopy as hiBase } from './hi.base';
import { hiBatch } from './hi.batch';

/** Hand-authored launch stories followed by the imported Hindi pack. */
export const hiCopy: StoryCopy[] = [...hiBase, ...hiBatch];
