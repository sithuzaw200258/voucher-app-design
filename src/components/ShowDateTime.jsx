import React from 'react'

const ShowDateTime = ({ timestamp }) => {
    // Format date and time
    const date = new Date(timestamp);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);

    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-GB', timeOptions);

    return (
        <div>
            <p className="">{formattedDate} </p>
            <p className="">{formattedTime}</p>
        </div>
    )
}

export default ShowDateTime