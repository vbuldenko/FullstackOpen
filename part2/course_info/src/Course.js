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
        <b><p>Total of {data.reduce(
        (acc, element) => {return acc + element.exercises}, 0)} exercises
        </p></b>
    );
}

function Course ({course}) {
    return (
        <>
        <Header courseName={course.name} />
        <Content data={course.parts} />
        <Total data={course.parts} />
        </>
    );
}

export default Course;