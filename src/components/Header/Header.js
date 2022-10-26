import React from 'react'
import { Container, Navbar, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {auth} from '../../firebase'
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';


const Header = ({user, totalQty}) => {
  const history = useHistory();
  const brand ={
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: '24px',
    color: '#fff', marginTop : '10px'
  }
  const logout = () => {
    auth.signOut().then(() => {
      history.push('/login');
    });
  }

  return (
    <div style={{fontFamily : 'Poppins,sans-serif'}}>
    <Navbar style={{backgroundColor : '#232323'}} variant='dark' fixed='top' expand='lg'>
      <Container>
        <Navbar.Brand href='/' style={brand}><h2>Fan<em style={{fontStyle : 'normal', color : '#f33f3f'}}>Tech</em></h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{textAlign : 'center'}}>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to='/home' className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to='/list-products' className='nav-link'>Our Products</Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-link'>About Us</Link>
            </li>
            <li className='nav-item'>
              <Link to='/contacts' className='nav-link'>Contacts</Link>
            </li>
            {!user&& <>
            <li className='nav-item'>
              <Link to='/login' className='nav-link'>Log In</Link>
            </li>
            </>}
            {user&& <>
            <li className='nav-item'>
              <NavDropdown title={user} id="basic-nav-dropdown" style={{textTransform : 'capitalize'}}>
                <NavDropdown.Item><Link to='/profile' style={{color : '#000'}}>Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to='/add-products' style={{color : '#000'}}>Add Products</Link></NavDropdown.Item>
              <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </li>
            <li className='nav-item cart-menu-btn'>
              <Link to='/cart' className='nav-link'><Icon icon="mdi-light:cart" fontSize={25} /></Link>
              <span className='cart-indicator' style={{marginTop : '10px'}}>{totalQty}</span>
            </li>
            </>}
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header