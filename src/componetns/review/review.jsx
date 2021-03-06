import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ratingToStar} from '../../utils.js';

class Review extends PureComponent {
  constructor(props) {
    super(props);
  }
  dateStamp(date) {
    const dateObj = new Date(date);

    const MONTHS = [
      `January`,
      `February`,
      `March`,
      `April`,
      `May`,
      `June`,
      `July`,
      `August`,
      `September`,
      `October`,
      `November`,
      `December`,
    ];

    return `${MONTHS[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  }
  render() {
    const {rating, comment, date, user} = this.props.review;
    const ratingReview = ratingToStar(rating);
    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={user.avatar_url}
              width="54"
              height="54"
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">{user.name}</span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: ratingReview + `%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">{comment}</p>
          <time className="reviews__time" dateTime={date}>
            {this.dateStamp(date)}
          </time>
        </div>
      </li>
    );
  }
}
Review.propTypes = {
  review: PropTypes.shape(
      {
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string,
        date: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired,
      }
  )
};
export default Review;
