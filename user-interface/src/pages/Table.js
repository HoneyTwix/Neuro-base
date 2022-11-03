import React, { useReducer, useState } from 'react';

const formReducer = (state, event) => {
  if(event.reset) {
    return {
      name: '',
      neuron: 0,
      anova1cue: 0,
      anova1delay: 0,
      anova1sample: 0,
      anova1delay2: 0,
      anova1match:0,
      anova1matchdelay: 0,
    }
  }
   return {
     ...state,
     [event.name]: event.value
   }
 }


const Table = () => {
  
    const [Filename, setFilename] = useState('');
    const [Neuron, setNeuron] = useState(0);
    const [Anova1Cue, setAnova1Cue] = useState(0);
    const [Anova1Delay, setAnova1Delay] = useState(0);
    const [Anova1Sample, setAnova1Sample] = useState(0);
    const [Anova1Delay2, setAnova1Delay2] = useState(0);
    const [Anova1Match, setAnova1Match] = useState(0);
    const [Anova1MatchDelay, setAnova1MatchDelay] = useState(0);
  // // ...
  const addPosts = async (Filename, Neuron,Anova1Cue, Anova1Delay,Anova1Sample,Anova1Delay2,Anova1Match,Anova1MatchDelay) => {
    console.log('hi')
     await fetch('https://neuro-base.herokuapp.com/api/anova_sf1/', {
        method: 'POST',
        body: JSON.stringify({
          Filename: Filename,
          Neuron: Neuron,
          Anova1Cue: Anova1Cue,
          Anova1Delay: Anova1Delay,
          Anova1Sample: Anova1Sample,
          Anova1Delay2: Anova1Delay2,
          Anova1Match: Anova1Match,
          Anova1MatchDelay: Anova1MatchDelay,
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
           
        },
     })
        .then((response) => response.json())
        
          setFilename('');
          setNeuron(0)
          setAnova1Cue(0);
          setAnova1Delay(0);
          setAnova1Sample(0);
          setAnova1Delay2(0);
          setAnova1Match(0);
          setAnova1MatchDelay(0);
  };
  
    const [formData, setFormData] = useReducer(formReducer, {
      count: 100
    });
    const [submitting, setSubmitting] = useState(false);
  
    const handleSubmit = event => {
      event.preventDefault();
      setSubmitting(true);
      addPosts(Filename, Neuron,Anova1Cue, Anova1Delay,Anova1Sample,Anova1Delay2,Anova1Match,Anova1MatchDelay);
  
      setTimeout(() => {
        setSubmitting(false);
        setFormData({
         reset: true
       })
      }, 3000);
    }
  
  
    return (
      <div className="wrapper">
      <h1>Anova_Sf1 Table</h1>
      {submitting &&
        <div>
          You are submitting the following:
          <ul>
            {Object.entries(formData).map(([name, value]) => (
              <li key={name}><strong>{name}</strong>: {value.toString()}</li>
            ))}
          </ul>
        </div>
      }
    
    <form onSubmit={handleSubmit}>
          <fieldset disabled={submitting}>
            <label>
              <p>Filename</p>
              <input name="name" onChange={(e) => setFilename(e.target.value)} value={Filename || ''}/>
            </label>
          
          <fieldset>
          <label>
              <p>Neuron</p>
              <input type="number" onWheel={(e) => e.target.blur()} name="neuron" onChange={(e) => setNeuron(e.target.value)} step=".001" presicion={2} value={Neuron || ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Anova1Cue</p>
              <input type="number" name="anova1cue" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Cue(e.target.value)} step=".001" presicion={2} value={Anova1Cue || ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Anova1Delay</p>
              <input type="number" name="anova1delay" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Delay(e.target.value)} step=".001" presicion={2} value={Anova1Delay || ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Anova1Sample</p>
              <input type="number" name="anova1sample" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Sample(e.target.value)} step=".001" presicion={2} value={ Anova1Sample|| ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Anova1Delay2</p>
              <input type="number" name="anova1delay2" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Delay2(e.target.value)} step=".001" presicion={2} value={Anova1Delay2 || ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Anova1Match</p>
              <input type="number" name="anova1match" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Match(e.target.value)} step=".001" presicion={2} value={Anova1Match || ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Anova1MatchDelay</p>
              <input type="number" name="anova1matchdelay" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1MatchDelay(e.target.value)} step=".001" presicion={2} value={Anova1MatchDelay || ''}/>
            </label>
          </fieldset>
          </fieldset>
          
          <button type="submit" disabled={submitting}>Submit</button>
        </form>
      </div>
    );
  }
  
  export default Table;
  