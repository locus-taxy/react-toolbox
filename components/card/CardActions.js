import React from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { CARD } from '../identifiers.js';

const CardActions = ({ children, className, theme, ...other }) => (
  <div className={classnames(theme.cardActions, className)} {...other}>
    {children}
  </div>
);

CardActions.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  theme: PropTypes.shape({
    cardActions: PropTypes.string
  })
};

export default themr(CARD)(CardActions);
export { CardActions };
