import React, { useEffect, useRef, useState } from 'react';
import { actions } from '../../store/configureStore';
import { useStore } from '../../store/store';
import * as requests from '../../utils/requests';
import { apiEndPoint } from '../../utils/common';
import ItemForm from '../../components/ItemForm/ItemForm';
import Menu from '../../components/Menu/Menu';
import ItemThumbnail from '../../components/ItemThumbnail/ItemThumbnail';
import Spinner from '../../components/UI/Spinner/Spinner';
import Footer from '../../components/navigation/Footer/Footer';
import Header from '../../components/navigation/Header/Header';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Container from '../../hoc/Container/Container';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import classes from './Restaurant.module.css';

const Restaurant = (props) => {
  const [{ restaurants, token, user, recommendedItems }, dispatch] = useStore();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const restaurant = useRef(null);
  const ratedItems = useRef([]);
  const isRatedItemsEdited = useRef(false);
  useEffect(() => {
    setIsLoading(true);
    if (restaurants) {
      restaurant.current = restaurants.find(
        (resto) => resto._id === props.match.params.restaurantId,
      );
      if (restaurant.current && !restaurant.current.menu) {
        requests
          .getRestaurantItems(restaurant.current._id)
          .then((res) => {
            // console.log(res);
            res.data.items.forEach((item) => {
              if (item.rating !== 0) {
                ratedItems.current.push({
                  _id: item.item._id,
                  rating: item.rating,
                  prevRating: item.prevRating,
                });
              }
            });
            restaurant.current.menu = res.data.items;
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setError({ message: err.message, modal: true });
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, [
    restaurants,
    props.match.params.restaurantId,
    dispatch,
    token,
    props.history,
  ]);

  const toggleUsual = (item) => {
    let tmp;
    if (item.prevRating === null) {
      tmp = {
        _id: item._id,
        rating: 5,
        prevRating: item.rating,
      };
    } else {
      if (item.prevRating === 0) {
        ratedItems.current = ratedItems.current.filter(
          (i) => i._id !== item._id,
        );
        return;
      }
      tmp = {
        _id: item._id,
        rating: item.prevRating,
        prevRating: null,
      };
    }

    for (let i = 0; i < ratedItems.current.length; i++) {
      if (ratedItems.current[i]._id === item._id) {
        ratedItems.current[i] = tmp;
        tmp = null;
        break;
      }
    }
    if (tmp) {
      ratedItems.current.push(tmp);
    }
  };

  const updateRating = (item, rating) => {
    if (item.prevRating === null && rating === 0) {
      ratedItems.current = ratedItems.current.filter(
        (i) => i._id.toString() !== item._id.toString(),
      );
      return;
    }
    for (let i = 0; i < ratedItems.current.length; i++) {
      if (ratedItems.current[i]._id === item._id) {
        if (ratedItems.current[i].prevRating !== null) {
          ratedItems.current[i].prevRating = rating;
        } else {
          ratedItems.current[i].rating = rating;
        }
        return;
      }
    }
    ratedItems.current.push({
      _id: item._id,
      rating: rating,
      prevRating: null,
    });
  };

  const updatesFinished = () => {
    if (isRatedItemsEdited.current) {
      requests
        .updateRatings(props.match.params.restaurantId, ratedItems.current)
        .then((res) => {
          res.data.restaurant.ratedItems.forEach((ratedItem) => {
            for (let i = 0; i < restaurant.current.menu.length; i++) {
              if (
                ratedItem._id.toString() === restaurant.current.menu[i].item._id
              ) {
                restaurant.current.menu[i].rating = ratedItem.rating;
                restaurant.current.menu[i].prevRating = ratedItem.prevRating;
                break;
              }
            }
          });
          dispatch(actions.UPDATE_USER_RESTAURANTS, res.data.restaurants);
          isRatedItemsEdited.current = false;
          props.history.goBack();
        })
        .catch((err) => console.log(err));
    } else {
      props.history.goBack();
    }
  };

  const setEdited = () => {
    isRatedItemsEdited.current = true;
  };

  let output = 502;

  if (!isLoading && restaurant.current && token) {
    if (!error) {
      if (restaurant.current.menu.length === 0) {
        output = 501;
      } else {
        let tmpRec;
        if (recommendedItems) {
          tmpRec = recommendedItems.find(
            (resto) => resto._id.toString() === restaurant.current._id,
          );
        }
        if (tmpRec) {
          let counter = 0;
          let itemsToFind = 2;
          output = restaurant.current.menu.map((item) => {
            let recommended;
            if (counter < 2) {
              for (let i = 0; i < itemsToFind; i++) {
                if (
                  tmpRec.recommendedItems[i] &&
                  tmpRec.recommendedItems[i].item._id.toString() ===
                    item.item._id.toString()
                ) {
                  recommended = tmpRec.recommendedItems[i++].rating;
                }
              }
            }
            return (
              <ItemThumbnail
                key={item.item._id}
                itemId={item.item._id}
                name={item.item.name}
                img={item.item.image}
                rating={item.rating}
                prevRating={item.prevRating}
                recommended={recommended}
                isDeleted={item.item.deletedAt}
                editable
                setEdited={setEdited}
                toggleUsual={toggleUsual}
                updateRating={updateRating}
              />
            );
          });
        } else {
          output = restaurant.current.menu.map((item) => {
            return (
              <ItemThumbnail
                key={item.item._id}
                itemId={item.item._id}
                name={item.item.name}
                img={item.item.image}
                rating={item.rating}
                prevRating={item.prevRating}
                isDeleted={item.item.deletedAt}
                setEdited={setEdited}
                editable
                toggleUsual={toggleUsual}
                updateRating={updateRating}
              />
            );
          });
        }
      }
    } else {
      output = 500;
    }
  }
  return (
    <>
      <Header
        onLogoClick={() => props.history.push('/')}
        onAccountClick={() => props.history.push('/account')}
      />
      <Container>
        <section className={classes.restaurantItems}>
          <SectionTitle
            label={restaurant?.current?.name}
            onBack={props.history.goBack}
          />

          {output === 500 ? (
            <div className={classes.spinnerontainer1}>
              <span>SOMETHING WENT WRONG</span>
            </div>
          ) : output === 502 ? (
            <div className={classes.spinnerontainer}>
              <Spinner />
            </div>
          ) : output === 501 ? (
            <div className={classes.spinnerontainer1}>
              <span>NO MENU FOUND</span>
            </div>
          ) : (
            <Menu output={output} updatesFinished={updatesFinished} />
          )}
        </section>
      </Container>
      <Footer
        actionLabel={`Help us populate ${restaurant?.current?.name} with menu items (Beta version)`}
        actionButtonLabel={'Add Item'}
        modalChildren={
          <div className={classes.modal}>
            <ItemForm restaurantId={props.match.params.restaurantId} />
          </div>
        }
      />
      <ErrorHandler error={error} setError={setError} />
    </>
  );
};
export default Restaurant;
