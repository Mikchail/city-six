import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux";
import {Operations} from "../../reducer/cities-reducer";
import Header from "../header/header";
import PlaceCardList from "../place-card-list/place-card-list";


const Favorite = () => {
  const dispatch = useDispatch();
  const favoriteOffers = useSelector(state=>state[`OFFERS`].favorites)
  useEffect(()=>{
    if(!favoriteOffers.length){
      dispatch(Operations.downloadFavorites())
    }
  },[favoriteOffers])
  console.log(favoriteOffers)
  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favoriteOffers &&  <PlaceCardList offers={favoriteOffers}/>}

          </section>
        </div>
      </main>
    </div>
  )
}
export default Favorite;
