import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../actions/action-creator';
import {SortTypes} from '../../utils.js';
import withActiveItem from '../hocs/withActiveitem.jsx';
import {connect} from 'react-redux';

class SortOptions extends PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const {
      handleOffersSort,
      sortType,
      isOpened,
      handleToggleClick,
    } = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={handleToggleClick}
        >
          {sortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select" />
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            isOpened ? `places__options--opened` : null
          }`}
        >
          {Object.values(SortTypes).map((item, i) => (
            <li
              key={i}
              onClick={() => {
                handleOffersSort(item);
                handleToggleClick();
              }}
              className={`places__option ${
                item === sortType ? `places__option--active` : ``
              }`}
              tabIndex="0"
            >
              {item}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

SortOptions.propTypes = {
  handleOffersSort: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sortType: state[`SORT`].sortType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleOffersSort(sortType) {
    dispatch(ActionCreator.sortOffers(sortType));
  },
});

export default withActiveItem(
  connect(mapStateToProps, mapDispatchToProps)(SortOptions)
);
