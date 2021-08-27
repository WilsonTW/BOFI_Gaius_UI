//content.js
import React, { useContext, useState, useEffect } from "react";
import { CatStateContext } from "./context";
import {
    Avatar,
    Box,
    Card,
    Typography,
    makeStyles,
    TextField
  } from '@material-ui/core';

export default (props) => {
  const [state, dispatch, state1, dispatch1] = useContext(CatStateContext);
  const [stateLocal, setStateLocal] = useState({
    aValue: 123,
    bValue: 312
  });
  const delContact = (id) => {
    dispatch({
      type: "DEL_CONTACT",
      payload: id
    });
  };

  const addContact = (event) => {
    dispatch({
      type: "ADD_CONTACT",
      payload: {
        id: event.target.childNodes[0].childNodes[1].value,
        name: event.target.childNodes[1].childNodes[1].value,
        feature: event.target.childNodes[2].childNodes[1].value
      }
    });
    event.preventDefault();
  };

  const table = state.character.map((value) => {
    return (
      <div key={value.id} style={{ border: "1px solid green" }}>
        <p>編號 {value.id}</p>
        <h3>名字 {value.name}!</h3>
        <h3>特徵 {value.feature}</h3>
        <button onClick={() => delContact(value.id)}>刪除</button>
      </div>
    );
  });
  useEffect(() => {
    stateLocal.aValue= state1.valueTest;
    stateLocal.bValue= state1.mqttPayload;
    setStateLocal({ ...stateLocal });
  });
  
  return (
    <div>
      {/* <form onSubmit={(e) => addContact(e)}>
        <p>
          id:
          <input required type="text" />
        </p>
        <p>
          name
          <input required type="text" />
        </p>
        <p>
          feature
          <input required type="text" />
        </p>
        <button>新增</button>
      </form> */}
      {table}
      <TextField 
        label={stateLocal.aValue} 
        variant="outlined"
        size="normal"
      />
       <TextField 
        label={stateLocal.bValue} 
        variant="outlined"
        size="normal"
      />
    </div>
  );
};