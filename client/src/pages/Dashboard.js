import React, { useState } from 'react';
import { Card, Accordion, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';

function Dashboard() {
    // --- Add to Card Creation Component ---
    // const [formState, setFormState] = useState({ initialText: '', revealText: '', resources: [], topics: [] });

    const user = Auth.getProfile().data;

    const handleCardData = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/users/${user._id}`)
                .then((cardData) => cardData.json());

            return data.cards;
        } catch (e) {
            console.error(e);
        }
    }

    // --- Add to Card Creation Component ---
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
            <Card className='rounded'>
                <Card.Header className='d-flex'>
                    <Alert variant='dark'>
                        String
                    </Alert>
                    <Alert variant='dark'>
                        Array
                    </Alert>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Resources</Accordion.Header>
                            <Accordion.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Dashboard;