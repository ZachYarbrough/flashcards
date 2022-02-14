import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function CreateModal({ show, handleModalClose, userTopics }) {

    const [formState, setFormState] = useState({ initialText: '', revealText: '', resources: [], topics: [], known: false });
    const [resourceArray, setResourceArray] = useState([]);
    const [resourceState, setResourceState] = useState('');
    const [topicArray, setTopicArray] = useState([]);

    const handleResourceChange = (event) => {
        const { value } = event.target;

        setResourceState(value);
    }

    const handleResources = () => {
        setResourceArray([...resourceArray, resourceState]);
        console.log(resourceArray);
        setResourceState('');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await fetch(`http://localhost:3001/api/cards`, {
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formState)
            })
                .then((cardData) => cardData.json());

            return data;
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            initialText: '',
            revealText: '',
            resources: [],
            topics: [],
            known: false
        });
    };

    useEffect(() => {
        if (!show) {
            setResourceArray([]);
            setTopicArray([]);
        }
    }, [show]);

    return (
        <Modal show={show} onHide={handleModalClose} className='d-flex 
            justify-content-center align-items-center'>
            <Modal.Header>
                <Modal.Title>Create New Card</Modal.Title>
            </Modal.Header>
            <Form className='white-shadow rounded p-4 p-sm-3' onSubmit={handleFormSubmit}>
                <Modal.Body>
                    <div className='d-flex align-items-center'>
                        <Form.Group className='mb-3 mx-1' controlId='formBasicFrontText'>
                            <Form.Label>Front Text</Form.Label>
                            <Form.Control type='text' placeholder='Enter Front Text' name='initialText' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='mb-3 mx-1' controlId='formBasicBackText'>
                            <Form.Label>Back Text</Form.Label>
                            <Form.Control type='text' placeholder='Enter Back Text' name='revealText' onChange={handleChange} />
                        </Form.Group>
                    </div>
                    <Form.Group className='mb-3 mx-1' controlId='formBasicTopics'>
                        <Form.Label>Topics</Form.Label>
                        <div className='d-flex align-items-center mb-2'>
                            {topicArray.map(topic => {
                                return (
                                    <Alert variant='secondary' onClose={() => console.log('test')} dismissible className='m-1' key={topic}>
                                        {topic}
                                    </Alert>
                                )
                            })}
                        </div>
                        <Form.Select name='topics' placeholder='Enter Topic' onChange={handleChange}>
                            <option selected>Select Topic</option>
                            {userTopics.map((topic) => {
                                return (
                                    <option key={topic} value={topic}>{topic}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3 mx-1' controlId='formBasicResources'>
                        <Form.Label>Resources</Form.Label>
                        {resourceArray.map(resource => {
                            return (
                                <div className='text-muted mb-1' key={resource}>{resource}</div>
                            )
                        })}
                        <div className='d-flex align-items-center'>
                            <Form.Control name='resources' placeholder='Enter Resource' onChange={handleResourceChange} />
                            <Button variant='primary' onClick={handleResources} className='ms-2'>Add</Button>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>Close</Button>
                    <Button variant='primary' onClick={handleModalClose} type='submit'>Save changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateModal;