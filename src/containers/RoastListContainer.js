import { connect } from 'react-redux';
import RoastList from '../components/RoastList';

const mapStateToProps = state => {
  return {
    roasts: state.roasts
  };
};

const RoastListContainer = connect(mapStateToProps)(RoastList);

export default RoastListContainer;
