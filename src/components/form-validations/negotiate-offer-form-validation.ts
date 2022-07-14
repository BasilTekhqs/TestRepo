import moment from 'moment';

const rentalOfferValidation = (values: any, data: any) => {
  const errorList: any = {};
  const diffDays = moment(values.moveInDate, 'YYYY-MM-DD').diff(60, 'days');
  if (!values.rent) {
    errorList.rent = 'Monthly rent is required';
  }

  if (diffDays > data.advertisedMoveInDate) {
    errorList.moveIn =
      'Move In Date needs to be within 60 days of the property Move In Date';
  }

  if (values.rent < data.advertisedMonthlyRent / 2) {
    errorList.rent =
      'Sorry this offer is much lower than advertised  ' +
      data.advertisedMonthlyRent +
      ')';
  }

  if (!values.moveInDate) {
    errorList.moveIn = 'Move in date is required';
  }
  return errorList;
};

export default rentalOfferValidation;
