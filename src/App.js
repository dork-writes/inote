import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import { useEffect } from 'react';
import API from './config';
import Logister from './components/Logister';
import { Route, Routes } from 'react-router-dom'
import RegisterForm from './components/RegisterForm';
import Authenticator from './components/Authenticator';
import NewNoteForm from './components/NewNoteForm';
import Note from './components/Note';

function App() {
  const [token, updateToken] = useState(localStorage.getItem('inotes-token') ? localStorage.getItem('inotes-token') : '');
  const [user, updateUser] = useState({});

  
  useEffect(()=>
  {
    //console.log(token);
    let fetchuser = async() =>
    {
      if (token.length)
      {
        let response = await fetch(`${API.auth}/deets`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
        });
  
        response = await response.json();
        updateUser(response.user);
      }
    }

    fetchuser();
  }, [token]);



  return (
    <>
       <Routes>
          <Route path = "/inote" element = {<Authenticator updateToken = {updateToken}/>} />
          <Route element = {<Logister API = {API} updateToken = {updateToken}/>} path = "/inote/authentication">
            <Route index element = {<RegisterForm hidden = "opacity-0 transition-all" logo = "mt-10 mb-[-2rem]"/>} />
            <Route path = "register" element = {<RegisterForm hidden = "opacity-[100%] transition-all mt-12" logo = "mt-6"/>} />
          </Route>
          <Route element = {
            <div>
              <Navbar token = {token} name = {user ? user.name : ''}/>
              <Notes API = {API} token = {token}/>
            </div>
          } path = "/inote/notes" />
          <Route element = {<NewNoteForm notesAPI = {API.notes} token = {token} user = {user}/>} path = "/inote/addnote"></Route>
          <Route element = {<Note API = {API} token = {token}/>} path = "/inote/notes/:id" />
          <Route element = {<NewNoteForm notesAPI = {API.notes} token = {token}/>} path = "/inote/updatenote/:id" />        
          </Routes>
    </>
  );
}

export default App;
