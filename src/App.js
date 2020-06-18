import React, {useState, useRef, useEffect} from 'react';
import { Button, makeStyles } from '@material-ui/core'
import MegaChat from './components/MegaChat'
import './App.css';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '10px',
  },
}));

function App() {
  const classes = useStyles();
  const ref = useRef(null);

  // this is the mock of external data storage
  const [messages, setMessages] = useState([
    {
      author: 'user1',
      body: 'Hello there!',
      timestamp: 1592465163069,
    },
    {
      author: 'user1',
      body: 'How are you?',
      timestamp: 1592465163069,
    },
    {
      author: 'user2',
      body: 'Hello user! I am good',
      timestamp: 1592465251218,
    }
  ])


  // Here we invoke child's onNewMessage function with will fetch the latest data
  // React follows unidirectional data flow so we can't pass onMessageChange to child and
  // track when it gets invoked. This app can be made easily using socket.io but here I have
  // implemented using only React js

  useEffect(() => {
    ref.current.onNewMessage();
  }, [messages])

  const onNewMessage = (newMessage) => {
    // this is a function which should be invoked when a new message arrives
    setMessages([...messages, {
      author: 'user1',
      body: 'This is a new message!',
      timestamp: Date.now(),
    }])
  }

  const options = {
    userId: 'Me',
    fetchMessages: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(messages)
        }, 300)
      })
    },
    sendMessage: msg => {
      setMessages([...messages, msg])
    },
  }

  return (
    <div className="App">
      <Button
          variant="contained"
          classes={{ root: classes.button }}
          size="small"
          color="secondary"
          onClick={onNewMessage}
      >
        Add a new message from outside of the MegaChat App
      </Button>
      <MegaChat ref={ref} options={options} />
    </div>
  );
}

export default App;
