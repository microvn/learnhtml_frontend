import React from 'react';
import {Link, Route} from "react-router-dom";


/* Bootstrap navbar link */
const MenuLink = ({label, to, activeOnlyWhenExact=true}) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({match}) => (
            <li className={match ? "nav-item active" : "nav-item"}>
                <Link to={to} className="nav-link">
                    {label}
                    {match ? <span className="sr-only">(current)</span> : null}
                </Link>
            </li>

        )}
    />
);

export default MenuLink;