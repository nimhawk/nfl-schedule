import React from 'react';

export default ({schedule}) => {
  const {week, date, opponent, home, score} = schedule;

  const win = (score.patriots > score.opponent);

  return (<tr className={win ? 'success' : 'danger'}>
    <td>Week {week}</td>
    <td>{date}</td>
    <td>Patriots
    { home ?
      <span> vs. </span>
    :
      <span> @ </span>
    }
    {opponent.location} {opponent.name}</td>
    <td>
    {score.patriots}<span> - </span>{score.opponent}
    </td>
    <td>{
      win ?
        <b>W</b>
      :
        <span>L</span>
    }</td>
  </tr>);
};
