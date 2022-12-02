import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Container } from "react-bootstrap";

const Session = () => {
    const [Date, setFilename] = useState('');
    const [anovas, setAnova] = useState([])
   //  setAnova([{id: 1, name: 'kim', lastname:'josh'},
   //    {id: 1, name: 'kim', lastname:'josh'},{id: 1, name: 'kim', lastname:'josh'}])

   //  [{id: 1, name: 'kim', lastname:'josh'},
   //  {id: 1, name: 'kim', lastname:'josh'},{id: 1, name: 'kim', lastname:'josh'}
   
    const getFile = async (Date) => {
      console.log('hi')
        await fetch(`https:/web-production-a8ff.up.railway.app/api/session/${Date}`)
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
        await fetch(`https:/web-production-a8ff.up.railway.app/api/session/${id}`, {
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
        getFile(Date)
      }


  return (
   
    <div className="wrapper">
    <h1>Session Table</h1>
  
  <form style={{ }} onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Date</p>
            <input name="name"  placeholder='YYYY-MM-DD'  onChange={(e) => setFilename(e.target.value)} value={Date || ''}/>
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
              <Card.Title>Monkey: {anova.Monkey}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Hemisphere: {anova.Hemisphere}</ListGroup.Item>
              <ListGroup.Item>Training: {anova.Training}</ListGroup.Item>
              <ListGroup.Item>Date: {anova.Date}</ListGroup.Item>
              <ListGroup.Item>Recording_Day: {anova.Recording_Day}</ListGroup.Item>
              <ListGroup.Item>Electrode: {anova.Electrode}</ListGroup.Item>
              <ListGroup.Item>Channel: {anova.Channel}</ListGroup.Item>
              <ListGroup.Item>AnteriorPosterior: {anova.AnteriorPosterior}</ListGroup.Item>
              <ListGroup.Item>LateralMedial: {anova.LateralMedial}</ListGroup.Item>
              <ListGroup.Item>Area: {anova.Area}</ListGroup.Item>
              <ListGroup.Item>setZero: {anova.setZero}</ListGroup.Item>
              <ListGroup.Item>advanceDepth: {anova.advanceDepth}</ListGroup.Item>
              <ListGroup.Item>totalDepth: {anova.totalDepth}</ListGroup.Item>
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

export default Session;