import React,{useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Operations} from "../../reducer/cities-reducer";

const MyFavoriteBtn = (props) => {
  const {offer} = props
  const {is_favorite,id} = offer
  const dispatch = useDispatch();
  const status = is_favorite ? 0 : 1

  const handleChangeStatus = () =>{
    dispatch(Operations.changeStatusOffer(id,status))
  }

  const classForFavorite = is_favorite ? 'place-card__bookmark-button--active' : ''
  return (
    <button onClick={handleChangeStatus}
      className={`place-card__bookmark-button button ${classForFavorite}`}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  )
}

export default MyFavoriteBtn;
