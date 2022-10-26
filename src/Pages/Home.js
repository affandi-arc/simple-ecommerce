import React from 'react'
import TotalProducts from './TotalProducts'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {Icon} from '@iconify/react';

const Home = () => {
  const container = {
    marginLeft : 'auto', marginRight : 'auto', paddingRight :'15px', paddingLeft :'15px', width : '100%', fontFamily : 'Poppins, sans-serif'
  }
  const heading = {
    fontSize : '24px', fontWeight : '400', marginBottom :'15px'
  }
  return (
    <>
    <Carousel style={{width : '100%', height:'90%', fontFamily :'Poppins, sans-serif'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../assets/images/carousel1.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../assets/images/carousel2.jpg')}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require('../assets/images/carousel3.jpg')}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div style={{marginTop : '100px', fontFamily : 'Poppins, sans-serif'}}>
      <Container style={container}>
        <Row>
          <Col> 
            <h2 style={heading}>Latest Products</h2>
            <Link to="/list-products" style={{textDecoration : 'none', float : 'right', marginTop : '-35px', textTransform: 'uppercase', fontSize:'13px', fontWeight: '700', color : '#f33f3f'}}>view all products <Icon icon="fa:angle-double-right" /></Link><hr/>
            <TotalProducts/>
          </Col>
        </Row>
      </Container>
      <Container style={container}>
        <Row>
          <Col>
            <h2 style={heading}>About Fan Technology<hr/></h2>
          </Col>
        </Row>
        <Row>
          <Col> 
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, ab possimus? Recusandae, adipisci repellat molestiae fugiat animi rem iure molestias.
          </p>
          <ul class="featured-list">
            <li><a href="#none">Lorem ipsum dolor sit amet</a></li>
            <li><a href="#none">Consectetur an adipisicing elit</a></li>
            <li><a href="#none">It aquecorporis nulla aspernatur</a></li>
            <li><a href="#none">Corporis, omnis doloremque</a></li>
            <li><a href="#none">Non cum id reprehenderit</a></li>
          </ul>
          </Col>
          <Col>
          <img src={require('../assets/images/feature-image.jpg')} alt="about" style={{width : '100%'}}/>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Home