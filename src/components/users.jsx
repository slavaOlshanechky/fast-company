import React, {useState} from "react";
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const [count, setCount] = useState(users.length);


    // const formatCount = () => {
    //     return count === 0 ? "Никто с тобой не тусанет" : count;
    // };

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((id) => id !== userId));

    }
    const renderPhrase = (number) => {
        let suffix1 = null
        let suffix2 = null
        let phrase = null
        let n = number % 10
        // if (number === 0) {
        //     phrase = "Никто с тобой не тусанет"
        //     return
        // }
        if (n === 1 || (number >= 5 && number <= 20) || n === 0) {
            suffix1 = ''
            suffix2 = 'ет'
        } else if (n >= 2 && n <= 4) {
            suffix1 = 'а'
            suffix2 = 'ут'

        }
        phrase = number + ` человек${suffix1} тусан${suffix2} с тобой сегодня`

        return number === 0 ? "Никто с тобой не тусанет" : phrase
    }


    const getBadgeClasses = () => {
        let classes = 'badge rounded-pill '
        classes += users.length === 0 ? 'bg-warning' : 'bg-primary'

        return classes
    }

    const deleteUser = () => {

        return (
            users.length !== 0 &&

            users.map((user) => (
                <tr
                    key={user._id}
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => handleDelete(user._id)}
                >

                </tr>
            ))

        );
    };

    // if (users.length !== 0) {
    //     return <tbody>{deleteUser()}</tbody>;
    // }

    const qualitiesIterator = (user) => {
        const userQualities = []
        user.qualities.map((quality) => {
            userQualities.push(quality.name)
        })
        return userQualities
    }
    const getQualityBadgeClasses = (userQualities) => {
        let classes = "badge rounded-pill";
        users.map((user) =>
        {
            user.qualities.map((quality) => {
                classes += ` bg-${quality.color}`
            })
        })
        //     userQualities.map((quality) => {
        //     classes += ` bg- ${quality.color}`
        // })

        return classes;
    };

    const renderTab = () => {
        return (

            users.length !== 0 &&

            users.map((user) =>
                <tr>
                    <td>{user.name}</td>
                    <td className={getQualityBadgeClasses()} >{qualitiesIterator(user)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td>
                        <button className="btn btn-primary btn-sm m-2" onClick={handleDelete}>
                            delete
                        </button>
                    </td>
                </tr>
            )
        );
    };

    // if (users.length !== 0) {
    //     return (
    //         <table className="table">
    //             <thead className="head">
    //             <tr>
    //                 <th scope="col">Имя</th>
    //                 <th scope="col">Качества</th>
    //                 <th scope="col">Профессия</th>
    //                 <th scope="col">Встретился, раз</th>
    //                 <th scope="col">Оценка</th>
    //                 <th scope="col"></th>
    //             </tr>
    //
    //
    //             </thead>
    //
    //             <tbody>{renderTab()}</tbody>
    //
    //         </table>
    //     )
    // }
    return (
        <>
            <span className={getBadgeClasses()}>{renderPhrase(count)}</span>

            <table className="table">
                <thead className="head">
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>


                </thead>

                <tbody>{renderTab()}</tbody>

            </table>

        </>
    )
}

export default Users