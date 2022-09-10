import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import ApiService from '../services/ApiService';
import NearService from '../services/NearService';

export const UserContext = createContext({});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({
    id: window.nearAddress,
    arts: [],
    profile: JSON.parse(localStorage.getItem('profile') || '{}'),
    profileFilled: localStorage.getItem('profileFilled') === window.nearAddress,
    friends: [],
    artsCount: 0,
    balance: '0'
  });
  const [isLoggedIn, setLoggedIn] = useState(!!window.nearAddress.length);
  const [currency, setCurrency] = useState(0);

  const fetchMyArts = async () => {
    const { data, count } = await ApiService.getMyArts({ limit: 15 });
    setUser((state: any) => ({
      ...state,
      arts: data || [],
      artsCount: count || 0,
    }));
  };

  const fetchProfile = async () => {
    try {
      const profile = await NearService.contract.get_profile({
        account_id: window.nearAddress
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
        setLoggedIn(true);
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
        account_id: window.nearAddress,
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
        accountId: window.nearAddress
      });

      setUser((state: any) => ({ ...state, profile }));
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('profileFilled', window.nearAddress);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrency = async () => {
    const { current_price } = await ApiService.getCurrency();
    setCurrency(current_price);
  };

  const fetchBalance = async () => {
    try {
      const balance = await NearService.balance.ft_balance_of({
        account_id: window.nearAddress
      });

      setUser((state: any) => ({ ...state, balance }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.nearAddress) {
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
        updateProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
