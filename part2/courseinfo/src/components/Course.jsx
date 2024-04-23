const Header = ({ header }) => <h1>{header}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Total = ({ total }) => 
  <>
    <p className="bold">total of {total} exericses</p>
  </>

const Course = ({ course }) => 
  <>
    <Header header={course.name} />
    <Content parts={course.parts} />
    <Total total={
      course.parts.reduce((n, part) => {
        return n + part.exercises;
      },  0)} />
  </>

export default Course;