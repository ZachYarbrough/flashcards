import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';


function Login() {
    const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });

    // update state based on form input changes
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
            const data = await fetch(`http://localhost:3001/api/users/register`, {
                method: 'POST',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formState)
            })
                .then((userData) => userData.json());

            Auth.login(data.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        });
    };

    return (
        <div>
            <div className='color-overlay d-flex 
            justify-content-center align-items-center'>
                <Form className='white-shadow rounded p-4 p-sm-3' onSubmit={handleFormSubmit}>
                    <Form.Group className='mb-3' controlId='formBasicFirstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder='Enter First Name' name='firstName' onChange={handleChange}/>
                        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicLastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder='Enter Last Name' name='lastName' onChange={handleChange}/>
                        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' name='email' onChange={handleChange}/>
                        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' name='password' onChange={handleChange}/>
                    </Form.Group>
                    <Button variant='primary' type='submit'>Register</Button>
                    <Link to='/login' className='text-muted'>Already have an Account?</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;