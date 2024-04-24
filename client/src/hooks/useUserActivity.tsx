import { useEffect } from "react";
import { debounce } from "lodash";
import { User, useSetUserStatusMutation } from "../api";

export function useUserActivity(user?: User) {

  const [setUserStatus] = useSetUserStatusMutation();


//   useEffect(() => {
//     function activityHandler() {
//       if (!user?.email) return;

//       setUserStatus({
//         variables: {
//           email: user.email,
//           isActive: true
//         },
//       });

//       const t = setTimeout(() => {
//         setUserStatus({
//           variables: {
//             email: user.email,
//             isActive: false
//           },
//         });
//       }, 10000);

//       return () => clearTimeout(t);
//     }

//     const debouncedActivityHandler = debounce(activityHandler, 1000);

//     document.addEventListener('mousemove', debouncedActivityHandler);
//     document.addEventListener('keydown', debouncedActivityHandler);

//     return () => {
//       document.removeEventListener('mousemove', debouncedActivityHandler);
//       document.removeEventListener('keydown', debouncedActivityHandler);
//     };
//   }, [setUserStatus, user?.email]);
}