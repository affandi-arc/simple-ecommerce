import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  const footer = {
    fontFamily: 'Poppins, sans-serif',
    overflowX: 'hidden',
    textRendering: 'optimizeLegibility',
  }

  return (
    <Container style={footer}>
      <hr/>
      <Row>
        <Col className='font-weight-lighter text-center py-3 inner-content'>
          <p>Copyright &copy; 2022 Dynasty Tech</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer