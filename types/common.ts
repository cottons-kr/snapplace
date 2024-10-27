export type PayloadCallback<T> = (payload: T) => unknown

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}
