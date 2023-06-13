import React from 'react';
import { useState, useEffect } from 'react';
import DateTimeDisplay from './DateTimeDisplay';

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const ExpiredNotice = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{lineHeight: '1.75rem', padding: '.5rem'}}>
        <DateTimeDisplay value={0} type={'Dias'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={0} type={'Horas'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={0} type={'Minutos'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={0} type={'Segundos'} isDanger={false} />
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{lineHeight: '1.75rem', padding: '.5rem'}}>
        <DateTimeDisplay value={days} type={'Dias'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Horas'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Minutos'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Segundos'} isDanger={false} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  console.log(days, hours, minutes, seconds);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days? days : 0}
        hours={hours ? hours : 0}
        minutes={minutes ? minutes : 0}
        seconds={seconds ? seconds : 0}
      />
    );
  }
};

export default CountdownTimer;
