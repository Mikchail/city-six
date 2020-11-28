import React, {useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Operations as ReviewOperations} from "../../reducer/review-reducer";
import {getOfferById} from '../../reducer/cities-selectors'
import Header from '../header/header';
import ReviewsList from "../reviews-list/reviews-list";
import FormADDReview from "../form-add-review/form-add-review";
import Map from "../map/map";

const Offer = (props) => {
  const {offerById, loadReview, reviews} = props;
  const params = useParams();
  const {id: idOffer} = params;
  const offer = offerById(Number(idOffer))

  if (!offer) {
    return <h1>Loading</h1>
  }

  const {
    bedrooms,
    city,
    description,
    goods,
    host,
    id,
    images,
    is_favorite,
    is_premium,
    location,
    max_adults,
    preview_image,
    price,
    rating,
    title,
    type
  } = offer
  const getWidthByRatting = (n) => {
    return 100 / 5 * n
  }
  return (
    <div className="page">
      <Header>
        <Link to={`/`} className="header__logo-link" href="main.html">
          <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
        </Link>
      </Header>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, 6).map((img, index) => {
                return (
                  <div key={img.slice(6, -4) + index} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={img}
                      alt="Photo studio"
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {is_premium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className="property__bookmark-button button"
                  type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getWidthByRatting(rating)}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type.slice(0, 1).toUpperCase() + type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} {bedrooms > 1 ? ' Bedrooms' : ' Bedroom'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((it) => {
                    return <li key={it} className="property__inside-item">{it}</li>
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper user__avatar-wrapper ${host.is_pro ? 'property__avatar-wrapper--pro' : ''}`}>
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatar_url}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                  {/*<p className="property__text">*/}
                  {/*  An independent House, strategically located between Rembrand*/}
                  {/*  Square and National Opera, but where the bustle of the city*/}
                  {/*  comes to rest in this alley flowery and colorful.*/}
                  {/*</p>*/}
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList id={idOffer}/>
                <FormADDReview/>
              </section>
            </div>
          </div>
          <Map offers={offer} />
          {/*<section className="property__map map"></section>*/}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/room.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;80</b>
                      <span className="place-card__price-text">
                      &#47;&nbsp;night
                    </span>
                    </div>
                    <button
                      className="place-card__bookmark-button place-card__bookmark-button--active button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: '80%'}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Private room</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-02.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;132</b>
                      <span className="place-card__price-text">
                      &#47;&nbsp;night
                    </span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: '80%'}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-03.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;180</b>
                      <span className="place-card__price-text">
                      &#47;&nbsp;night
                    </span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"/>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: '100%'}}/>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>

    </div>
  );
};
const mapStateToProps = (state) => ({
  offerById: getOfferById(state),
})


/*
it's for TypeScript
bedrooms: 1
city: {name: "Amsterdam", location: {…}}

      location:
      latitude: 52.37454
      longitude: 4.897976
      zoom: 13
      __proto__: Object
      name: "Amsterdam"

description: "Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport."
goods: (4) ["Breakfast", "Washer", "Laptop friendly workspace", "Air conditioning"]
host: {id: 25, name: "Angelina", is_pro: true, avatar_url: "img/avatar-angelina.jpg"}
id: 16
images: (14) ["https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg", "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg"]
is_favorite: false
is_premium: false
location: {latitude: 52.35054, longitude: 4.908976, zoom: 16}
max_adults: 2
preview_image: "https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg"
price: 464
rating: 2
title: "Loft Studio in the Central Area"
type: "hotel"
*/

export default connect(mapStateToProps)(Offer);
