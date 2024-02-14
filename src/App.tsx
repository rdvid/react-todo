import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Task } from './service'
import {v4 as uuid} from 'uuid';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

// const Button = styled.button`
//   color: #BF4F74;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid #BF4F74;
//   border-radius: 3px;
// `

// const keyframe = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `
// const Rotate = styled.div`
//   display: inline-block;
//   animation: ${keyframe} 4s linear infinite;
//   padding: 2rem 1rem;
//   font-size: 1.2rem;
// `;

// const Table = styled.table`
//   margin: 4%;
//   width: 50%;
// `
// const TableColumn = styled.tr`
//   text-align: left;
// `


const HomeContainer = styled.div`
  font-family: arial;
  font-size: 20px;
  margin: 60px;
  width: 100vw;
  height: 100vh;
  /* Center child horizontally*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputField = styled.input`
  height: 38px;
  width: 50%;
  border-radius: 30px;
  border: 1px solid black;
  margin-right: 12px;
  padding: 12px;
  font-size: 18px;
  shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
`

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
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

  const handleTodoDelete = ( taskId: string) => {
    let taskList = tasks.filter((task) => task.id !== taskId);
    setTasks(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let message = e.target.value;
    setTask({ id: uuid(), message, status: false })
  }

  const changeStatus = (id: string) => {
    let task = tasks.find((task) => task.id === id);
    if(task){
      task.message = "abuble"
      task.status = !task.status
    }
  } 

  useEffect(()=>{
    
    let tasks = localStorage.getItem('tasks');
    
    if(tasks){
      const localTasks: Task[] = JSON.parse(tasks);
      setTasks(localTasks);
    }

  }, [])

  return (
    <>
      <HomeContainer>
        <Form onSubmit={handleSubmit} >
          <InputField type="text" 
                      name='task'
                      value={task.message}
                      onChange={(e) => handleTodoChange(e)} />
          <button type="submit">
            <i className="fa-regular fa-xl fa-paper-plane"></i>
          </button>
          {/* <input type="submit" 
                 value="Submit" 
                 onClick={(e) => handleSubmit(e)}/> */}
        </Form>
        
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>That's all folks!</TableCaption>
              <Thead>
                <Tr>
                  <Th>Todo</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  tasks.map((task) => (
                    <Tr key={task.id}>
                      <Td>{task.message}</Td>
                      <Td>{task.status}</Td>
                    </Tr>
                  ))
                }
                
              </Tbody>
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          
          </TableContainer>         
        

      </HomeContainer>
    </>
  )
}

export default App
