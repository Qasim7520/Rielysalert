import React, {useState, useEffect} from 'react'
import styles from './Membership.module.scss'
import { Layout } from '../../views/Layout'
import { Separator } from '../../components'
import { useNotification } from "../../hooks/notificationProvider";
import { Plans } from '../BillingPage/components/Plans/Plans';
import { getUserData } from '../../Api/businessprofile';
import Cookies from 'js-cookie';



const Membership = () => {
    const { triggerNotification } = useNotification();
    const [userData,setUserData] = useState();
    const [productsLoading, setProductsLoading] = useState(false);
  
   
    const token = Cookies.get('token')
  
    const fetchData = async () => {
      let response;
      try {
  
        if (token) {
          response = await getUserData(token);
  
          if (response?.status == 200) {
            setUserData(response?.data?.data?.status)
            console.log('UserData', response)
          } else {
            console.error('Error fetching user data:');
          }
  
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    useEffect(() => {
      fetchData()
    }, []);

    return (
        <>
            <Layout isLoggedIn={true} isFooter={false} isContainer>
                <div className={styles.container}>
                    <div className={styles.headingFlex}>
                        <div className={styles.heading}>Status:</div>
                        <div className={styles.statusSubheading}>{userData}</div>
                        
                    </div>
                    <div className={styles.headingFlex}>

                    </div>
                    <Separator />
                <Plans isloading={productsLoading} />

                </div>
            </Layout >

        </>
    )
}

export default Membership
