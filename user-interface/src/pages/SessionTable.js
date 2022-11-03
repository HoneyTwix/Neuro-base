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


const SessionTable = () => {
  
    const [Monkey, setFilename] = useState('');
    const [Hemisphere, setNeuron] = useState('');
    const [Training, setAnova1Cue] = useState('');
    const [Date, setAnova1Delay] = useState('');
    const [Recording_Day, setAnova1Sample] = useState(0);
    const [Electrode, setAnova1Delay2] = useState(0);
    const [Channel, setAnova1Match] = useState(0);
    const [AnteriorPosterior, setAnova1MatchDelay] = useState(0);
    const [LateralMedial, setLateralMedial] = useState(0);
    const [Area, setArea] = useState('');
    const [setZero, setsetZero] = useState(0);
    const [advanceDepth, setadvanceDepth] = useState(0);
    const [totalDepth, settotalDepth] = useState(0);
  // // ...
  const addPosts = async (Monkey, Hemisphere,Training, Date,Recording_Day,Electrode,Channel,AnteriorPosterior,LateralMedial,Area,setZero,advanceDepth,totalDepth) => {
    console.log('hi')
     await fetch('https://neuro-base.herokuapp.com/api/session/', {
        method: 'POST',
        body: JSON.stringify({
            Monkey: Monkey,
            Hemisphere: Hemisphere,
            Training: Training,
            Date: Date,
            Recording_Day: Recording_Day,
            Electrode: Electrode,
            Channel: Channel,
            AnteriorPosterior: AnteriorPosterior,
            LateralMedial: LateralMedial,
            Area: Area,
            setZero: setZero,
            advanceDepth: advanceDepth,
            totalDepth: totalDepth,
        }),
        headers: {
           'Content-type': 'application/json; charset=UTF-8',
           
        },
     })
        .then((response) => response.json())
        
          setFilename('');
          setNeuron('')
          setAnova1Cue('');
          setAnova1Delay('');
          setAnova1Sample(0);
          setAnova1Delay2(0);
          setAnova1Match(0);
          setAnova1MatchDelay(0);
          setLateralMedial(0);
          setArea('');
          setsetZero(0);
          setadvanceDepth(0);
          settotalDepth(0);

  };
  
    const [formData, setFormData] = useReducer(formReducer, {
      count: 100
    });
    const [submitting, setSubmitting] = useState(false);
  
    const handleSubmit = event => {
      event.preventDefault();
      setSubmitting(true);
      addPosts(Monkey, Hemisphere,Training, Date,Recording_Day,Electrode,Channel,AnteriorPosterior,LateralMedial,Area,setZero,advanceDepth,totalDepth);
  
      setTimeout(() => {
        setSubmitting(false);
        setFormData({
         reset: true
       })
      }, 3000);
    }
  
  
    return (
      <div className="wrapper">
      <h1>Session Table</h1>
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
              <p>Monkey</p>
              <input name="name" onChange={(e) => setFilename(e.target.value)} value={Monkey }/>
            </label>
          
          <fieldset>
          <label>
              <p>Hemisphere</p>
              <input  onWheel={(e) => e.target.blur()} name="neuron" onChange={(e) => setNeuron(e.target.value)} value={Hemisphere }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Training</p>
              <input  name="anova1cue" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Cue(e.target.value)}   value={Training }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Date</p>
              <input  name="anova1delay"   placeholder='YYYY-MM-DD' onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Delay(e.target.value)}  value={Date }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Recording_Day</p>
              <input type="number" name="anova1sample" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Sample(e.target.value)} step=".001" presicion={2} value={ Recording_Day}/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Electrode</p>
              <input type="number" name="anova1delay2" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Delay2(e.target.value)} step=".001" presicion={2} value={Electrode }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Channel</p>
              <input type="number" name="anova1match" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1Match(e.target.value)} step=".001" presicion={2} value={Channel }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>AnteriorPosterior</p>
              <input type="number" name="anova1matchdelay" onWheel={(e) => e.target.blur()} onChange={(e) => setAnova1MatchDelay(e.target.value)} step=".001" presicion={2} value={AnteriorPosterior }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>LateralMedial</p>
              <input type="number" name="LateralMedial" onWheel={(e) => e.target.blur()} onChange={(e) => setLateralMedial(e.target.value)} step=".001" presicion={2} value={LateralMedial }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>Area</p>
              <input name="Area" onWheel={(e) => e.target.blur()} onChange={(e) => setArea(e.target.value)} step=".001" presicion={2} value={Area }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>setZero</p>
              <input type="number" name="setZero" onWheel={(e) => e.target.blur()} onChange={(e) => setsetZero(e.target.value)} step=".001" presicion={2} value={setZero }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>advanceDepth</p>
              <input type="number" name="advanceDepth" onWheel={(e) => e.target.blur()} onChange={(e) => setadvanceDepth(e.target.value)} step=".001" presicion={2} value={advanceDepth  }/>
            </label>
          </fieldset>
          <fieldset>
          <label>
              <p>totalDepth</p>
              <input type="number" name="totalDepth" onWheel={(e) => e.target.blur()} onChange={(e) => settotalDepth(e.target.value)} step=".001" presicion={2} value={totalDepth  }/>
            </label>
          </fieldset>
          </fieldset>
          
          <button type="submit" disabled={submitting}>Submit</button>
        </form>
      </div>
    );
  }
  
  export default SessionTable;