import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CreateModal({ show, handleModalClose }) {

    const [formState, setFormState] = useState({ initialText: '', revealText: '', resources: [], topics: [], known: false });

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

    return (
        <Modal show={show} onHide={handleModalClose} className='color-overlay d-flex 
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
                        <Form.Control name='topics' onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className='mb-3 mx-1' controlId='formBasicResources'>
                        <Form.Label>Resources</Form.Label>
                        <Form.Control name='resources' onChange={handleChange} />
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