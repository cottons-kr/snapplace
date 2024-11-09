export enum FetcherStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type CustomFetchFunction<T> = () => Promise<T | null>
