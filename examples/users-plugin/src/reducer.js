import mockedUsers from './mock.js';

// Initial state bootstrapped from local mock data.
// In Muse architecture, domain slices can start with mock or server data.
const initialState = {
  users: mockedUsers,
};

// Local id generator. In Muse this is only a demo placeholder;
// real systems usually delegate identity to a backend or UUID.
let idSeed = mockedUsers.length + 1;

// Muse-style reducer: a pure function that reacts to domain actions.
// Reducers are the "domain layer" in Muse: they own authoritative state, independent from UI components or plugins.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'new-user': {
      // Muse convention: creating new domain entities is done via explicit action.
      // Reducer ensures immutability and returns a new state reference.
      return {
        ...state,
        users: [
          ...state.users,
          {
            ...action.payload,
            id: idSeed++, // Assign local id; plugins/UI don't decide this.
          },
        ],
      };
    }
    case 'update-user':
      // Muse convention: updates also flow through reducer, ensuring a single, centralized source of truth.
      const newUsers = [...state.users];
      const userIndex = newUsers.findIndex(u => u.id === action.payload.id);
      newUsers[userIndex] = {
        ...newUsers[userIndex],
        ...action.payload,
      };
      return {
        ...state,
        users: newUsers,
      };
    default:
      break;
  }
  // For unknown actions, always return current state (Muse: non-destructive).
  return state;
};
export default reducer;
