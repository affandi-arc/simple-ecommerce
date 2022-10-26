import React, {useState} from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap'
import { storage, db  } from '../firebase'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddProducts = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState('')
  const [successMsg, setSuccessMsg] = useState()
  const [uploadError, setUploadError] = useState()
  const [loading, setLoading] = useState(false)

  const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/PNG']
  const handleProductImage = (e) => {
    let selectedFile = e.target.files[0]
    if (selectedFile) { 
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile)
        setImageError('')
      } else {
        setImage(null)
        setImageError('Please select an image file (png or jpg)')
      }
    }else {
      console.log('Please insert file first')
    }
  }
  const handleAddProducts=(e)=>{
    e.preventDefault();
    setLoading(true)
    // console.log(title, description, price);
    // console.log(image);
    const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on('state_changed',snapshot=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        console.log(progress);
    },error=>setUploadError(error.message),()=>{
        storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
            db.collection('Products').add({
                title,
                description,
                price: Number(price),
                url
            }).then(()=>{
                setSuccessMsg('Product was added successfully');
                setTitle('');
                setDescription('');
                setPrice('');
                setLoading(false);
                document.getElementById('file').value='';
                setImageError('');
                setUploadError('');
                setTimeout(()=>{
                    setSuccessMsg('');
                },3000)
            }).catch(error=>{
              setUploadError(error.message)
              setLoading(false)
            });
        })
    })
  }
  return (
    <Container style={{marginTop : '100px'}}>
        <h1>Add Products</h1>
        <hr/>
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Form onSubmit={handleAddProducts}>
          <Form.Group>
            <Form.Label>Product Title</Form.Label>
            <Form.Control required type="text" placeholder="Enter Product Title" onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Description</Form.Label>
            <Form.Control required type="text" placeholder="Enter Product Description" onChange={(e)=>setDescription(e.target.value)} value={description} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Product Price</Form.Label>
            <Form.Control required type="number" placeholder="Enter Product Price" onChange={(e)=>setPrice(e.target.value)} value={price}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload Product</Form.Label>
            <Form.Control required type="file" id='file' placeholder="Enter Product Price" onChange={handleProductImage}/>
          </Form.Group>
          {imageError && <Alert variant="danger">{imageError}</Alert>}
          {uploadError && <Alert variant="danger">{uploadError}</Alert>}
          <Form.Group>
            <Button type='submit' style={{display: 'flex', justifyContent : 'flex-start'}} disabled={loading}><br/>Submit</Button>
          </Form.Group>
        </Form>
    </Container>
  )
}

export default AddProducts