import React from 'react';


class IFrameComponent extends React.Component {
    componentDidMount = () => {
        this.iframe.current.addEventListener('load', () => this.props.onLoad(this.iframe.current));
    };

    render = () => {
        return <iframe ref={this.iframe} {...this.props}/>;
    };

    constructor(props) {
        super(props);
        this.iframe = React.createRef();
    }
}

export default IFrameComponent;