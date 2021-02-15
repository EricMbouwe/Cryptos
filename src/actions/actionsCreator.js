import * as actions from './actionTypes';

export function bugAdded(description) {
  return {
    type: actions.BUG_ADDED,
    payload: {
      description: description,
    },
  };
}

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description: description,
  },
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id: id,
  },
});

export const requestingData = () => {
  return { type: REQUESTING_DATA };
};

export const receivedData = (data) => {
  return { type: RECEIVED_DATA, users: data.users };
};
