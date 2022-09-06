import * as nearAPI from 'near-api-js';

// arts_artfans.near
// lepota.near
// guest-book.testnet
// getprofile.near
// sur1.testnet
const CONTRACT_NAME = process.env.CONTRACT_NAME || 'arts_artfans.near';

class NearService {
  near: any;
  walletConnection: any;
  nearConfig: any;
  keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  currentUser: any;
  contract: any;

  async init() {
    try {
      this.nearConfig = this.getConfig(process.env.NEAR_ENV || window.nearNet);

      this.near = await nearAPI.connect({
        keyStore: this.keyStore,
        ...this.nearConfig
      });

      this.walletConnection = new nearAPI.WalletConnection(this.near, null);

      await this.getCurrentUser();
      await this.initContract();
      console.log(this.contract);
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {
      if (this.walletConnection.getAccountId()) {
        const { amount: balance } = await this.walletConnection.account().state();

        this.currentUser = {
          accountId: this.walletConnection.getAccountId(),
          balance,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async initContract() {
    try {
      this.contract = await new nearAPI.Contract(
        this.walletConnection.account(),
        this.nearConfig.contractName,
        {
          viewMethods: [
            'get_post_messages',
            'get_post_message',
            'get_post_likes',
            'get_message_likes',
            'get_profile',
            'get_account_last_likes',
            'get_account_friends',
            'get_current_settings',
            'get_post_likes_info',
            'get_message_likes_info'
          ],
          changeMethods: [
            'add_message_to_post',
            'add_message_to_message',
            'like_message',
            'unlike_message',
            'like_post',
            'unlike_post',
            'add_friend',
            'update_profile',
            'update_settings',
            'remove_friend'
          ],
          // @ts-ignore
          sender: this.walletConnection.getAccountId() as string,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  getConfig(env: string) {
    switch(env) {
      case 'mainnet':
        return {
          networkId: 'mainnet',
          nodeUrl: 'https://rpc.mainnet.near.org',
          contractName: CONTRACT_NAME,
          walletUrl: 'https://wallet.near.org',
          helperUrl: 'https://helper.mainnet.near.org'
        };
      case 'production':
      case 'development':
      case 'testnet':
        return {
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          contractName: CONTRACT_NAME,
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org'
        };
      case 'betanet':
        return {
          networkId: 'betanet',
          nodeUrl: 'https://rpc.betanet.near.org',
          contractName: CONTRACT_NAME,
          walletUrl: 'https://wallet.betanet.near.org',
          helperUrl: 'https://helper.betanet.near.org'
        };
      case 'local':
        return {
          networkId: 'local',
          nodeUrl: 'http://localhost:3030',
          keyPath: `${process.env.HOME}/.near/validator_key.json`,
          walletUrl: 'http://localhost:4000/wallet',
          contractName: CONTRACT_NAME
        };
      case 'test':
      case 'ci':
        return {
          networkId: 'shared-test',
          nodeUrl: 'https://rpc.ci-testnet.near.org',
          contractName: CONTRACT_NAME,
          masterAccount: 'test.near'
        };
      case 'ci-betanet':
        return {
          networkId: 'shared-test-staging',
          nodeUrl: 'https://rpc.ci-betanet.near.org',
          contractName: CONTRACT_NAME,
          masterAccount: 'test.near'
        };
      default:
        throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
  }
}

export default new NearService();
