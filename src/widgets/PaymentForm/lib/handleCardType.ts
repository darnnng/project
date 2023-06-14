import getCardType from 'credit-card-type';

export const getCardTypeFromNumber = (cardNumber: string) => {
  const cardTypes = getCardType(cardNumber);
  if (cardTypes.length > 0) {
    return cardTypes[0].niceType;
  }
  return '';
};
