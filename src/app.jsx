import React, {useState} from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }

    const handleToggleBookMark = (id) => {
        const newUsers = [...users]
        const index = newUsers.findIndex((user) => user._id === id)
        newUsers[index].isBookMarked=!newUsers[index].isBookMarked
        setUsers(newUsers)
    }

    return (
        <>
            {<SearchStatus number={users.length}/>}
            {users.length !== 0 && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}

        </>
    )
}

export default App