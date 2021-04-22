import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import ItemThumbnail from '../ItemThumbnail/ItemThumbnail';

const ItemRecommender = () => {
  let output = <h1>recommender system</h1>;
  const [recommendedItems, setRecommendedItems] = useState();
  useEffect(() => {
    axios
      .post(
        `${apiEndPoint}/users/cf-items`,
        { restaurantId: null },
        {
          headers: {
            Authorization: 'bearer ' + localStorage.getItem('tokenId'),
          },
        },
      )
      .then((res) => {
        // console.log(res);
        setRecommendedItems(res.data.recommendedItems[1]);
      })
      .catch((err) => console.log(err));
  }, []);
  if (recommendedItems) {
    output = recommendedItems.map((item) => (
      <ItemThumbnail
        key={item.item._id}
        rating={item.rating}
        prevRating={null}
        itemId={item.item._id}
        name={item.item.name}
        img={item.item.image}
      />
    ));
  }

  return <>{output}</>;
};

export default ItemRecommender;
