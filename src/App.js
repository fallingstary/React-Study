import './App.css';
// import { Route, Link, Routes } from 'react-router-dom';
import Customer from './components/Customer';

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/any',
    'name': '정유성',
    'birthday': '980213',
    'gender': '남성',
    'job': '개발자'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/1',
    'name': '홍길동',
    'birthday': '920213',
    'gender': '남성',
    'job': '의적'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/2',
    'name': '이순신',
    'birthday': '870213',
    'gender': '남성',
    'job': '장군'
  },
]

function App() {
  return (
    <div className="auxiliaryWork">
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })
      }

      {/* <Routes>
        <Route element={<Customer />} />
      </Routes> */}
    </div>

  );
}

export default App;
