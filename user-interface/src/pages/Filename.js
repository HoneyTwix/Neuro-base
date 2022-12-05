import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Container } from "react-bootstrap";

const Filename = () => {
    const [Filename, setFilename] = useState('');
    const [anovas, setAnova] = useState([])
   //  setAnova([{id: 1, name: 'kim', lastname:'josh'},
   //    {id: 1, name: 'kim', lastname:'josh'},{id: 1, name: 'kim', lastname:'josh'}])

   //  [{id: 1, name: 'kim', lastname:'josh'},
   //  {id: 1, name: 'kim', lastname:'josh'},{id: 1, name: 'kim', lastname:'josh'}
   
    const getFile = async (Filename) => {
      console.log('hi')
        await fetch(`https://web-production-4be1.up.railway.app/api/filename/${Filename}`)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           setAnova(data.data);
           console.log(anovas)
        })
        .catch((err) => {
           console.log(err.message);
        });
    }

    const deletePost = async (id) => {
        await fetch(`https://web-production-4be1.up.railway.app/api/filename/${id}`, {
           method: 'DELETE',
        }).then((response) => {
           if (response.status === 200) {
              setAnova(
                 anovas.filter((anova) => {
                    return anova.id !== id;
                 })
              );
           } else {
              return;
           }
        });
        };
    const handleSubmit = event => {
        event.preventDefault();
        getFile(Filename)
      }


  return (
   
    <div className="wrapper">
    <h1>Filename Table</h1>
  
  <form style={{ }} onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Filename</p>
            <input name="name" onChange={(e) => setFilename(e.target.value)} value={Filename || ''}/>
          </label>
        </fieldset>
    <button  style={{margin: '0 0 50px'}} type="submit">Submit</button>
</form>

<div className="anova-container">
   {console.log("Here")}
   {console.log(Array.isArray(anovas))}
   
   {console.log(anovas)}

   

   
        <Container className='row'>
            <Row>
                {anovas.map((anova) => (
                    <Col  style={{width: '18rem', border:'1px solid red', padding:'20px',flexDirection:'row' }} key={anova.id}>
                        <Card className='square rounded border border-white'>
            
            <Card.Body className='square rounded border-primary'>
              <Card.Title>Filename: {anova.Filename}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>RecordingDay: {anova.RecordingDay}</ListGroup.Item>
              <ListGroup.Item>Date: {anova.Date}</ListGroup.Item>
              <ListGroup.Item>Monkey: {anova.Monkey}</ListGroup.Item>
              <ListGroup.Item>Task: {anova.Task}</ListGroup.Item>
              <ListGroup.Item>TechnicalNotes: {anova.TechnicalNotes}</ListGroup.Item>
              <ListGroup.Item>Comment: {anova.Comment}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Button variant="primary"onClick={() => deletePost(anova.id)}>Delete</Button>
            </Card.Body>
          </Card>
            </Col>
                ))}
            </Row>
        </Container>
    
   </div>
    </div>
  );
};

export default Filename;