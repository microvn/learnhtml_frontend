import React from 'react';
import IFrameComponent from "./IFrameComponent";


const highlightContent = ({iframe, xpaths}) => {
    if(iframe.contentDocument !== undefined)
        xpaths.forEach((xpath) => {
            const elem = document.evaluate(xpath, iframe.contentDocument,
                null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            elem.style.background = "#00CC2088";
        });
};

const ResultDetail = ({result: {content, results, url}}) => {
    return (
        <div className="mt-lg-2">
            <h3>{url}</h3>
            <IFrameComponent srcDoc={content}
                             onLoad={(iframe) => highlightContent({iframe, xpaths: results})} />
        </div>
    );
};

export default ResultDetail;