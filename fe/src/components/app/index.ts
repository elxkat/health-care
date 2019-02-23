import {connect} from "react-redux";
import {App, AppDispatchProps, AppStateProps} from "./app";
import {RootState} from "../../redux";
import {Dispatch} from "redux";
import {setHealthCareField} from "../../redux/actions";
import {fieldNames} from "../../redux/healthCareReducer";
import {search} from "../../redux/thunks";

export * from './app';

function mapStateToProps(state: RootState): AppStateProps {
  return {
    ...state.healthCare,
  };
}

function mapDispatchToProps(dispatch: any): AppDispatchProps {
  return {
    setHealthCareField: (fieldName, value) => dispatch(setHealthCareField(fieldName, value)),
    search: () => dispatch(search()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
