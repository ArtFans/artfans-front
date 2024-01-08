import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import errorCatch from '../helpers/errorCatch';

import ApiService from '../services/ApiService';
import NearService from '../services/NearService';

import ArtModal from '../components/ArtModal';
import BuyTokens from '../components/BuyTokens';

export const UserContext = createContext({});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({
    id: window.userAddress?window.userAddress:'tester',
    arts: [],
    profile: JSON.parse(localStorage.getItem('profile') || '{}'),
    profileFilled: localStorage.getItem('profileFilled') === window.userAddress,
    friends: [],
    artsCount: 0,
    balance: '0'
  });
  const [isLoggedIn, setLoggedIn] = useState(window.userAddress&&window.userAddress.length?window.userAddress:null);
  const [currency, setCurrency] = useState(0);
  const [modal, setBuyModal] = useState<any>({ open: false, warning: '' });

  const fetchMyArts = async () => {
    const { count = 0 } = await ApiService.getMyArts({});

    setUser((state: any) => ({ ...state, artsCount: count }));
  };

  const fetchProfile = async () => {
    try {
      const profile = await NearService.contract.get_profile({
        account_id: window.userAddress
      });

      if (profile) {
        const { image_url, json_metadata } = profile;

        const profileData = JSON.parse(json_metadata);

        if (image_url) {
          profileData.image = await ApiService.getFromIpfs(image_url);
        }

        setUser((state: any) => ({
          ...state,
          profile: profileData
        }));
        setLoggedIn('true');
        localStorage.setItem('profile', JSON.stringify(profileData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = (friend: string) => {
    setUser((state: any) => ({
      ...state,
      friends: [...state.friends, friend]
    }));
  };

  const fetchFriends = async () => {
    try {
      const friends = await NearService.contract.get_account_friends({
        account_id: window.userAddress,
        from_index: '0',
        limit: '1000'
      });

      setUser((state: any) => ({
        ...state,
        friends: [...state.friends, ...friends]
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (profile: any) => {
    try {
      let ipfsHash;
      const { image, ...metadata } = profile;
      const json_metadata = JSON.stringify(metadata);

      if (image) {
        ipfsHash = await ApiService.saveToIpfs(image);
      }

      await NearService.contract.update_profile({
        profile: {
          json_metadata,
          image_url: ipfsHash
        },
        accountId: window.userAddress
      });

      setUser((state: any) => ({ ...state, profile }));
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('profileFilled', window.userAddress);
      setLoggedIn('true');
    } catch (error) {
      errorCatch(error, setBuyModal({ open: true, warning: 'insufficient funds' }));
    }
  };

  const fetchCurrency = async () => {
    const { current_price } = await ApiService.getCurrency();
    setCurrency(current_price);
  };

  const fetchBalance = async () => {
    try {
      const balance = await NearService.balance.ft_balance_of({
        account_id: window.userAddress
      });

      setUser((state: any) => ({ ...state, balance }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.userAddress) {
      fetchProfile();
      fetchMyArts();
      fetchFriends();
      fetchBalance();
    }
    fetchCurrency();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        currency,
        setLoggedIn,
        addFriend,
        updateProfile,
        setBuyModal
      }}
    >
      {children}
      <ArtModal
        open={modal.open}
        onClose={() => setBuyModal({})}
      >
        <BuyTokens warning={modal.warning} />
      </ArtModal>
    </UserContext.Provider>
  );
};

export default UserProvider;
