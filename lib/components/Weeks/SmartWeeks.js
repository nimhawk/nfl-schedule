import React from 'react';

import ByeWeek from './ByeWeek';
import PendingWeek from './PendingWeek';
import RegularWeek from './RegularWeek';

export default ({schedule}) => {
  const mapped = schedule.map((s) => {
    if (!s.opponent) {
      return <ByeWeek week={s.week}/>;
    }

    if (!s.score) {
      return <PendingWeek schedule={s}/>;
    }

    return <RegularWeek schedule={s}/>;
  });

  return <tbody>{mapped}</tbody>;
};

