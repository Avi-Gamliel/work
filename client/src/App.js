import React, { useEffect, useState, useRef } from 'react'
import './App.css';
import axios from 'axios'
import InputAutoComplete from './InputAutoComplete';
const autoComplete = (val, sug) => {


  const startArr = [];
  const includsArr = [];
  const exactArr = [];

  sug.forEach(s => {
    const start = s.startsWith(val)
    const include = s.includes(val)
    const exact = s === val

    if (exact) exactArr.push(s)
    else if (start) startArr.push(s)
    else if (include) includsArr.push(s)
  })

  return [...exactArr, ...startArr, ...includsArr]

}
function CopyText({ res }) {
  const resRef = useRef()
  const [show, setShow] = useState()
  useEffect(() => {

    if (res) {
      setShow(true)
    }

    return () => {

    }

  }, [res])

  useEffect(() => {

    let time = setTimeout(() => {
      if (resRef.current) {
        resRef.current.focus()
        resRef.current.select()
        document.execCommand('copy');
        setShow(false)
      }

    }, 1);
    return () => {
      clearTimeout(time)
    }
  }, [show])

  return (
    <>
      <div style={{ position: 'absolute', color: 'white', fontSize: 12, paddingRight: 10, paddingLeft: 10, top: -20, visibility: 'visible', background: 'red', zIndex: 2 }}>
        COPY!
        {show &&

          <input ref={resRef} value={res} onChange={() => { }} />}
        { }
      </div>
      <span style={{ width: 10, height: 10, background: 'red', position: 'absolute', top: -10, transform: 'rotate(45deg)', zIndex: 1 }}></span>
    </>
  )
}
function App() {
  const [city, setCity] = useState('')
  const [res, setRes] = useState('')

  const [street, setStreet] = useState('')
  const [num, setNum] = useState('')
  const [cities, setCities] = useState([])


  useEffect(() => {
    axios.get('http://localhost:4001')
      .then(res => setCities(res.data))
      .catch(err => console.error(err))
  }, [])

  const submitForm = (e) => {
    e.preventDefault()

    axios.post('http://localhost:4001/search', { city, street, num })
      .then(res => setRes(res.data))
      .catch(err => console.log(err))

  }
  const autoComplete = (e) => {
    setCity(city)

  }


  return (
    <div className="App">
      <form onSubmit={e => submitForm(e)}>
        <h1>איתור <span style={{ color: '#008080' }}>מיקוד</span></h1>
        <InputAutoComplete
          data={cities}
          onChange={autoComplete}
          placeHolder='עיר'
          stylesInput={stylesInput}
          max={5}
        />
        <input value={street} onChange={e => setStreet(e.target.value)} type="text" placeholder='רחוב' />
        <input value={num} onChange={e => setNum(e.target.value)} type="number" placeholder="מס'" />
        <button type="submit">search</button>
      </form>

      {res !== '' && <>
        <span style={{ position: 'absolute', top: 90, display: 'flex', justifyContent: 'center', width: '100%' }}><span style={{ position: 'absolute', display: 'flex', justifyContent: 'center', padding: 15, background: 'rgba(0,0,0,0.3)' }}>{res}<CopyText res={res} /></span>  </span>
      </>
      }
    </div>
  );
}

const stylesInput = {

  containerStyle: {
    position: 'relative', display: 'flex', alignItems: 'center'
  },

  autoBoxStyle: {

  },
  inputStyle: {
    // margin: 0,
  },

  suggestionStyleHover: {
    background: 'rgba(0,0,0,0.1)',
    color: 'black'
  },

  suggestionStyle: {
    background: 'rgba(0,0,0,0.2)',
    color: 'black'
  }
}
export default App;
