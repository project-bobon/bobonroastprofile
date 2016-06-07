import { connect } from 'react-redux';
import NewRoastForm from '../components/NewRoastForm';
import { createNewRoast, createNewRoastFailed, updateCurrentRoastValue, createNewRoastSuccess } from '../actions';
import C from '../constants';
import history from '../history';

const mapStateToProps = state => {
  const roast = state.newRoast;
  let disabled = true;

  if (roast.roastNote && roast.beansName && roast.batchSize) {
    disabled = false;
  }

  return {
    roastNote: roast.roastNote || '',
    beansName: roast.beansName || '',
    beansMoisture: roast.beansMoisture || '',
    batchSize: roast.batchSize || '',
    uid: state.auth.uid,
    disabled,
    processing: roast.status === C.ROAST_PENDING
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {
      e.preventDefault();

      const els = e.target.elements;
      let roastNote = els.namedItem('roastNote').value;
      let beansName = els.namedItem('beansName').value;
      let beansMoisture = parseFloat(els.namedItem('beansMoisture').value);
      let batchSize = parseFloat(els.namedItem('batchSize').value);
      let uid = els.namedItem('uid').value;

      if (beansName !== '' && batchSize !== '') {
        dispatch(createNewRoast({
          roastNote,
          beansName,
          batchSize,
          beansMoisture,
          uid
        }));

        let roastRef = C.FIREBASE.database().ref(`/roasts/${uid}`);

        roastRef.push({
          created: Date.now(),
          status: C.ROAST_PENDING,
          roastStart: 0,
          roastNote,
          beansMoisture,
          beansName,
          batchSize,
          uid
        }, err => {
          dispatch(createNewRoastFailed(err));
        }).then((newRoast) => {
          dispatch(createNewRoastSuccess(newRoast));
          history.push(`roasts/${newRoast.key}`)
        });
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
