import React, { useState, useEffect } from 'react';
import { Card, Accordion, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';

function Dashboard() {

    const user = Auth.getProfile().data;
    const [cards, setCards] = useState([]);

    const handleCardData = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/users/${user._id}`)
                .then((cardData) => cardData.json());

            setCards(data.cards);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        handleCardData();
    }, []);

    // --- Add to Card Creation Component ---
    // const [formState, setFormState] = useState({ initialText: '', revealText: '', resources: [], topics: [] });

    // const handleCardCreation = async () => {
    //     try {
    //         const data = await fetch(`http://localhost:3001/api/cards`, {
    //             method: 'POST',
    //             header: {
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             body: new URLSearchParams(formState)
    //         })
    //             .then((cardData) => cardData.json());

    //         return data;
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    return (
        <div className='color-overlay d-flex 
            justify-content-center align-items-center'>
            <div className='container'>
                <div className='row'>
                    {cards.map(card => {
                        return (
                            <Card className='rounded col-lg-4 m-2 white-shadow' key={card._id}>
                                <Card.Header className='m-0 d-flex white'>
                                    {card.topics.map(topic => {
                                        return (
                                            <Alert variant='secondary' className='p-1 m-1' key={topic}>
                                                {topic}
                                            </Alert>
                                        );
                                    })}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{card.initialText}</Card.Title>
                                    <Card.Text>
                                        {card.revealText}
                                    </Card.Text>
                                </Card.Body>
                                {card.resources.length >= 1 &&
                                    <Card.Body>
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Resources</Accordion.Header>
                                                <Accordion.Body>
                                                    {card.resources.map(resource => {
                                                        return (<Card.Link target='_' href={resource} key={resource}>{resource}</Card.Link>);
                                                    })}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Card.Body>}
                            </Card>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;