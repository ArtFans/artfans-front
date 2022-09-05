import axios from 'axios';

import type { AxiosResponse } from 'axios';

class ApiService {
  BASE_URL: string = process.env.NODE_ENV === 'development' ? 'https://artfans.io' : '';
  BASE_LIMIT: number = 15;

  private async request(
    {
      base = this.BASE_URL,
      method = 'post',
      url,
      data
    }: any
  ): Promise<AxiosResponse> {
    return axios({
      method,
      url: `${base}${url}`,
      data
    });
  }

  async getCurrency() {
    try {
      const { data } = await this.request({
        base: 'https://api.coingecko.com/api/v3',
        url: '/coins/markets?vs_currency=usd&ids=near',
        method: 'get'
      });

      const [result] = data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async saveToIpfs(text: any) {
    try {
      const { data } = await this.request({
        url: '/comments/add',
        data: { text }
      });

      return data.hash;
    } catch (error) {
      console.log(error);
    }
  }

  async getFromIpfs(hash: string) {
    try {
      const { data } = await this.request({
        base: 'https://ipfs.io/ipfs',
        url: `/${hash}`,
        method: 'get'
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getLastArts({ skip = 0, limit = this.BASE_LIMIT }): Promise<any> {
    try {
      const { data: result } = await this.request({
        url: '/arts/last',
        data: { skip, limit },
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getMyArts({ skip = 0, limit = this.BASE_LIMIT }: any) {
    try {
      const { data: result } = await this.request({
        url: '/arts/my',
        data: { skip, limit }
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getFriendsArts({ friends, skip = 0, limit = this.BASE_LIMIT }: any) {
    try {
      const { data: result } = await this.request({
        url: '/arts/friends',
        data: { friends, skip, limit }
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getArtById(id?: string): Promise<any> {
    try {
      const { data: result } = await this.request({
        method: 'get',
        url: `/arts/one/${id}`
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomUsers(): Promise<any> {
    try {
      const { data } = await this.request({
        url: '/users/random',
        method: 'get'
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

}

export default new ApiService();
