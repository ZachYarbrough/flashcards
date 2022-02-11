import { Form, Button } from 'react-bootstrap';


function Login() {
    return (
        <div>
            <div className='color-overlay d-flex 
            justify-content-center align-items-center'>
                <Form className='rounded p-4 p-sm-3'>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter Email' />
                        <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Password' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>Login</Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;