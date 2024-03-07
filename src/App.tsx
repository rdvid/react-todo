import { useEffect, useState } from 'react'
import { Task } from './service'
import {v4 as uuid} from 'uuid';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button
} from '@chakra-ui/react'
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [
    task, 
    setTask
  ] = useState<Task>({ 
    id: uuid(), 
    message: '', 
    status: false
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(task.message){
      let newTasks = [...tasks, {id: uuid(), message: task.message, status: false}]
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));

    }
    setTask({id:uuid(), message: '', status: false});
  }

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let message = e.target.value;
    setTask({ id: uuid(), message, status: false })
  }

  const changeStatus = (id: string) => {
    tasks.map((task) => {
      if(task.id === id){
        task.status = !task.status
      }
    });
    setTasks([...tasks])
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } 

  const removeTask = (id: string) => {
    let newTasks = tasks.filter((task) => {
      return task.id !== id 
    });
    setTasks([...newTasks]);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  useEffect(()=>{
    
    let tasks = localStorage.getItem('tasks');
    
    if(tasks){
      const localTasks: Task[] = JSON.parse(tasks);
      setTasks(localTasks);
    }

  }, [])

  return (
      <div className="container">
        <form onSubmit={handleSubmit} >
          <div className='form-container'>
            <Input type="text" 
                        name='task'
                        value={task.message}
                        onChange={(e) => handleTodoChange(e)} 
                        width={80} />
            <Button type="submit" marginX={2}>
              <i className="fa-regular fa-xl fa-paper-plane"></i>
            </Button>
          </div>
        </form>
        
        <TableContainer margin={6}>
          <Table variant='striped' colorScheme='teal' width={80}>
            <TableCaption>That's all folks!</TableCaption>
            <Thead>
              <Tr>
                <Th>Todo</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                tasks.map(({id, message, status}) => (
                  <Tr key={id}>
                    <Td onClick={() => changeStatus(id)}>{!status ? message : <s>{message}</s>}</Td>
                    <Td><Button background={'000'} onClick={() => removeTask(id)}><i className="fa-solid fa-trash"></i></Button></Td>
                  </Tr>
                ))
              }  
            </Tbody>
          </Table>
        </TableContainer>           
      </div>
  )
}

export default App;
