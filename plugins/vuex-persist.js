import VuexPersistence from "vuex-persist";

const clone = obj => JSON.parse(JSON.stringify(obj));

// Return the version of the state that you want to keep
// persisted in localStorage
const reducer = state => {
	let persistedState = clone(state);

	delete persistedState.hidden;
	delete persistedState.gradesIcon;
	delete persistedState.unfolded;
	delete persistedState.unfoldIcon;

	return persistedState;
};

export default ({ store }) => {
	new VuexPersistence({}).plugin(store);
};
