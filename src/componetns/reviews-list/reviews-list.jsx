import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import {connect} from "react-redux";
import {getReviews} from "../../reducer/review-selecors";
import {Operations as ReviewOperations} from "../../reducer/review-reducer";


class ReviewsList extends PureComponent {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.loadReview(this.props.id)
  }

  render() {
    const {reviewByid, id} = this.props;

    if(!reviewByid){
      return null
    }
    const {reviews}= reviewByid
    return (
      <React.Fragment>
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">
          {reviews ? reviews.length : null}
        </span></h2>
        <ul className="reviews__list">
          {reviews.map((review, index) => (
            index < 10 ?
              <Review
                key={review.id}
                review={review}
              />
              :
              null
          ))}
        </ul>
      </React.Fragment>

    )

  }
}


const mapStateToProps = (state) => ({
  reviewByid: getReviews(state),
});
const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => {

    dispatch(ReviewOperations.loadReview(id));
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(ReviewsList);



/*
ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(
          {
            rating: PropTypes.number.isRequired,
            comment: PropTypes.string,
            date: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
            user: PropTypes.shape(
                {
                  avatarUrl: PropTypes.string,
                  id: PropTypes.number,
                  isPro: PropTypes.bool,
                  name: PropTypes.string,
                })
          }
      )
  ),
  id: PropTypes.number.isRequired,
  downloadReviews: PropTypes.func.isRequired,
};
*/
// const mapStateToProps = (state) => {
//   const reviewByid = getReviews(state);
//
//   reviewByid.reviews.sort(function (a, b) {
//     let dateA = new Date(a.date);
//     let dateB = new Date(b.date);
//     return dateB - dateA;
//   });
//
//   return {reviewByid}
// };
