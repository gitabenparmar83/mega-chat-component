import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars';
import Message from './Message'
import TextInput from './TextInput'

const useStyles = makeStyles((theme) => ({
    chatBlock: {
        width: '95%',
        maxWidth: '1000px',
        height: 'calc(100vh - 100px)',
        background: '#E6EAEA',
        margin: '25px auto',
        display: 'flex',
        flexDirection: 'column',
    },
    chatMessaging: {
        flex: '1',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(1),
        '& .view': {
            display: 'flex',
            flexDirection: 'column-reverse',
        }
    },
    chatMessagingScrollInner: {
        marginRight: theme.spacing(2),
    },
    chatInput: {
        margin: theme.spacing(3),
    }
}));

const MegaChat = forwardRef((props, ref) => {
    const classes = useStyles();
    const { options: { userId, fetchMessages, sendMessage }} = props
    const [messages, setMessages] = useState([])

    const fetchLatestMessages = () => {
        fetchMessages().then(messages => {
            const sortedMessages = messages.sort((firstMessage, secondMessage) => firstMessage.timestamp - secondMessage.timestamp)
            sortedMessages.forEach(function(msg, index) {
                let prevMessage = sortedMessages[index - 1]
                let nextMessage = sortedMessages[index + 1]
                sortedMessages[index] = {
                    ...msg,
                    hideUserName: prevMessage ? prevMessage['author'] === msg.author : false,
                    hideDate: nextMessage ? nextMessage['author'] === msg.author : false,
                }
            });
            setMessages(sortedMessages)
        })
    }

    useEffect(() => {
        fetchLatestMessages()
    })

    useImperativeHandle(ref, () => {
        return {
            onNewMessage: () => {
                fetchLatestMessages()
            }
        }
    });

    return (
        <div>
            <Paper elevation={3} className={classes.chatBlock}>
                <div className={classes.chatMessaging}>
                    <Scrollbars
                        renderView={props => <div {...props} className="view"/>}
                    >
                        <div className={classes.chatMessagingScrollInner}>
                            {messages.map((message, index) => (
                                <Message key={index} message={message} currentUserId={userId} />
                            ))}
                        </div>
                    </Scrollbars>
                </div>
                <div className={classes.chatInput}>
                    <TextInput sendMessage={sendMessage} userId={userId} />
                </div>
            </Paper>
        </div>
    )
})

export default MegaChat