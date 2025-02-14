import React from 'react';

function Ticket({ userData }) {
  return (
    <div className="ticket">
      <p><strong>Full Name:</strong> {userData.fullName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <img src={userData.avatar} alt="Avatar" />
    </div>
  )
}

export default Ticket