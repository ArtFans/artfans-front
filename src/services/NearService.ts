import * as nearAPI from 'near-api-js';
import BigNumber from 'bignumber.js';

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
  balance: any;

  async init() {
    try {
      return;
      this.nearConfig = this.getConfig(process.env.NEAR_ENV || window.nearNet);

      this.near = await nearAPI.connect({
        keyStore: this.keyStore,
        ...this.nearConfig
      });

      this.walletConnection = new nearAPI.WalletConnection(this.near, null);

      await this.getCurrentUser();
      await this.initContract();
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    try {return;
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
    try {return;
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

      this.balance = await new nearAPI.Contract(
        this.walletConnection.account(),
        'tkn_artfans.near',
        {
          viewMethods: ['ft_balance_of'],
          changeMethods: [],
          // @ts-ignore
          sender: this.walletConnection.getAccountId() as string,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  getConfig(env: string) {
    return {
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      contractName: CONTRACT_NAME,
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org'
    };
  }

  async buyArtTokes(amount: string) {
    try {return;
      const res = await this.walletConnection.account().signAndSendTransaction({
        receiverId: 'market_artfans.near',
        actions: [
          nearAPI.transactions.functionCall(
            'buy_activity_ft',
            Buffer.from(JSON.stringify({
              token_series_id: '1',
              receiver_id: window.userAddress
            })),
            '30000000000000', // 30 TGas
            amount // 0.1 NEAR
          )
        ],
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new NearService();
