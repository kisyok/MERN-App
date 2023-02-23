import { useWorkoutsContext } from '../hooks/UseWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/UseAuthContext"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    if (!user) {
        return
    }

    const handleDelete = async () => {
        const res = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            'Authorization': `Bearer ${user.token}`
            
        })
        const json = await res.json()

        if(res.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4> {workout.title} </h4>
            <p><strong>Load (kg): </strong>{ workout.load }</p>
            <p><strong>Reps: </strong>{ workout.reps }</p>
            <p>{ formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true }) }</p>
            <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>
    )
}

export default WorkoutDetails