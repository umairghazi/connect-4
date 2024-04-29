import { useCallback, useContext } from "react"
import { IUser, useCreateGameMutation } from "../../api"
import { LocalAuthContext } from "../../contexts"

interface ParticipantsProps {
  activeUsers: IUser[];
  handleSetChallengedPlayer: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  handleSetShowChallengeToast: React.Dispatch<React.SetStateAction<boolean>>;
  // challengedPlayer: User | undefined;
}

export const Participants = (props: ParticipantsProps) => {
  const { activeUsers, handleSetChallengedPlayer, handleSetShowChallengeToast } = props;
  const { user } = useContext(LocalAuthContext)
  const { id } = user || {}

  const [createGame] = useCreateGameMutation()

  const handleGame = useCallback(async (user: IUser) => {
    handleSetShowChallengeToast(true)
    handleSetChallengedPlayer(user)
    // await createGame({ variables: { player1Id: id, player2Id: user.id } })
  }, [handleSetChallengedPlayer])

  return (
    <div className="wrapper">
      {activeUsers.map((user, index) => (
        <div key={index} onClick={handleGame.bind(null, user)}>{user.displayName}</div>
      ))}
    </div>
  )
}