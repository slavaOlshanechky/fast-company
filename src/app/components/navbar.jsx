import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <table cellpadding="10"cellspacing="10">
            <td align="center" valign="center"><Link to="/">Main</Link>
            </td>
            <td></td>
            <td align="center" valign="center"><Link to="/login">Login</Link>
            </td>
            <td></td>
            <td align="center" valign="center"><Link to="/users">Users</Link>
            </td>
        </table>
    );
};

export default NavBar;
