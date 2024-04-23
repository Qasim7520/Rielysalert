import React from "react";
import styles from "./Sidebar.module.scss";
import { useLocation } from "react-router-dom";

import { SidebarItem } from "./components/SidebarItem";
import { RoutePaths } from "../../pages/routePaths";

export const Sidebar = () => {
  const { pathname } = useLocation();


  return (
    <nav className={styles.container}>
      <SidebarItem
        path={RoutePaths.Profile}
        isSelected={pathname === RoutePaths.Profile}
      >
        Profile
      </SidebarItem>

      <SidebarItem
        path={RoutePaths.Membership}
        isSelected={pathname === RoutePaths.Membership}
      >
        Membership
      </SidebarItem>

      {/* <SidebarItem
        path={RoutePaths.Referrals}
        isSelected={pathname === RoutePaths.Referrals}
      >
        Referrals
      </SidebarItem>
      <SidebarItem
        path={RoutePaths.Support}
        isSelected={pathname === RoutePaths.Support}
      >
        Support
      </SidebarItem>
      <SidebarItem
        path={RoutePaths.HowToUse}
        isSelected={pathname === RoutePaths.HowToUse}
      >
        How to use?
      </SidebarItem> */}

    </nav>
  );
};
