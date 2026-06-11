import './App.css'
import Task from './components/Task/Task'

function App() {

  return (
    <>
      <div className="App">
        <div className="title">
          <h1>Task List</h1>
        </div>
        <div className="tasks">
          <div className="todo">
            <h1>To do</h1>
            <Task title="Task 1" description="Description for Task 1" />
            <Task title="Task 2" description="Description for Task 2" />
            <Task title="Task 3" description="Description for Task 3" />
          </div>
          <div className="in-progress">
            <h1>In Progress</h1>
          </div>
          <div className="done">
            <h1>Done</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
