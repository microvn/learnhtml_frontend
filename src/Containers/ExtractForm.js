import React from 'react';
import {getClassifiers, postJob} from "../business/api";
import {withRouter} from "react-router-dom";


function validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}


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
            });

        }

    };

    render = () => {
        return (
            <form className="form-inline my-2 my-md-0">
                <select ref={this.selectBox} id="inputState" className="form-control" onChange={() =>
                    this.selectedClassifier = this.state.result[this.selectBox.current.selectedIndex]
                }>
                    {this.state.classifiers.map((classifier) =>
                        <option>{classifier.name}</option>
                    )})}
                </select>
                <input className="form-control" type="text" placeholder="URL" aria-label="URL" ref={this.urlInput}/>
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