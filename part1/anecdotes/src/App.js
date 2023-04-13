import { useState } from 'react';

//Button Component-----------------------------
function Button ({text, clickHandler}) {
  return (
	  <button onClick={clickHandler}>{text}</button>
	)
}

//Most Voted Anecdot Component-----------------
function MVanecdote ({anecdotes, votes}) {
    const mvIndex = votes.reduce((mostVotedIndex, currentVote, currentIndex, array) => {
      if (currentVote > array[mostVotedIndex]) {
        return currentIndex;
      } else {
        return mostVotedIndex;
      }
    }, 0);

    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mvIndex]}</p>
        <p>{`has ${votes[mvIndex]} votes`}</p>
      </div>
    )
}

//Main App Component---------------------------
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const arrayLength = anecdotes.length;
  const votePoints = new Array(anecdotes.length).fill(0);
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votePoints);
  

  function voteHandler (index) {
    setVotes(prev => {
      const newVotes = [...prev];
      newVotes[index] += 1;
      return newVotes
	  })
  }
  
 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{`has ${votes[selected]} votes`}</p>
	    <div>
          <Button text={"vote"} clickHandler={() => voteHandler(selected)} />
	        <Button text={"next anecdote"} clickHandler={() => setSelected(Math.floor(Math.random() * arrayLength))} />
	    </div>
      <MVanecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
