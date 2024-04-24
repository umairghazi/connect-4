// import { useEffect } from "react";
// import { User, useGetGame } from "../api";
// import { useSubscription } from "@apollo/client";
// import { CHECK_GAME } from "../api/useSubscription/useCheckGame.hook";

export function useCheckGameData(user?: any) {

//   const [getGame, { data: gameData }] = useGetGame();
  
//   useSubscription(CHECK_GAME, {
//     onData: ({ data: subData }) => {
//       console.log('subData', subData);
//       console.log(subData?.data?.checkGame?.player2Email);
//       console.log(user?.email);
      
//       if (subData?.data?.checkGame?.player2Email === user?.email) {
//         getGame({ variables: { email: user?.email } });
//       }
//     }
//   });

//   useEffect(() => {
//     if (!user?.email) return;
//     getGame({ variables: { email: user.email } });

//   }, [getGame, user]);

//   return { gameData };
}

