import React, { useState } from 'react'
import { InputBase, IconButton, makeStyles } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
    chatTextInput: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        display: 'flex',
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    },
    inputBase: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    input: {
        padding: '8px',
        fontSize: '14px',
    },
    iconButton: {
        padding: 9,
        background: '#32465a',
        color: '#fff',
        '&:hover': {
            background: '#293b4c',
        }
    },
}));

const TextInput = ({ userId, sendMessage }) => {
    const [inputText, setInputText] = useState('')
    const classes = useStyles();

    const handleSendMessage = () => {
        if (inputText.trim()) {
            sendMessage({
                author: userId,
                body: inputText,
                timestamp: Date.now(),
            })
            setInputText('')
        }
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return (
        <div className={classes.chatTextInput}>
            <InputBase
                classes={{ root: classes.inputBase, input: classes.input }}
                placeholder="Type a message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyUp={handleKeyPress}
            />
            <IconButton
                className={classes.iconButton}
                aria-label="send-button"
                onClick={handleSendMessage}
            >
                <SendIcon />
            </IconButton>
        </div>
    )
}

export default TextInput