function Header(props){
  return(
    <h1>{props.courseName}</h1>
  );
}

function Content({data}){
  return(
    <div>
      {data.map((element, index) => <Part key={index} data={element}/>)}
    </div>
  );
}

function Part({data}){
  return(
    <p>{data.name} {data.exercises}</p>
  );
}

function Total({data}){
  return(
    <p>Number of exercises {data.reduce(
      (acc, element) => {return acc + element.exercises}, 0)}
    </p>
  );
}

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {name: "Fundamentals of React", exercises: 10},
      {name: "Using props to pass data", exercises: 7},
      {name: "State of a component", exercises: 14 }]
  };

  return (
    <div className="App">
      <Header courseName={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts} />
    </div>
  );
}

export default App;
