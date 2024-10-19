import React, { useState } from 'react';
const UserHistory = () => {
    console.log("user history component")
    const [currentTime, setCurrentTime] = useState(new Date());
    const userName = localStorage.getItem('username');
    return (
        <div className="location-table-container">
            <h1 className='header'>User Location Details</h1>
            <table className="location-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Time</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{userName}</td>
                        <td>{currentTime.toLocaleTimeString()}</td>
                        <td>{'Latitude'}</td>
                        {/* <td>{latitude ? latitude : 'Loading...'}</td> */}
                        <td>{'Longitude'}</td>
                        <td>{'Address'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserHistory;