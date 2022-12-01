import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'

const Home = () => {
    const [anovas, setAnova] = useState([]);
    useEffect(() => {
        console.log('hi')
       fetch('https://web-production-d1d3.up.railway.app/api/anova_sf1/?_limit=10')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setAnova(data);
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);

    const deletePost = async (id) => {
        await fetch(`https://web-production-d1d3.up.railway.app/api/anova_sf1/${id}`, {
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

        const pie = [
            {id: 1, Filename: 'Alice', Neuron: 'Austria',Anova1Cue: 'Alice',Anova1Delay: 'Alice',Anova1Sample: 'Alice',Anova1Delay2: 'Alice',Anova1Match: 'Alice',},
            {id: 2, Filename: 'Bob', Neuron: 'Belgium',Anova1Cue: 'Alice',Anova1Delay: 'Alice',Anova1Sample: 'Alice',Anova1Delay2: 'Alice',Anova1Match: 'Alice',},
            {id: 3, Filename: 'Carl', Neuron: 'Canada',Anova1Cue: 'Alice',Anova1Delay: 'Alice',Anova1Sample: 'Alice',Anova1Delay2: 'Alice',Anova1Match: 'Alice',},
            {id: 4, Filename: 'Dean', Neuron: 'Denmark',Anova1Cue: 'Alice',Anova1Delay: 'Alice',Anova1Sample: 'Alice',Anova1Delay2: 'Alice',Anova1Match: 'Alice',},
            {id: 5, Filename: 'Ethan', Neuron: 'Egypt',Anova1Cue: 'Alice',Anova1Delay: 'Alice',Anova1Sample: 'Alice',Anova1Delay2: 'Alice',Anova1Match: 'Alice',},
          ];



  return (
    // <div>Home</div>
    
    <div className="anova-container">
        console.log('hi2')
      {anovas.map((anova) => {
         return (
            
            <Card style={{ width: '18rem' }} key={anova.id}>
            
            <Card.Body>
              <Card.Title>{anova.Filename}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{anova.Neuron}</ListGroup.Item>
              <ListGroup.Item>{anova.Anova1Cue}</ListGroup.Item>
              <ListGroup.Item>{anova.Anova1Delay}</ListGroup.Item>
              <ListGroup.Item>{anova.Anova1Sample}</ListGroup.Item>
              <ListGroup.Item>{anova.Anova1Delay2}</ListGroup.Item>
              <ListGroup.Item>{anova.Anova1Match}</ListGroup.Item>
              <ListGroup.Item>{anova.Anova1MatchDelay}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Button variant="primary"onClick={() => deletePost(anova.id)}>Delete</Button>
            </Card.Body>
          </Card>
         );
      })}
   </div>
  );
};

export default Home;