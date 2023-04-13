import {useState} from 'react';

function Button ({setValue, text}) {
  return (
    <button onClick={() => setValue(prev => prev + 1)}>{text}</button>
  )
}

function StatisticLine ({text, value}) {
  return (<p>{text} {value}</p>)
}

function Statistics ({good, neutral, bad}) {
  const total = good + neutral + bad;
  const average = (good + bad * -1)/ total;
  const positive = `${good/total*100} %`;
  
  if (good || neutral || bad) {
    return (
        <table>
          <thead>
            <tr>
              <th><h1>Statistics</h1></th>
            </tr>
          </thead>
            
          <tbody>
            <tr>
              <td>
                <StatisticLine text={"good"} value={good} />
                <StatisticLine text={"neutral"} value={neutral} />
                <StatisticLine text={"bad"} value={bad} />
                <StatisticLine text={"all"} value={total} />
                <StatisticLine text={"average"} value={average} />
                <StatisticLine text={"positive"} value={positive} />
              </td>
            </tr>
          </tbody>
        </table>
    )
  } else <p>No feedback given</p>
}


function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  
  return (
    <div className="App">
      <h1>Give feedback</h1>
      <Button setValue={setGood} text="Good" />
      <Button setValue={setNeutral} text="Neutral" />
      <Button setValue={setBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
