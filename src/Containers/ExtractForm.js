import React from 'react';
import {getClassifiers, postJob} from "../business/api";
import {withRouter} from "react-router-dom";


const validURL = (value) => {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regexp = new RegExp(expression);
    return regexp.test(value);
};


class ExtractForm extends React.Component {
    componentDidMount = () => {
        const data = getClassifiers();
        data.then((classifiers) => {
            this.setState({classifiers});
            this.selectedClassifier = this.state.classifiers[0];
        });
    };

    submitExtract = () => {
        const url = this.urlInput.current.value;
        const classifierId = this.selectedClassifier.id;
        if (validURL(url)) {
            console.log(url);
            console.log(classifierId);
            postJob({url, id: classifierId}).then((newJob) => {
                this.props.history.push(`/results/${newJob.id}`);
                window.location.reload();

            });
        }

    };

    render = () => {
        return (
            <form className="form-inline my-2 my-md-0">
                <select ref={this.selectBox} id="inputState" className="form-control mr-1" onChange={() =>
                    this.selectedClassifier = this.state.classifiers[this.selectBox.current.selectedIndex]
                }>
                    {this.state.classifiers.map((classifier) =>
                        <option>{classifier.name}</option>
                    )})}
                </select>
                <input className="form-control mr-1" type="text" placeholder="URL" aria-label="URL" ref={this.urlInput}/>
                <button type="button" className="btn btn-outline-primary" onClick={this.submitExtract}>Extract!</button>
            </form>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            classifiers: []
        };
        this.selectBox = React.createRef();  // ref for select
        this.urlInput = React.createRef();  // ref for select

        this.selectedClassifier = null;
    }
}


export default withRouter(ExtractForm);