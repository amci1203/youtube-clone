import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*
    PARAMETERS

    reducers (string):
        a space delimited string of the reducers to suscribe to
    actions ([Object]: Function):
        an object of actions to bind to the store
    component React.Component:
        the component to connect to the store
*/

export default (component, reducers = null, actions = null) => connect(
    state => reducers
    ?
        reducers.split(' ').reduce((obj, reducer) => (
            Object.assign(obj, { [reducer]: state[reducer] })
        ), {}) 
    : {},
    dispatch => actions
    ? bindActionCreators(actions, dispatch)
    : {}
)(component)