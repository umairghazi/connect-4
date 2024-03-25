import { useCallback, useContext } from "react"
import { User, useCreateChallengeMutation } from "../../api"
import { LocalAuthContext } from "../../contexts"

type Participant = Pick<User, 'email' | 'displayName'>
interface ParticipantsProps {
  activeUsers: Participant[]
}

export const Participants = (props: ParticipantsProps) => {
  const { user } = useContext(LocalAuthContext)
  const { email: player1Email } = user || {}

  const [createChallenge] = useCreateChallengeMutation()

  const handleChallenge = useCallback(async (user: Participant) => {
    await createChallenge({ variables: { player1Email, player2Email: user.email }})

  }, [createChallenge, player1Email])

  return (
    <div className="wrapper">
      {props.activeUsers.map((user, index) => (
        <div key={index} onClick={handleChallenge.bind(null, user)}>{user.displayName}</div>
      ))}
    </div>
  )
}