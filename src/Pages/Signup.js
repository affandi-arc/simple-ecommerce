import React, { useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const history = useHistory()
  
function handleSubmit(e) {
    e.preventDefault()
    // console.log(fullName, email, password)
    setLoading(true)
    signup(email, password).then((credentials) => {
      console.log(credentials)
      db.collection('users').doc(credentials.user.uid).set({
        FullName: fullName,
        Email: email,
        Password: password
      }).then(() => {
        setFullName('')
        setEmail('')
        setPassword('')
        setError('')
        setLoading(false)
        history.push("/login")
      }).catch((error) => {
        setError(error.message)
        setLoading(false)
      })}
    ).catch((error) => {
      setError(error.message)
      setLoading(false)
    })
  }
  return (
    <>
  <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name' onChange={(e)=>setFullName(e.target.value)} value={fullName} required/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
