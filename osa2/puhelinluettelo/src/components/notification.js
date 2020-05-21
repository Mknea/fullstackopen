import React from 'react'

const Notification = ( {text, isError} ) => {
    const notificationStyle = {
        color : 'green',
        fontStyle : 'italic',
        fontSize : 20,
        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const errorStyle = {...notificationStyle, color : 'red'}
    if (text === null) {
        return null
    }
    return(
        <div style={isError ? errorStyle : notificationStyle}>
        {text}
        </div>
    )
}
export default Notification;