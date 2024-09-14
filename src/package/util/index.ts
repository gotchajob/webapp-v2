import { format, parseISO } from 'date-fns';

export const formatNumber = (number: number) => {
  if (number !== undefined) {
    return number.toLocaleString('en-US');
  }
};

export const formatDate = (date: string, pattern: string) => {
  return date ? format(parseISO(date), pattern) : '';
};
export const stringToDate = (input: string) => {
  let date = new Date(2000, 0, 1);
  if (input) {
    if (input.includes('-')) {
      let dateParts = input.split('-');
      date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    }
    if (input.includes('/')) {
      let dateParts = input.split('/');
      date = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    }
  }
  return date;
};

export const calculateAverageRating = (rating: any[]) => {
  if (!rating || rating.length === 0) {
    return 0; // If no ratings, return 0
  }

  let totalRating = 0;
  let totalCount = 0;

  rating.forEach((ratingObj) => {
    totalRating += ratingObj.rating * ratingObj.count; // Calculate total rating
    totalCount += ratingObj.count; // Calculate total count
  });

  return totalCount === 0 ? 0 : totalRating / totalCount; // Return average or 0 if no count
};
