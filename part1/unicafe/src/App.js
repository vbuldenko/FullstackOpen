import {useState} from 'react';

function Feedback () {

  return (
    <>
      <h1>Give feedback</h1>
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
    </>
  )
}

function Statistics ({good, neutral, bad}) {
  return (
    <>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleClick = (evaluator,  ) => {

  }
  
  return (
    <div className="App">
      {/* <Feedback /> */}
      <h1>Give feedback</h1>
      <button onClick={() => setGood(prev => prev + 1)}>good</button>
      <button onClick={() => setNeutral(prev => prev + 1)}>neutral</button>
      <button onClick={() => setBad(prev => prev + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
