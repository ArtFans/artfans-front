import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import formatNumber from 'src/helpers/formatNumber';

import TBA from '../TBA';
import Stat from '../Stat';
import Avatar from '../Avatar';
import Dropdown from '../Dropdown';
import ArtButton from '../ArtButton';
import Grid, { GridCell } from '../Grid';

import { UserContext } from 'src/providers/UserProvider';

export const HeaderMenuUser = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setVisibility] = useState(false);

  const { user, setBuyModal } = useContext<any>(UserContext);

  const onAvatarClick = (event: Event) => {
    event.preventDefault();
    setVisibility(!dropdownVisible);
  }

  const onEditProfile = (event: Event) => {
    event.preventDefault();
    setVisibility(false);
    navigate('/settings/profile');
  };

  const onBuyClick = () => {
    setBuyModal({ open: true });
    setVisibility(false);
  };

  return (
    <>
      <div className="header-menu__nav-item header-menu__user">
        <Avatar
          url={user.profile.image}
          name={user.profile.name || user.id}
          onClick={onAvatarClick}
        />
        <Dropdown
          className="header-menu__user-dropdown"
          open={dropdownVisible}
          onClickOutside={() => setVisibility(!dropdownVisible)}
        >
          <div className="header-menu__user-block">
            <div className="header-menu__user-wallet">
              <div className="header-menu__user-title">
                My Wallet
              </div>
              <div className="header-menu__user-balance header-menu__user-balance--md">
                {formatNumber(user.balance, true)} <span>AAF</span>
              </div>
            </div>
            <ArtButton
              as="button"
              icon="plus"
              className="header-menu__user-add"
              onClick={onBuyClick}
            />
          </div>
          <div className="header-menu__user-block">
            <TBA />
            <div className="header-menu__user-wallet">
              <div className="header-menu__user-title">
                Transaction Fees
              </div>
              <Grid>
                <GridCell rows={2}>
                  <Stat
                    prefix="$ "
                    value={450}
                    name="last 24 hours"
                    className="header-menu__stat"
                  />
                </GridCell>
                <GridCell rows={2}>
                  <Stat
                    prefix="$ "
                    value={4433}
                    name="total"
                    className="header-menu__stat"
                  />
                </GridCell>
              </Grid>
            </div>
          </div>
          <ArtButton onClick={onEditProfile} size="small">
            Edit Profile
          </ArtButton>
        </Dropdown>
      </div>
    </>
  );
};
