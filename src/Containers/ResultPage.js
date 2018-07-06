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
        this.fetchResults();
    };

    fetchResults = () => {
        const data = getSingleResult({id: this.props.match.params.id});
        data.then((result) => {
            this.setState({result});
            if(!result.is_failed && result.date_ended === null) {
                // if stil pending
                setTimeout(() => this.fetchResults(), 5000);
            }

        });
    };

    render = () => {
        if(this.state.result === null)
            return null;
        if(this.state.result.is_failed)
            return (
                <div className="mt-lg-2">
                    <h3>{this.state.result.url}</h3>
                    <h4> Failed! </h4>
                </div>
            );
        if(this.state.result.date_ended === null)
            return (
                <div className="mt-lg-2">
                    <h3>{this.state.result.url}</h3>
                    <h4> Pending! </h4>
                </div>
            );
        return <ResultDetail result={this.state.result} />;
    };
};

export default ResultPage;
