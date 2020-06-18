import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    repliesLeft: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
    },
    sendRight: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'right',
        marginBottom: theme.spacing(2),
    },
    sendAuthor: {
        marginBottom: theme.spacing(1),
        fontSize: '16px',
        color: '#293b4c',
    },
    sendMsgWrapper: {
        display: 'inline-block',
        width: '100%',
    },
    sendMsg: {
        backgroundColor: '#fff',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#212121',
        padding: theme.spacing(2),
        borderRadius: '4px',
        maxWidth: '80%',
        marginLeft: 'auto',
        display: 'inline-block',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    repliesMsg: {
        backgroundColor: '#32465a',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#fff',
        padding: theme.spacing(2),
        borderRadius: '4px',
        maxWidth: '80%',
        marginRight: 'auto',
        display: 'inline-block',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    },
    sendMsgTime: {
        fontSize: '13px',
        color: '#484848',
        marginTop: theme.spacing(1),
    },
}));

const Message = ({ message: { body, timestamp, author, hideUserName, hideDate }, currentUserId }) => {
    const classes = useStyles();
    const isCurrentUser = author === currentUserId
    const t = new Date(timestamp)
    const date = `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${t.getMinutes()}`

    return (
        <div className={ isCurrentUser ? classes.sendRight : classes.repliesLeft}>
            {!hideUserName ? (
                <div className={classes.sendAuthor}>
                    <b>{ author }</b>
                </div>
            ) : null}
            <div className={classes.sendMsgWrapper}>
                <div className={isCurrentUser ? classes.sendMsg : classes.repliesMsg}>{ body }</div>
                {!hideDate ? (
                    <div className={classes.sendMsgTime}><small>{ date }</small></div>
                ) : null}
            </div>
        </div>
    )
}

export default Message
