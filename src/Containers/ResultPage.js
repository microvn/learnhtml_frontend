// mock data
// let _data,
import React from "react";
import ResultDetail from "../Components/ResultDetail";
import {getSingleResult} from "../business/api";



class ResultPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            result: null
        };
    }

    componentDidMount = () => {
        const data = getSingleResult({id: this.props.match.params.id});
        data.then((result) => this.setState({result}));
    };

    render = () => {
        return this.state.result === null ? null : <ResultDetail result={this.state.result} />;
    };
};

export default ResultPage;
