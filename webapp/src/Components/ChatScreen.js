import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import { css } from '@emotion/core'

const ChatScreen = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      name: 'Mark',
      image:
        'https://media.npr.org/assets/img/2018/11/21/gettyimages-962142720-3f4af695a639cbc14deb90e88287cd3c19b676f4-s800-c85.jpg',
      message: "Hey Javier! What's up?"
    },
    {
      name: 'Mark',
      image:
        'https://media.npr.org/assets/img/2018/11/21/gettyimages-962142720-3f4af695a639cbc14deb90e88287cd3c19b676f4-s800-c85.jpg',
      message: 'How is React going for you?'
    },
    {
      message: 'Well...'
    }
  ])

  const handleSend = e => {
    e.preventDefault()
    setMessages([...messages, { message: input }])
    setInput('')
  }

  return (
    <div>
      <p
        css={css`
          text-align: center;
          padding: 20px;
          color: gray;
        `}
      >
        CONVERSATION WITH MARK STARTED ON 01/21/2021
      </p>
      {messages.map(message =>
        message.name ? (
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 20px;
            `}
          >
            <Avatar alt={message.name} className='chatScreen_image' src={message.image} />
            <p
              css={css`
                margin-left: 10px;
                background-color: lightgray;
                padding: 15px;
                border-radius: 20px;
              `}
            >
              {message.message}
            </p>
          </div>
        ) : (
          <div
            css={css`
              display: flex;
              align-items: center;
              padding: 20px;
              flex-direction: column;
            `}
          >
            <p
              css={css`
                margin-left: auto;
                background-color: #29b3cd;
                padding: 15px;
                border-radius: 20px;
                color: white;
              `}
            >
              {message.message}
            </p>
            <img
              alt='mark'
              css={css`
                border-radius: 20px;
                width: 350px;
                height: 190px;
                margin-left: auto;
                padding: 15px;
              `}
              src='https://media.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif'
            />
          </div>
        )
      )}
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 20px;
        `}
      >
        <Avatar
          src={
            'https://media.npr.org/assets/img/2018/11/21/gettyimages-962142720-3f4af695a639cbc14deb90e88287cd3c19b676f4-s800-c85.jpg'
          }
        />
        <p
          css={css`
            padding: 20px;
            color: gray;
            font-size: 20px;
          `}
        >
          Mark Has left the Chat
        </p>
      </div>

      <form
        css={css`
          display: flex;
          padding: 5px;
          position: fixed;
          bottom: 0;
          width: 100%;
          border-top: 1px solid lightgray;
        `}
      >
        <input
          css={css`
            flex: 1;
            padding: 10px;
            border: none;
          `}
          onChange={e => setInput(e.target.value)}
          placeholder='Type a message'
          type='text'
          value={input}
        />
        <button
          css={css`
            border: none;
            margin-right: 20px;
            background-color: white;
            font-weight: bolder;
            color: #fe3d71;
            cursor: pointer;
          `}
          onClick={handleSend}
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatScreen
