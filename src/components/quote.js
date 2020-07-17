import React from 'react';

// Static component that displays the prettified quote
export default function Quote(props) {
    return (
        <div className="QuoteContainer">
                <div className="QuoteText"> { props.text } </div>
                <div className="QuoteBy"> { props.by } </div>
                <div className="QuoteYear"> { props.year } </div>
        </div>
    )
}