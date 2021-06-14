import React, { useEffect, useState } from 'react';
import Header2 from '../../../components/navigation/Header2/Header2';
import SideBar from '../SideBar';
import { actions } from '../../../store/configureStore';
import { useStore } from '../../../store/store';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import * as requests from '../../../utils/requests';
import classes from './AdminRestaurant.module.css';

const MoreBtn = (props) => {
  return (
    <div className={classes.btncontainer}>
      <input
        className={classes.actionbtn}
        type='button'
        value={'•••'}
        onClick={() => {}}
      />
      <div className={classes.submenu}>
        {props.showDelete ? (
          <input
            className={classes.delete}
            type='button'
            value={'delete'}
            onClick={props.handleDelete}
          />
        ) : null}
        {props.showUpdate ? (
          <input
            className={classes.update}
            type='button'
            value={'update'}
            onClick={props.handleUpdate}
          />
        ) : null}
      </div>
    </div>
  );
};

const AdminRestaurant = (props) => {
  const [{ user, restaurants }, dispatch] = useStore();
  const [selectedTable, setSelectedTable] = useState('');
  const tables = ['restaurant', 'menu'];

  let restaurant = restaurants?.find(
    (r) => r._id.toString() === props.match.params.restaurantId,
  );
  console.log('RESTAURANTS');
  console.log(restaurants);

  const [data, setData] = useState([
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
    {
      id: '001',
      name: 'McDouble',
      price: '$13.45',
      image_link:
        'https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-McDouble.jpg',
    },
  ]);

  useEffect(() => {
    requests
      .getRestaurantItems(props.match.params.restaurantId)
      .then((res) => {
        console.log(res.data.items);
      })
      .catch((err) => console.log(err));
  });

  const getColumnsFromTable = (table, data) => {
    return data[0] ? Object.keys(data[0]) : [];
  };

  const switchContent = () => {
    switch (selectedTable) {
      case 'menu':
        return (
          <>
            <div>
              <div className={classes.pagetitlecontainer}>
                <div className={classes.pagetitle}>{selectedTable}</div>
                <div className={classes.acctioncontain}>
                  <input
                    className={classes.uploadcsv}
                    type='button'
                    value={'upload xlsx'}
                    onClick={() => alert(true)}
                  />
                  <input
                    className={classes.addentry}
                    type='button'
                    value={'+ add entry'}
                    onClick={() => alert(true)}
                  />
                </div>
              </div>
              {data.length > 0 ? (
                <div className={classes.tableContainerContainer}>
                  <div className={classes.tabblecontainer}>
                    <StickyTable>
                      <Row>
                        <Cell></Cell>
                        {data[0]
                          ? getColumnsFromTable(selectedTable, data)?.map(
                              (x) => (
                                <Cell>
                                  <div style={{ padding: '10px 0px' }}>
                                    <b>{x.toUpperCase()}</b>
                                  </div>
                                </Cell>
                              ),
                            )
                          : null}
                      </Row>
                      {data
                        ? data?.map((row) => (
                            <Row>
                              <Cell>
                                <MoreBtn
                                  handleDelete={() => alert(row)}
                                  handleUpdate={() => alert(row)}
                                  showDelete={true}
                                  showUpdate={true}
                                />
                              </Cell>
                              {Object.keys(row)?.map((key) => (
                                <Cell>{row[key]}</Cell>
                              ))}
                            </Row>
                          ))
                        : null}
                    </StickyTable>
                  </div>
                </div>
              ) : (
                <div className={classes.nodata}>
                  <div>No data</div>
                </div>
              )}
            </div>
          </>
        );
      case 'restaurant':
        return (
          <>
            <div>
              <div className={classes.pagetitlecontainer}>
                <div className={classes.pagetitle}>Restaurant Info</div>
              </div>
              <div>here edit info should be</div>
            </div>
          </>
        );
      default:
        return <div className={classes.emptystate}>Select From Sidebar</div>;
    }
  };

  const logout = () => {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    dispatch(actions.LOGOUT);
  };

  return (
    <>
      <div className={classes.container}>
        {/* <div className={classes.sidebar}>hello</div> */}
        <SideBar
          selected={selectedTable}
          onset={setSelectedTable}
          tables={tables}
          logout={logout}
        />
        <div className={classes.content}>
          <Header2>
            <div className={classes.header1}>
              <div className={classes.header2}>
                <div className={classes.header4}>{user?.username}</div>
                <div className={classes.header5}>{restaurant?.name}</div>
              </div>
              <div className={classes.header3} />
            </div>
          </Header2>
          <div className={classes.body}>{switchContent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminRestaurant;
