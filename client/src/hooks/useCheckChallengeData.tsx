import { useEffect, useState } from "react";
import { User, useGetChallenge } from "../api";
import { useSubscription } from "@apollo/client";
import { CHECK_CHALLENGE } from "../api/useSubscription/useCheckChallenge.hook";

export function useCheckChallengeData(user?: User) {

  const [getChallenge, { data: challengeData, error: challengeError }] = useGetChallenge();
  const [isChallenged, setIsChallenged] = useState(false);
  console.log({isChallenged});
  
  useSubscription(CHECK_CHALLENGE, {
    onData: ({ data: subData }) => {
      
      if (subData?.data?.checkChallenge?.player2Email === user?.email) {
        setIsChallenged(true);
      }
    }
  });

  useEffect(() => {
    if (!user?.email) return;
    getChallenge({ variables: { email: user.email } });

    if(challengeData?.getChallenge?.player2Email === user?.email) {
      setIsChallenged(true);
    } else {
      setIsChallenged(false);
    }
  }, [user]);

  return { isChallenged };
}
