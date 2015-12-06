import React from 'react';

export default ({schedule}) => {
  const {week, date, opponent, home} = schedule;

  return (<tr>
    <td>Week {week}</td>
    <td>{date}</td>
    <td>Patriots
    { home ?
      <span> vs. </span>
    :
      <span> @ </span>
    }
    {opponent.location} {opponent.name}</td>
    <td colSpan="2"></td>
  </tr>);
};
