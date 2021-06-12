import React from 'react';
import classes from './SectionTitle.module.css';
import { DebounceInput } from 'react-debounce-input';

const SectionTitle = (props) => {
  return <div className={classes.container}>
    <div className={classes.title}>{props.label}</div>
    {props.showSearch ? <DebounceInput
      minLength={3}
      debounceTimeout={300}
      // onChange={this.props.onChange} 
      placeholder="Search Restaurants"
      type="search" 
      disabled={false}/> : null}
    {props.onBack ? (
      <div className={classes.back} onClick={props.onBack}>{"< Back"}</div>
    ) : null}
  </div>;
};

export default SectionTitle;
