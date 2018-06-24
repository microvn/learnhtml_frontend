import React from 'react';
import {Link} from "react-router-dom";


/* Bootstrap result list */
const ResultList = ({elems, showEnd = true, showStart = true}) => {
    const listItems = elems.map((elem) => (
        <Link to={`/results/${elem.id}`}
              className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between flex-column mb-lg-2">
                <h5 className="long-heading">{elem.url}</h5>
                {showStart ? <p className="mb-0 text-muted">Date started: {elem.date_started}</p> : null}
                {showEnd ? <p className="mb-0 text-muted">Date ended: {elem.date_ended}</p> : null}
            </div>
        </Link>
    ));

    return (
        <div className="list-group mt-lg-2">
            {listItems}
        </div>
    );
};


export default ResultList;