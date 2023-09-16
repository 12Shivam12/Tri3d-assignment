import { Button, } from '@chakra-ui/react'
import './App.css';
import TaskList from './components/Task-List';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <div className="App">
      <TaskList/>
      {/* <TodoApp/> */}
    </div>
  );
}

export default App;
