import React from 'react';
import ResultList from "../Components/ResultList";
import {getResultList} from "../business/api";

class FilteredListPage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            hasNext: false,
            hasPrevious: false,
            page: 1,
            filterParam: ""
        };
    }

    componentDidMount = () => {
        const filterMap = {
            "": "done",
            "failed": "failed",
            "pending": "pending",
        };
        let filter = filterMap[this.props.match.params.filter];
        if(filter === undefined)
            filter = "done";
        const page = this.props.match.params.page !== undefined ? this.props.match.params.page : 1;

        const data = getResultList({filter, page});
        data.then((result) => {
            const {results, hasNext, hasPrevious} = result;
            this.setState({data: results,
                hasNext,
                hasPrevious,
                page: parseInt(page),
                filterParam: this.props.match.params.filter !== undefined ? this.props.match.params.filter : ""
            })
        });
    };

    render = () => {
        return <div>
            <ResultList elems={this.state.data} showEnd={this.state.filterParam === ""}/>
            <nav aria-label="Page navigation ">
                <ul className="pagination justify-content-center">
                    {this.state.hasPrevious ?
                        <li className="page-item">
                            <a className="page-link" href={this.getPageLink(false)}>Previous</a>
                        </li> :
                        null
                    }
                    {this.state.hasNext ?
                        <li className="page-item">
                            <a className="page-link" href={this.getPageLink(true)}>Next</a>
                        </li> :
                        null
                    }
                </ul>
            </nav>
        </div>;
    };

    getPageLink = (next) => {
        const nextPage = this.state.page + (next ? 1 : -1);

        if(this.state.filterParam !== "")
            return `${this.state.filterParam}/${nextPage}`;
        return `${nextPage}`;
    }
};

export default FilteredListPage;