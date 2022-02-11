import { Navbar as Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Navbar() {

    // Authentication Token
    const token = Auth.getToken();

    // Decrypts token payload
    let user = null;
    if (token) user  = Auth.getProfile().data;

    // Logs user out
    const handleLogout = () => {
        if (!token) return;

        Auth.logout(token);
    }

    return (
        <Nav>
            <Container>
                <Nav.Brand>Flashcards</Nav.Brand>
                {user ?
                    <Nav.Text>
                        Signed in as: <Link to='/login' onClick={handleLogout}>{user.firstName} {user.lastName}</Link>
                    </Nav.Text>
                    :
                    null
                }
            </Container>
        </Nav>
    );
}

export default Navbar;
