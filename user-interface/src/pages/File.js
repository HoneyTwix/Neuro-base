import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Row, Col, Container } from "react-bootstrap";

const File = () => {
    const [Filename, setFilename] = useState('');
    const [anovas, setAnova] = useState([])
   //  setAnova([{id: 1, name: 'kim', lastname:'josh'},
   //    {id: 1, name: 'kim', lastname:'josh'},{id: 1, name: 'kim', lastname:'josh'}])

   //  [{id: 1, name: 'kim', lastname:'josh'},
   //  {id: 1, name: 'kim', lastname:'josh'},{id: 1, name: 'kim', lastname:'josh'}
   
    const getFile = async (Filename) => {
      console.log('hi')
        await fetch(`https://web-production-a8ff.up.railway.app/api/anova_sf1/${Filename}`)
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
        await fetch(`https://web-production-a8ff.up.railway.app/api/anova_sf1/${id}`, {
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
    <h1>Anova_Sf1 </h1>
  
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
              <ListGroup.Item>Neuron: {anova.Neuron}</ListGroup.Item>
              <ListGroup.Item>Anova1Cue: {anova.Anova1Cue}</ListGroup.Item>
              <ListGroup.Item>Anova1Delay: {anova.Anova1Delay}</ListGroup.Item>
              <ListGroup.Item>Anova1Sample: {anova.Anova1Sample}</ListGroup.Item>
              <ListGroup.Item>Anova1Delay2: {anova.Anova1Delay2}</ListGroup.Item>
              <ListGroup.Item>Anova1Match: {anova.Anova1Match}</ListGroup.Item>
              <ListGroup.Item>Anova1MatchDelay: {anova.Anova1MatchDelay}</ListGroup.Item>
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

export default File;