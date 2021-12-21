import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    // const getBadgeClasses = () => {
    //     let classes = 'badge rounded-pill '
    //     classes += users.length === 0 ? 'bg-warning' : 'bg-primary'
    //     return classes
    // }
    //
    // const renderPhrase = (number) => {
    //     let suffix1 = null
    //     let suffix2 = null
    //     let n = number % 10
    //
    //     if (n === 1 || (number >= 5 && number <= 20) || n === 0) {
    //         suffix1 = ''
    //         suffix2 = 'ет'
    //     } else if (n >= 2 && n <= 4) {
    //         suffix1 = 'а'
    //         suffix2 = 'ут'
    //     }
    //     let phrase = number + ` человек${suffix1} тусан${suffix2} с тобой сегодня`
    //     return number === 0 ? "Никто с тобой не тусанет" : phrase
    // }

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const handleToddleBookmark=(id)=>{

    }

    // const qualitiesIterator = (user) => {
    //
    //     return (user.qualities.map((quality) =>
    //         <span
    //             key={quality._id}
    //             className={`badge rounded-pill bg-${quality.color}`}
    //         >{quality.name}</span>
    //     ))
    // }

    return (
        <div>
            {SearchStatus}
        </div>
    )
}

export default App