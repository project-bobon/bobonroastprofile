import { connect } from 'react-redux';
import NewRoastForm from '../components/NewRoastForm';
import { createNewRoast, updateCurrentRoastValue } from '../actions';

const mapStateToProps = state => {
  const roast = state.currentRoast;
  let disabled = true;

  if (roast.roastDate && roast.roastTitle && roast.beansName && roast.batchSize) {
    disabled = false;
  }

  return {
    roastDate: roast.roastDate || '',
    roastTitle: roast.roastTitle || '',
    beansName: roast.beansName || '',
    beansMoisture: roast.beansMoisture || '',
    batchSize: roast.batchSize || '',
    disabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {
      e.preventDefault();

      const els = e.target.elements;
      let roastDate = els.namedItem('roastDate').value;
      let roastTitle = els.namedItem('roastTitle').value;
      let beansName = els.namedItem('beansName').value;
      let beansMoisture = els.namedItem('beansMoisture').value;
      let batchSize = els.namedItem('batchSize').value;

      if (roastDate !== '' && roastTitle !== '' && beansName !== '' && batchSize !== '') {
        dispatch(createNewRoast({
          roastTitle,
          roastDate,
          beansName,
          batchSize,
          beansMoisture
        }));
      }
    },

    onChange: e => {
      dispatch(updateCurrentRoastValue(e.target.id, e.target.value));
    }
  };
};

const NewRoastFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRoastForm);

export default NewRoastFormContainer;
