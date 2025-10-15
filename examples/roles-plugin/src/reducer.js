import mockedRoles from './mock.js';

// Muse: Initial state is domain data (roles).
// In Muse, reducers own the authoritative state for a feature.
// UI components never mutate this state directly.
const initialState = {
  roles: mockedRoles,
};

// Muse: Local id generator. In a real system this would likely come from a backend or UUID, but here it's kept simple for demo purposes.
let idSeed = mockedRoles.length + 1;

// Muse: Reducer = domain layer function.
// It reacts to dispatched actions and returns a new immutable state.
// Reducers are the single source of truth for domain state in Muse.
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'new-role': {
      // Muse: handle creation of a new domain entity (role).
      // Reducer appends a new role to the state, ensuring immutability.
      return {
        ...state,
        roles: [
          ...state.roles,
          {
            ...action.payload,
            id: idSeed++, // assign id at the domain layer, not in UI
          },
        ],
      };
    }
    case 'update-role': {
      // Muse: handle update of an existing entity.
      // The reducer finds the role by id, merges new fields, and returns a new state.
      const newRoles = [...state.roles];
      const roleIndex = newRoles.findIndex(u => u.id === action.payload.id);
      newRoles[roleIndex] = {
        ...newRoles[roleIndex],
        ...action.payload,
      };

      return {
        ...state,
        roles: newRoles,
      };
    }
    default:
      break;
  }
  // Muse: always return current state for unknown actions.
  return state;
};

export default reducer;

// Muse: By exporting this reducer and registering it via ext/index.js, the roles feature becomes part of the global domain state.
// UI components (e.g. RoleList, RoleInfoModal) dispatch 'new-role' or 'update-role', and this reducer deterministically updates state — keeping UI logic simple and the domain layer authoritative.
