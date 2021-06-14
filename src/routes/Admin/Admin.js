import React, { useState } from 'react';
import * as requests from '../../utils/requests';
import Header2 from '../../components/navigation/Header2/Header2';
import SideBar from './SideBar';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import { useStore } from '../../store/store';
import { actions } from '../../store/configureStore';
import { apiEndPoint } from '../../utils/common';
import classes from './Admin.module.css';

const Admin = (props) => {
  const [{ user, restaurants, cuisines }, dispatch] = useStore();
  const [selectedTable, setSelectedTable] = useState('restaurants');
  const tables = ['restaurants', 'account'];

  const logout = () => {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    dispatch(actions.LOGOUT);
  };

  const getColumnsFromTable = (table, data) => {
    return ['name', 'phone', 'email'];
  };

  //   const MoreBtn = (props) => {
  //     return (
  //       <div className={classes.btncontainer}>
  //         <input
  //           className={classes.actionbtn}
  //           type='button'
  //           value={'•••'}
  //           onClick={() => {}}
  //         />
  //         <div className={classes.submenu}>
  //           {props.showDelete ? (
  //             <input
  //               className={classes.delete}
  //               type='button'
  //               value={'delete'}
  //               onClick={props.handleDelete}
  //             />
  //           ) : null}
  //           {props.showUpdate ? (
  //             <input
  //               className={classes.update}
  //               type='button'
  //               value={'update'}
  //               onClick={props.handleUpdate}
  //             />
  //           ) : null}
  //         </div>
  //       </div>
  //     );
  //   };

  const switchContent = () => {
    switch (selectedTable) {
      case 'restaurants':
        return (
          <>
            <div>
              <div className={classes.pagetitlecontainer}>
                <div className={classes.pagetitle}>{selectedTable}</div>
                {/* <div className={classes.acctioncontain}>
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
                </div> */}
              </div>
              {restaurants ? (
                <div className={classes.tableContainerContainer}>
                  <div className={classes.tabblecontainer}>
                    <StickyTable>
                      <Row>
                        {/* <Cell></Cell> */}
                        <Cell></Cell>
                        {restaurants[0]
                          ? getColumnsFromTable(
                              selectedTable,
                              restaurants,
                            )?.map((x) => (
                              <Cell>
                                <div style={{ padding: '10px 0px' }}>
                                  <b>{x.toUpperCase()}</b>
                                </div>
                              </Cell>
                            ))
                          : null}
                        <Cell>
                          <div style={{ padding: '10px 0px' }}>
                            <b>CUISINE</b>
                          </div>
                        </Cell>
                      </Row>
                      {restaurants
                        ? restaurants?.map((row) => (
                            <Row
                              onClick={() =>
                                props.history.push('admin/' + row._id)
                              }
                            >
                              {/* <Cell>
                                <MoreBtn
                                  handleDelete={() => alert(row)}
                                  handleUpdate={() => alert(row)}
                                  showDelete={true}
                                  showUpdate={true}
                                />
                              </Cell> */}
                              <Cell>
                                <div className={classes.logoContainer}>
                                  <img
                                    src={`${apiEndPoint}/${row.logo}`}
                                    alt=''
                                  />
                                </div>
                              </Cell>
                              {getColumnsFromTable(
                                selectedTable,
                                restaurants,
                              )?.map((key) => (
                                <Cell>{row[key]}</Cell>
                              ))}
                              <Cell>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '2px',
                                    maxWidth: '300px',
                                  }}
                                >
                                  {row.cuisines?.map((cuisine) => (
                                    <span>cuisine</span>
                                  ))}
                                </div>
                              </Cell>
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

export default Admin;
