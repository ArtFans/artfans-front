export {}

declare global {
  interface Window {
    nearNet: string;
    userAddress: string;
    nearInitPromise: any;
  }
}
