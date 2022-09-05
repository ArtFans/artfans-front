export {}

declare global {
  interface Window {
    nearNet: string;
    nearAddress: string;
    nearInitPromise: any;
  }
}
