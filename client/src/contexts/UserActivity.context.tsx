import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LocalAuthContext } from "./AuthContext";
import { useSetUserStatusMutation } from "../api";
import { debounce } from "lodash";

interface IUserActivity {
  userIsActive: boolean
  setUserIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserActivityContext = createContext({} as IUserActivity);

export const UserActivityProvider = ({ children }: any) => {
  const { user } = useContext(LocalAuthContext);
  const [setUserStatus] = useSetUserStatusMutation();
  const [userIsActive, setUserIsActive] = useState(false);
  
  useEffect(() => {
    function activityHandler() {
      if (!user?.email) return;

      setUserStatus({
        variables: {
          email: user.email,
          isActive: true
        },
      });

      setTimeout(() => {
        setUserStatus({
          variables: {
            email: user.email,
            isActive: false
          }
        });
      }, 10000);
    }

    // const visibilityHandler = () => {
    //   if (document.visibilityState === 'visible') {
    //     // setUserIsActive(true);
    //     setUserStatus({
    //       variables: {
    //         email: user.email || '',
    //         isActive: true
    //       }
    //     });
    //   } else {
    //     setUserStatus({
    //       variables: {
    //         email: user.email || '',
    //         isActive: false
    //       }
    //     });
    //     // setUserIsActive(false);
    //   }
    // }

    // Add event listeners for user activity or if they or idle or on a different page/tab
    document.addEventListener('mousemove', activityHandler);
    document.addEventListener('keydown', activityHandler);
    // document.addEventListener('visibilitychange', visibilityHandler);

    return () => {
      // Remove event listeners when component unmounts or is navigated away from or is on different tab
      document.removeEventListener('mousemove', activityHandler);
      document.removeEventListener('keydown', activityHandler);
      // document.removeEventListener('visibilitychange', visibilityHandler);
    };
  }, [setUserStatus, user.email]);

  console.log('userIsActive', userIsActive);

  const contextValue = useMemo(
    () => ({ userIsActive, setUserIsActive }),
    [userIsActive, setUserIsActive]
  );

  return (
    <UserActivityContext.Provider value={contextValue}>
      {children}
    </UserActivityContext.Provider>
  )
}