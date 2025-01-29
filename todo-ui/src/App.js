import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { TodoIndex } from './components/todo-index';
import './components/todo-index.css';
import { TodoLogin } from './components/todo-login';
import { TodoRegister } from './components/todo-register';
import { ToDoUserDashBoard } from './components/todo-userDash';
import { ToDoDetails } from './components/todo-details';
import { ToDoAddAppointment } from './components/todo-add-appointment';
import { ToDoEditAppointment } from './components/todo-edit-appointment';

function App() {
  return (
    <div className="todo-background">
      <BrowserRouter>
      <header>
        <h1 className='text-center text-light fs-1 bg-dark p-2'>To-Do</h1>
      </header>
      <section>
        <Routes>
          <Route path='/' element={<TodoIndex/>} />
          <Route path="user-register" element={<TodoRegister/>} />
          <Route path='user-login' element={<TodoLogin/>} />
          <Route path='user-dash' element={<ToDoUserDashBoard/>} />
          <Route path='todo-details/:id' element={<ToDoDetails/>}/>
          <Route path='add-appointment' element={<ToDoAddAppointment/>} />
          <Route path='todo-edit/:id' element={<ToDoEditAppointment/>}/>

        </Routes>
      </section>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
