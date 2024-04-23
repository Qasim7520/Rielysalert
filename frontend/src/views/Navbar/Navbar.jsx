import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { RoutePaths } from "../../pages/routePaths";
import { MaxWidth } from "../../components";

import Cookies from 'js-cookie';

import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { SidebarItem } from "../Sidebar/components/SidebarItem";
import RAlogo from "../../../src/resources/images/logo.png"
import { useDispatch } from "react-redux";
import { authActions } from "../../redux toolkit/store";

export const Navbar = () => {
  let isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const push = useNavigate();
  const { pathname, hash } = useLocation();
  const token = Cookies.get('token')
  // const userDetail = useSelector((state) => state.authReducer.userDetail);
  const userDetail = token;

  console.log('userDetail', userDetail)



  const logoutUser = async () => {
    Cookies.remove('token');
    dispatch(authActions.logout());
    setTimeout(() => {

      push("/login");
    }, 100);
  }

  const getHomeRoute = () => {
    if (userDetail === null) {
      return `${RoutePaths.Root}`;
    } else {
      return `${RoutePaths.Profile}`;
    }
  };

  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
    // document.body.style.overflowY = showNav ? 'scroll' : 'hidden';
  };

  const closeNav = () => {
    setShowNav(false);
    // document.body.style.overflowY = 'scroll';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeNav();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (

    <>
      <nav className={styles.navbar}>
        <MaxWidth>
          <div className={styles.container}>
            <Link className={styles.logoContainer} to={getHomeRoute()}>

              <img src={RAlogo} width="130" height="55" alt="" />
            </Link>

            <div className={styles.NavToggle} onClick={toggleNav}>
              {showNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>

                </>
              )}
            </div>

            <div className={`${styles.navItemsContainer} ${showNav ? styles.active : ''}`}>
              {userDetail === null || userDetail == undefined ? (
                <React.Fragment>

                  <Link className={`${styles.navItem} ${pathname === RoutePaths.Login && styles.selected}`} to={`${RoutePaths.Login}`}>
                    Login
                  </Link>
                  <Link className={`${styles.navItem} ${pathname === RoutePaths.Join && styles.selected}`} to={`${RoutePaths.Join}`}>
                    Signup
                  </Link>
                </React.Fragment>
              ) : (

                <>

                  <div className={styles.mobilehide}>
                    {/* <Link className={`${styles.navItem}`} to={`${RoutePaths.Root}`}>
                      Home
                    </Link>
                    <Link className={`${styles.navItem}`} to={`${RoutePaths.Profile}`}>
                      Dashboard
                    </Link> */}

                    <button className={styles.navbtn} style={{ background: 'linear-gradient( rgb(248, 29, 30), rgb(170, 5, 6))', color: 'white' }} onClick={() => logoutUser()}>
                      Logout
                    </button>
                    {/* <button className={styles.navbtn} onClick={handleButtonClick}>Add Poundsqueeze Extension</button> */}
                  </div>

                  <div className={`${styles.additionalNavItems}`}>
                    <div style={{ display: "flex", flexDirection: "column", paddingTop: "25px" }}>
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
                        path={RoutePaths.Login}
                        onClick={() => { logoutUser() }}
                      >
                        Log Out
                      </SidebarItem> */}
                      <Link className={`${styles.navItem}`} onClick={() => { logoutUser() }}>
                        <div style={{ fontFamily: 'Poppins', fontSize: '20px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', textDecoration: 'none' }} >
                          Log Out
                        </div>

                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </MaxWidth>
      </nav>

    </>
  );
};






// <nav className={styles.navbar}>
//   <MaxWidth>
//     <div className={styles.container}>
//       <Link className={styles.logoContainer} to={getHomeRoute()}>
//         <Logo />
//       </Link>
//       <div className={styles.navItemsContainer}>
//         {userDetail === null || userDetail?.user == undefined ? (
//           <React.Fragment>
//             {/* <Link
//               className={`${styles.navItem} ${pathname === RoutePaths.Pricing &&
//                 hash === "#Pricing" &&
//                 styles.selected
//                 }`}
//               to={`${RoutePaths.Pricing}#Pricing`}
//             >
//               Pricing
//             </Link> */}
//             <Link
//               className={`${styles.navItem} ${pathname === RoutePaths.Pricing &&
//                 hash === "#FAQ" &&
//                 styles.selected
//                 }`}
//               to={`${RoutePaths.Pricing}#FAQ`}
//             >
//               FAQ
//             </Link>
//             <Link
//               className={`${styles.navItem} ${pathname === RoutePaths.Login && styles.selected
//                 }`}
//               to={`${RoutePaths.Login}`}
//             >
//               Login
//             </Link>
//             <Link
//               className={`${styles.navItem} ${pathname === RoutePaths.Signup && styles.selected
//                 }`}
//               to={`${RoutePaths.Signup}`}
//             >
//               Join
//             </Link>
//             {/* <button onClick={() => push(`${RoutePaths.Login}`)}>
//               Dashboard
//             </button> */}
//           </React.Fragment>
//         ) : (
//           <>
//             <Link
//               className={`${styles.navItem}`}
//               to={`${RoutePaths.Root}`}
//             >
//               Home
//             </Link>
//             <Link
//               className={`${styles.navItem}`}
//               to={`${RoutePaths.Profile}`}
//             >
//               Dashboard
//             </Link>
//             <button style={{ background: "black", color: "white" }} onClick={() => { logoutUser() }}>Logout</button>
//             <button onClick={handleButtonClick}>Add Poundsqueeze Extension</button>

//           </>
//         )}
//       </div>
//     </div>
//   </MaxWidth>
// </nav>