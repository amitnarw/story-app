import type { StoryCopy } from '../types';

import { hinglishCopy as hinglishBase } from './hinglish.base';
import { hinglishBatch } from './hinglish.batch';

/** Hand-authored launch stories followed by the imported Hindi pack. */
export const hinglishCopy: StoryCopy[] = [...hinglishBase, ...hinglishBatch];
