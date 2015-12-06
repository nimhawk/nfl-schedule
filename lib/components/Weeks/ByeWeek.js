import React from 'react';

export default ({week}) => {
  return (<tr className="info">
   <td>Week {week}</td>
   <td colSpan="4"><b>BYE WEEK</b></td>
  </tr>);
};
