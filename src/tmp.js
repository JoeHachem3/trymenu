import axios from 'axios';

const tmp = () => {
  axios
    .post('http://localhost:5000/items/dev', {
      items: [
        {
          name: 'Whopper Sandwich',
          price: 27000,
          image: 'uploads/items/burgerking-whoppersand.jpg',
        },
        {
          name: 'Double Whopper Sandwich',
          price: 34000,
          image: 'uploads/items/burgerking-doublewhoppersand.jpg',
        },
        {
          name: 'Triple Whopper Sandwich',
          price: 39000,
          image: 'uploads/items/burgerking-tripplewhoppersand.jpg',
        },
        {
          name: 'Steakhouse Sandwich',
          price: 32000,
          image: 'uploads/items/burgerking-steakhousesand.jpg',
        },
        {
          name: 'Big King XXL Sandwich',
          price: 35000,
          image: 'uploads/items/burgerking-bigkingxxl.jpg',
        },
        {
          name: 'Whopper Junior Sandwich',
          price: 21000,
          image: 'uploads/items/burgerking-juniorwhoppersand.jpg',
        },
        {
          name: 'Big King Beef Sandwich',
          price: 25000,
          image: 'uploads/items/burgerking-bigkingbeefsand.jpg',
        },
        {
          name: 'Double Cheeseburger',
          price: 27000,
          image: 'uploads/items/burgerking-doubleheeseburger.jpg',
        },
        {
          name: 'Chicken Royale Sandwich',
          price: 26000,
          image: 'uploads/items/burgerking-chickenroyalesand.jpg',
        },
        {
          name: 'Chicken Whopper',
          price: 27000,
          image: 'uploads/items/burgerking-chickenwhoppersand.jpg',
        },
      ],
      restaurant: '60c7c325f21b0229e0c4f0af',
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err.message));
};

export default tmp;
