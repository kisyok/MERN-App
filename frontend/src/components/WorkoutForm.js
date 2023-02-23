import { useState } from "react";
import { useWorkoutsContext } from '../hooks/UseWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmotyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const workout = { title, load, reps }
        const res = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await res.json()

        if(!res.ok) {
            setError(json.msg)
            setEmotyFields(json.emptyFields)
        }

        if(res.ok) {
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmotyFields([])
            console.log("New workout added")
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Workout</h3>
            <label>Exercise Title</label>
            <input 
                type="text"
                onChange={((e) => setTitle(e.target.value))}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Load (kg)</label>
            <input 
                type="number"
                onChange={((e) => setLoad(e.target.value))}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />
            <label>Reps</label>
            <input 
                type="text"
                onChange={((e) => setReps(e.target.value))}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />
            <button>Add Workout</button>
            {error && <div className="error">{ error }</div> }
        </form>    
    )
}

export default WorkoutForm