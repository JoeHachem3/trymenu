import React from 'react';
import classes from './SectionTitle.module.css';

const SectionTitle = (props) => {
  return <div className={classes.container}>
    <div className={classes.title}>{props.label}</div>
    {props.onBack ? (
      <div className={classes.back} onClick={props.onBack}>{"< Back"}</div>
    ) : null}
  </div>;
};

export default SectionTitle;
