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
    batchSize: roast.batchSize || '',
    beansMoisture: roast.beansMoisture || '',
    beansName: roast.beansName || '',
    disabled,
    initialTemp: roast.initialTemp || '',
    processing: roast.status === C.ROAST_PENDING,
    roastInProgress: state.roastInProgress,
    roastNote: roast.roastNote || '',
    uid: state.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {
      e.preventDefault();

      const f = e.target;
      let roastNote = f.roastNote.value;
      let beansName = f.beansName.value;
      let beansMoisture = parseFloat(f.beansMoisture.value);
      let batchSize = parseFloat(f.batchSize.value);
      let initialTemp = parseFloat(f.initialTemp.value);
      let uid = f.uid.value;

      if (beansName !== '' && batchSize !== '' && initialTemp !== '' && uid !== '') {
        dispatch(createNewRoast({
          roastNote,
          beansName,
          batchSize,
          beansMoisture,
          initialTemp,
          uid
        }));

        let roastRef = C.FIREBASE.database().ref(`/roasts/${uid}`);

        roastRef.push({
          created: Date.now(),
          status: C.ROAST_PENDING,
          roastStart: 0,
          initialTemp,
          roastNote,
          beansMoisture,
          beansName,
          batchSize,
          roastPoints: [],
          uid
        }, err => {
          dispatch(createNewRoastFailed(err));
        }).then((newRoast) => {
          dispatch(createNewRoastSuccess(newRoast));

          // Create initial roast point.
          let ref = C.FIREBASE.app().database().ref(`roasts/${uid}/${newRoast.key}/roastPoints`);

          ref.push({
            elapsed: 0,
            temperature: initialTemp
          });

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
