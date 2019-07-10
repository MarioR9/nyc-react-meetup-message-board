import React from 'react'
import ReactDOM from 'react-dom'
import io from 'socket.io-client'
var current = ["Steve","Bill"]
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { messages: [],
                  username:"" }
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] })
    })
    
  }

  handleSubmit = event => {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      const message = {
        body,
        from: this.state.username
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body)
      this.socket.emit('message', from)
      event.target.value = ''
    }
  }
  HandleUsername=(e)=>{
  this.setState({username: e.currentTarget.value})
  }

  render () {
    const messages = this.state.messages.map((message, index) => {
      const img = message.img ? <img src={message.img} width='200px' /> : null
      return <li key={index}><b>{message.from}:</b>{message.body} {img}</li>
    })
    return (
      <div>
        
        <h1>Enter messages</h1>
        <input type='text' placeholder='Enter UserName' onChange={(e)=>{this.HandleUsername(e)}} />
        <input type='text' placeholder='Enter a message...' onKeyUp={this.handleSubmit} />
        {messages}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
