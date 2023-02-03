export type Nullable<T> = null | T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type WithChildren<P = {}> = P & { children: React.ReactNode };
