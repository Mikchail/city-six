import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Operations} from "../../reducer/cities-reducer";
import {useHistory} from "react-router-dom"
import Header from "../header/header";
import MyFavoriteBtn from "../myfavorite-btn/myfavorite-btn";


const Favorite = () => {
  const dispatch = useDispatch();
  const favoriteOffers = useSelector(state => state[`OFFERS`].favorites)
  const locations = new Set();
  const history = useHistory();
  favoriteOffers.slice().forEach((offer) => locations.add(offer.city.name));
  useEffect(() => {
    if (!favoriteOffers.length) {
      dispatch(Operations.downloadFavorites())
    }
  }, [])
  const getRating = (r) => {
    return (100 / 5 * r) + '%'
  }
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {Boolean(favoriteOffers.length) && <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {[...locations].map(city => {
                return (<li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.filter(place => place.city.name === city).map(place => {
                      return (
                        <article onClick={(evt)=>{
                          evt.preventDefault();history.push(`offer/${place.id}`)
                        }} key={city + place.id} className="favorites__card place-card">
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <a href="#">
                              <img className="place-card__image" src={place.preview_image} width="150" height="110"
                                   alt="Place image"/>
                            </a>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{place.price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <MyFavoriteBtn offer={place}/>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{width: getRating(place.rating)}}/>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <a href="#">{place.title}</a>
                            </h2>
                            <p className="place-card__type">{place.room}</p>
                          </div>
                        </article>
                      )
                    })}

                  </div>
                </li>)
              })}


            </ul>
          </section>}

          {!favoriteOffers.length && (<section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan yor future
                trips.</p>
            </div>
          </section>)}
        </div>
      </main>
    </div>
  )
}
export default Favorite;
