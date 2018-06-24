import React from 'react';
import ResultList from "../Components/ResultList";
import {getResultList} from "../business/api";

class FilteredListPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount = () => {
        const filterMap = {
            "/": "done",
            "/failed": "failed",
            "/pending": "pending",
        };
        const filter = filterMap[this.props.match.url];
        const data = getResultList({filter});
        data.then((result) => this.setState({data: result}));
    };

    render = () => {
        return <ResultList elems={this.state.data} showEnd={this.props.match.url === "/"}/>;
    };
};

export default FilteredListPage;