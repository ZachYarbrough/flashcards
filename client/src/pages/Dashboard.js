import React, { useState, useEffect } from 'react';
import { Alert, Accordion, Button, Form } from 'react-bootstrap';
import Auth from '../utils/auth';

function Dashboard() {

    const user = Auth.getProfile().data;
    const [cards, setCards] = useState([]);
    const [isEdit, setIsEdit] = useState('');
    const [formState, setFormState] = useState({ initialText: '', revealText: '', topics: [], resources: [], known: false })

    const handleCardData = async () => {
        try {
            const data = await fetch(`http://localhost:3001/api/users/${user._id}`)
                .then((cardData) => cardData.json());

            setCards(data.cards);
        } catch (e) {
            console.error(e);
        }
    }

    const handleCardDelete = async (e) => {
        e.stopPropagation();
        const cardId = e.target.getAttribute("data-id");
        try {
            await fetch(`http://localhost:3001/api/cards/${cardId}`, {
                method: 'DELETE'
            });

            handleCardData();
        } catch (e) {
            console.error(e);
        }
    }

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleCardForm = async (e) => {
        e.stopPropagation();
        const cardId = e.target.getAttribute('data-id');
        const Accordion = document.getElementById(cardId);
        setIsEdit(cardId);

    }

    const handleCardEdit = async (e) => {
        const cardId = e.target.getAttribute("data-id");
        try {
            await fetch(`http://localhost:3001/api/cards/${cardId}`, {
                method: 'PUT',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formState)
            });

            handleCardData();
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            initialText: '',
            revealText: '',
            topics: [],
            resources: [],
            known: false
        });
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
                    <div className ='d-flex align-items-center'>
                        <h4 className='mt-2'>Cards</h4>
                        <Button variant='secondary' className='m-2'>Create New</Button>
                    </div>
                    <Accordion className='col-12'>
                        {cards.map((card, i) => {
                            return (
                                <div>
                                    {isEdit === card._id ?
                                        <Form>
                                            <Accordion.Item key={i} id={card._id} eventKey={i} >
                                                <Accordion.Header className='d-flex align-items-center'>
                                                    <Form.Group>
                                                        <Form.Control type='text' placeholder='Front Text' defaultValue={card.initialText} name='initialText' onChange={handleChange}></Form.Control>
                                                    </Form.Group>
                                                    {card.topics.map(topic => {
                                                        return (
                                                            <Alert variant='secondary' className='p-1 m-1' key={topic}>
                                                                {topic}
                                                            </Alert>
                                                        )
                                                    })}
                                                    {card.known && <Alert variant='success' className='p-1 m-1'>Known</Alert>}
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Form.Group>
                                                        <Form.Control type='text' placeholder='Back Text' defaultValue={card.revealText} name='revealText' onChange={handleChange}></Form.Control>
                                                    </Form.Group>
                                                    {card.resources.length >= 1 &&
                                                        <div>
                                                            <br />
                                                            <div>Resources:</div>
                                                            {card.resources.map((resource, i) => {
                                                                const resourceId = `resource${i}`;
                                                                return (
                                                                    <Form.Group>
                                                                        <Form.Control type='text' placeholder='Resource' defaultValue={resource} name={resourceId} onChange={handleChange}></Form.Control>
                                                                    </Form.Group>
                                                                );
                                                            })}
                                                        </div>}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Form>
                                        :
                                        <Accordion.Item key={i} id={card._id} eventKey={i}>
                                            <Accordion.Header className='d-flex align-items-center'>
                                                <Button onClick={handleCardForm} data-id={card._id}>Edit</Button>
                                                <Button onClick={handleCardDelete} data-id={card._id} variant='danger' className='mx-1'>Delete</Button>
                                                {card.initialText}
                                                {card.topics.map(topic => {
                                                    return (
                                                        <Alert variant='secondary' className='p-1 m-1' key={topic}>
                                                            {topic}
                                                        </Alert>
                                                    )
                                                })}
                                                {card.known && <Alert variant='success' className='p-1 m-1'>Known</Alert>}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div>{card.revealText}</div>
                                                {card.resources.length >= 1 &&
                                                    <div>
                                                        <br />
                                                        <div>Resources:</div>
                                                        {card.resources.map(resource => { return (<a target='_' href={resource} key={resource}>{resource}</a>); })}
                                                    </div>}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    }
                                </div>
                            )
                        })
                        }
                    </Accordion>
                </div>
            </div>
        </div >
    );
}

export default Dashboard;