import type { HTMLAttributes, RefObject } from 'react';

type HTMLAttributesWithRef<T> = HTMLAttributes<T> & { ref?: RefObject<T> };

export type { HTMLAttributesWithRef };
