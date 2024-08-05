export const getTimeAgo = (dateString: string): string => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate.getTime() - inputDate.getTime()) / 1000,
  );

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds}초전`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo}분전`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo}시간전`;
  } else if (timeDifferenceInSeconds < 2592000) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo}일전`;
  } else if (timeDifferenceInSeconds < 31536000) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${monthsAgo}달전`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${yearsAgo}년전`;
  }
};
