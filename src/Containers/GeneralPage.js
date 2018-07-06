import React from 'react';
import MenuLink from "../Components/MenuLink";
import {BrowserRouter as Router, Route} from "react-router-dom";
import FilteredListPage from "./FilteredListPage";
import ResultPage from "./ResultPage";
import ExtractForm from "./ExtractForm";

const GeneralPage = () => (
    <Router>
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                    <a className="navbar-brand">LearnHTML</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExample09"
                            aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <MenuLink to="/" label="Done"/>
                            <MenuLink to="/failed" label="Failed"/>
                            <MenuLink to="/pending" label="Pending"/>
                        </ul>
                        <ExtractForm />
                    </div>
                </nav>
                <Route exact path="/:page([0-9]+)" component={FilteredListPage}/>
                <Route exact path="/:filter(|failed|pending)" component={FilteredListPage}/>
                <Route exact path="/:filter(|failed|pending)/:page([0-9]+)" component={FilteredListPage}/>
                <Route path="/results/:id" component={ResultPage}/>
            </div>
        </div>
    </Router>
);

export default GeneralPage;