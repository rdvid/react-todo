import { FormEvent, MouseEventHandler, useState } from 'react'
import styled from 'styled-components'
import { TodoService } from './service'
import { Task } from './service'

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

const HomeContainer = styled.div`
  font-family: arial;
  font-size: 20px;
  margin: 12px;
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

const Table = styled.table`
  margin: 4%;
  width: 50%;
`
const TableColumn = styled.tr`
  text-align: left;
`
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
let id = 1;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ id: id++, message: '', status: false});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(task.message){
      setTasks([...tasks, {id: id++, message: task.message, status: false}])
    }
    setTask({id:id++, message: '', status: false})
  }

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let message = e.target.value;
    setTask({ id: id++, message, status: false })
  }

  const changeStatus = (id: number) => {
    let task = tasks.find((task) => task.id === id);
    if(task){
      task.message = "abuble"
      task.status = !task.status
    }
  } 

  return (
    <>
      <HomeContainer>
        <Form onSubmit={handleSubmit} >
          <InputField type="text" 
                      name='task'
                      onChange={(e) => handleTodoChange(e)} />
          <button type="submit">
            <i className="fa-regular fa-xl fa-paper-plane"></i>
          </button>
          {/* <input type="submit" 
                 value="Submit" 
                 onClick={(e) => handleSubmit(e)}/> */}
        </Form>
        <Table>
          <thead>
            <TableColumn>
              <th>Task</th>
              <th></th>
              <th>Status</th>
            </TableColumn>
          </thead>
          <tbody>
            {
              tasks.map((task) => (
                <TableColumn key={task.id}
                             onClick={() => changeStatus(task.id)}>
                  <td>{task.message}</td>
                  <td></td>
                  <td>{task.status ? "Feito" : "Pendente"}</td>
                </TableColumn>
              ))
            }
          </tbody>
        </Table>
      </HomeContainer>
    </>
  )
}

export default App
