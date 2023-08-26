import './App.css';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react'; // Import useEffect
import Home from './components/pages/Home';
import SessionHomeworkHandler from './components/pages/SessionHomeworkHandler';
import HomeworkProvider from './Data/HomeworkContext';
import Settings from './components/pages/Settings';
import WorkPage from './components/pages/WorkPage';
import SessionsPage from './components/pages/SessionsPage';


function App() {

  return (
    <div className=' bg-black flex-1 flex flex-col items-center w-full'>
      <div className='flex flex-row gap-2'>

          <p className='text-2xl text-center text-white'>School Organizer</p>

      </div>
      <HomeworkProvider>
        <MemoryRouter>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<SessionHomeworkHandler />} path='/create-session' />
            <Route element={<Settings />} path='/settings' />
            <Route element={<SessionsPage />} path='/sessions' />
            <Route element={<WorkPage/>} path='/work'/>
          </Routes>
        </MemoryRouter>
      </HomeworkProvider>
    </div>
  );
}

export default App;
