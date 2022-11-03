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


const FilenameTable = () => {
  
    const [Filename, setFilename] = useState('');
    const [RecordingDay, setNeuron] = useState(0);
    const [Date, setAnova1Cue] = useState('');
    const [Monkey, setAnova1Delay] = useState('');
    const [Task, setAnova1Sample] = useState('');
    const [TechnicalNotes, setAnova1Delay2] = useState('');
    const [Comment, setAnova1Match] = useState('');
  // // ...
  const addPosts = async (Filename, RecordingDay,Date, Monkey,Task,TechnicalNotes,Comment) => {
    console.log('hi')
     await fetch('https://neuro-base.herokuapp.com/api/filename/', {
        method: 'POST',
        body: JSON.stringify({
          Filename: Filename,
          RecordingDay: RecordingDay,
          Date: Date,
          Monkey: Monkey,
          Task: Task,
          TechnicalNotes: TechnicalNotes,
          Comment: Comment,
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
           
        },
     })
        .then((response) => response.json())
        
          setFilename('');
          setNeuron(0)
          setAnova1Cue('');
          setAnova1Delay('');
          setAnova1Sample('');
          setAnova1Delay2('');
          setAnova1Match('');
          
  };
  
    const [formData, setFormData] = useReducer(formReducer, {
      count: 100
    });
    const [submitting, setSubmitting] = useState(false);
  
    const handleSubmit = event => {
      event.preventDefault();
      setSubmitting(true);
      addPosts(Filename, RecordingDay,Date, Monkey,Task,TechnicalNotes,Comment);
  
      setTimeout(() => {
        setSubmitting(false);
        setFormData({
         reset: true
       })
      }, 3000);
    }
  
  
    return (
      <div className="wrapper">
      <h1>Filename Table</h1>
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
              <p>RecordingDay</p>
              <input type="number" onWheel={(e) => e.target.blur()} name="neuron" onChange={(e) => setNeuron(e.target.value)} step=".001" presicion={2} value={RecordingDay || ''}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Date</p>
              <input placeholder='YYYY-MM-DD' name="anova1cue" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Cue(e.target.value)}  value={Date }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Monkey</p>
              <input  name="anova1delay" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Delay(e.target.value)}   value={Monkey }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Task</p>
              <input  name="anova1sample" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Sample(e.target.value)}  value={ Task}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>TechnicalNotes</p>
              <input  name="anova1delay2" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Delay2(e.target.value)}  value={TechnicalNotes}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Comment</p>
              <input name="anova1match" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Match(e.target.value)} value={Comment}/>
            </label>
          </fieldset>
          </fieldset>
          
          <button type="submit" disabled={submitting}>Submit</button>
        </form>
      </div>
    );
  }
  
  export default FilenameTable;
  