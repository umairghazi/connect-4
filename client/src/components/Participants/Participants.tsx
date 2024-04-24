import { useCallback, useContext } from "react"
import { User, useCreateGameMutation } from "../../api"
import { LocalAuthContext } from "../../contexts"
import { getInitialBoard, serializeBoard } from "../../utils/game.utils"

type Participant = Pick<User, 'email' | 'displayName'>
interface ParticipantsProps {
  activeUsers: Participant[]
}

export const Participants = (props: ParticipantsProps) => {
  const { user } = useContext(LocalAuthContext)
  const { email: player1Email } = user || {}

  const [createGame] = useCreateGameMutation()

  const handleGame = useCallback(async (user: Participant) => {
    await createGame({ variables: { player1Email, player2Email: user.email, gameState: serializeBoard(getInitialBoard()) } })

  }, [createGame, player1Email])

  return (
    <div className="wrapper">
      {props.activeUsers.map((user, index) => (
        <div key={index} onClick={handleGame.bind(null, user)}>{user.displayName}</div>
      ))}
    </div>
  )
}