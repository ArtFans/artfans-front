import type {ReactNode} from 'react';
import React, {createContext, useEffect, useState} from 'react';

import ApiService from '../services/ApiService';
import NearService from '../services/NearService';

export const UserContext = createContext({});

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({
    id: window.nearAddress,
    arts: [],
    profile: JSON.parse(localStorage.getItem('profile') || '{}'),
    friends: [],
    artsCount: 0
  });
  const [isLoggedIn, setLoggedIn] = useState(!!window.nearAddress.length);

  const fetchMyArts = async () => {
    const { data, count } = await ApiService.getMyArts({ limit: 15 });
    setUser((state: any) => ({
      ...state,
      arts: data || [],
      artsCount: count,
    }));
  };

  const fetchProfile = async () => {
    try {
      const profile = await NearService.contract.get_profile({
        account_id: window.nearAddress
      });

      if (profile) {
        const { image, json_metadata } = profile;
        const profileData = {
          image,
          ...JSON.parse(json_metadata)
        };

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
        image_url: `https://ipfs.io/ipfs/${ipfsHash}`,
        profile: { json_metadata },
        accountId: window.nearAddress
      });

      setUser((state: any) => ({ ...state, profile }));
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.nearAddress) {
      fetchProfile();
      fetchMyArts();
      fetchFriends();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
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
