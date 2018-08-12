import React from 'react'

const SearchBox = props => {
  const style = {
    box: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: '5rem'
    },
    input: {
      width: '30rem',
      marginRight: '2rem',
      borderRadius: '0px',
      border: 'none',
      textAlign: 'center',
      color: 'black'
    },
    button: {
      lineHeight: '2rem',
      fontSize: '1.125rem',
      width: '8rem',
      textAlign: 'center',
      border: '1px solid white',
      color: 'white'
    }
  }

  return (
    <div style={style.box}>
      <input
        style={style.input}
        placeholder={props.placeholder}
        type="text"
        onChange={props.onChange}>
      </input>

      <a href='#' style={style.button}>Search</a>
    </div>
  )
}

const Home = () => {
  let store = { input: '' }

  const style = {
    top: {
      box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'end',
        paddingTop: '2rem',
        paddingRight: '2rem'
      },
      button: {
        width: '8rem',
        height: '2rem',
        textAlign: 'center',
        color: 'white',
        lineHeight: '2rem'
      }
    },
    body: {
      box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '6rem'
      },
      title: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        color: 'white'
      }
    }
  }  

  return (
    <div>
      <div style={style.top.box}>
        <a href='#'><p style={style.top.button}>Register</p></a>
        <a href='#'><p style={style.top.button}>Login</p></a>
      </div>

      <div style={style.body.box}>
        <p style={style.body.title}>Where to code</p>

        <SearchBox
          placeholder='Search coding spots around an address'
          store={store.input}
          onChange={ev => store.input = ev.target.value}
        />
      </div>
    </div>
  )
}

export default Home