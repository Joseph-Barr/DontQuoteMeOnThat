import React from 'react';
import {Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';


export default function QuoteCard(props) {
        return (
            <div>
                <a href = {"/quote/" + props._id} className = 'noStyle quoteCardLink'>
                    <Card className = 'quoteCard'>
                        <CardBody>
                            <CardTitle align = "center" className = "quoteCardTitle"><h1>{props.text}</h1></CardTitle>
                            <CardSubtitle align = 'center'> <h3> {props.by} </h3> </CardSubtitle>
                        </CardBody>
                    </Card>
                </a>
          </div>
        )
}