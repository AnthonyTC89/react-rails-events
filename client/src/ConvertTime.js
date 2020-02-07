const ConvertTime = (strfullTime) => {
  const strTime24 = strfullTime.slice(11, 16);
  const arrTime = strTime24.split(':');
  const AmOrPm = arrTime[0] >= 12 ? 'PM' : 'AM';
  const hours = (arrTime[0] % 12) || 12;
  const minutes = arrTime[1];
  return `${hours}:${minutes} ${AmOrPm}`;
};

export default ConvertTime;
