import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { actions } from '../../store/configureStore';
import { useStore } from '../../store/store';
import { apiEndPoint } from '../../utils/common';
import ItemForm from '../../components/ItemForm/ItemForm';
import Menu from '../../components/Menu/Menu';
import ItemThumbnail from '../../components/ItemThumbnail/ItemThumbnail';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Buttons/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Restaurant.module.css';
import Footer from '../../components/navigation/Footer/Footer';
import Header from '../../components/navigation/Header/Header';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Container from '../../hoc/Container/Container';

const Restaurant = (props) => {
  const [
    { restaurants, isLoading, error, token, user, recommendedItems },
    dispatch,
  ] = useStore();
  const [showModal, setShowModal] = useState(false);
  const restaurant = useRef(null);
  const ratedItems = useRef([]);
  const itemsToDelete = useRef([]);
  useEffect(() => {
    if (!token) {
      props.history.push('/');
      return;
    }
    dispatch(actions.IS_LOADING);
    if (restaurants) {
      restaurant.current = restaurants.find(
        (resto) => resto._id === props.match.params.restaurantId,
      );
      if (restaurant.current && !restaurant.current.menu) {
        axios
          .get(`${apiEndPoint}/items/${restaurant.current._id}`, {
            headers: {
              Authorization: 'bearer ' + localStorage.getItem('tokenId'),
            },
          })
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
            dispatch(actions.IS_NOT_LOADING);
          })
          .catch((err) => {
            console.log(err);
            dispatch(actions.IS_ERROR, err);
          });
      } else {
        dispatch(actions.IS_NOT_LOADING);
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

  const setupForDeletion = (itemId, shouldDelete) => {
    if (shouldDelete) {
      itemsToDelete.current.push(itemId);
    } else {
      itemsToDelete.current = itemsToDelete.current.filter(
        (id) => id.toString() !== itemId.toString(),
      );
    }
  };

  const updatesFinished = () => {
    if (user._id.toString() === restaurant.current.owner.toString()) {
      if (ratedItems.current.length) {
        axios
          .patch(
            `${apiEndPoint}/users/rating`,
            {
              _id: props.match.params.restaurantId,
              ratedItems: ratedItems.current,
            },
            {
              headers: {
                Authorization: 'bearer ' + localStorage.getItem('tokenId'),
              },
            },
          )
          .then((res) => {
            res.data.restaurant.ratedItems.forEach((ratedItem) => {
              for (let i = 0; i < restaurant.current.menu.length; i++) {
                if (
                  ratedItem._id.toString() ===
                  restaurant.current.menu[i].item._id
                ) {
                  restaurant.current.menu[i].rating = ratedItem.rating;
                  restaurant.current.menu[i].prevRating = ratedItem.prevRating;
                  break;
                }
              }
            });
            dispatch(actions.UPDATE_USER_RESTAURANTS, res.data.restaurants);

            axios
              .post(
                `${apiEndPoint}/items/delete`,
                { itemsToDelete: itemsToDelete.current },
                {
                  headers: {
                    Authorization: 'bearer ' + localStorage.getItem('tokenId'),
                  },
                },
              )
              .then((result) => {
                const menu = restaurant.current.menu.filter(
                  (item) =>
                    !itemsToDelete.current.find(
                      (i) => item.item._id.toString() === i,
                    ),
                );
                restaurant.current.menu = menu;
                const updatedRestaurants = [];
                restaurants.forEach((resto) => {
                  if (resto._id === props.match.params.restaurantId) {
                    updatedRestaurants.push(restaurant.current);
                  } else {
                    updatedRestaurants.push(resto);
                  }
                });

                dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
                props.history.goBack();
                // console.log(result);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(
            `${apiEndPoint}/items/delete`,
            { itemsToDelete: itemsToDelete.current },
            {
              headers: {
                Authorization: 'bearer ' + localStorage.getItem('tokenId'),
              },
            },
          )
          .then((result) => {
            const menu = restaurant.current.menu.filter(
              (item) =>
                !itemsToDelete.current.find(
                  (i) => item.item._id.toString() === i,
                ),
            );
            restaurant.current.menu = menu;
            const updatedRestaurants = [];
            restaurants.forEach((resto) => {
              if (resto._id === props.match.params.restaurantId) {
                updatedRestaurants.push(restaurant.current);
              } else {
                updatedRestaurants.push(resto);
              }
            });

            dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
            props.history.goBack();
          })
          .catch((err) => console.log(err));
      }
    } else {
      axios
        .patch(
          `${apiEndPoint}/users/rating`,
          {
            _id: props.match.params.restaurantId,
            ratedItems: ratedItems.current,
          },
          {
            headers: {
              Authorization: 'bearer ' + localStorage.getItem('tokenId'),
            },
          },
        )
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
          const updatedRestaurants = [];
          restaurants.forEach((resto) => {
            if (resto._id === props.match.params.restaurantId) {
              updatedRestaurants.push(restaurant.current);
            } else {
              updatedRestaurants.push(resto);
            }
          });
          dispatch(actions.UPDATE_USER_RESTAURANTS, res.data.restaurants);
          dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
          // console.log(res);
          props.history.goBack();
        })
        .catch((err) => console.log(err));
    }
  };

  let output = <Spinner />;

  if (!isLoading && restaurant.current && token) {
    if (!error) {
      if (restaurant.current.menu.length === 0) {
        output = <h1>{'empty menu :('}</h1>;
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
                ownership={
                  user._id.toString() === restaurant.current.owner.toString()
                }
                editable
                toggleUsual={toggleUsual}
                setupForDeletion={setupForDeletion}
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
                ownership={
                  user &&
                  user._id.toString() === restaurant.current.owner.toString()
                }
                editable
                toggleUsual={toggleUsual}
                setupForDeletion={setupForDeletion}
                updateRating={updateRating}
              />
            );
          });
        }
      }
    } else {
      output = <h1>{'ERROR'}</h1>;
    }
  }
  return (
    <>
      {showModal ? (
        <Modal
          modalClosed={() => {
            setShowModal(false);
          }}
        >
          <div className={classes.modal}>
            <ItemForm restaurantId={props.match.params.restaurantId} />
          </div>
        </Modal>
      ) : null}
      <Header onClick={props.history.goBack} />
      <Container>
        <section className={classes.restaurantItems}>
          <SectionTitle
            label={restaurant?.current?.name}
            onBack={props.history.goBack}
          />

          <Menu output={output} updatesFinished={updatesFinished} />
        </section>
      </Container>
      <Button className={classes.addBtn} clicked={() => setShowModal(true)}>
        <div></div>
      </Button>
      <Footer
        actionLabel={`Help us populate ${restaurant?.current?.name} with menu items (Beta version)`}
        actionButtonLabel={'Add Item'}
        modalChildren={
          <div className={classes.modal}>
            <ItemForm restaurantId={props.match.params.restaurantId} />
          </div>
        }
      />
    </>
  );
};
export default Restaurant;
