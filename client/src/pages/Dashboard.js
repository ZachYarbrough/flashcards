import { Card, Accordion, Alert } from 'react-bootstrap';

function Dashboard() {

    return (
        <div>
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
        </div>
    );
}

export default Dashboard;