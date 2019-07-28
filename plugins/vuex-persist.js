import VuexPersistence from "vuex-persist";

const clone = obj => JSON.parse(JSON.stringify(obj));

// Return the version of the state that you want to keep
// persisted in localStorage
const reducer = state => {
	let persistedState = clone(state);

	delete persistedState.gradesHidden;

	return persistedState;
};

export default ({ store }) => {
	new VuexPersistence({ reducer }).plugin(store);
};
