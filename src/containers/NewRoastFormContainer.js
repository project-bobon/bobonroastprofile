import { connect } from 'react-redux';

import C from '../constants';
import NewRoastForm from '../components/NewRoastForm';
import history from '../history';
import {
  createNewRoast,
  createNewRoastFailed,
  updateCurrentRoastValue,
  createNewRoastSuccess
} from '../actions';
import {
  metricTemp,
  metricWeight
} from '../helpers';

const mapStateToProps = state => {
  const roast = state.newRoast;
  let disabled = true;
  let tempUnit = '°C';
  let weightUnit = 'kg';

  if (state.settings.unitSystem === C.IMPERIAL) {
    tempUnit = '°F';
    weightUnit = 'lbs';
  }

  if (roast.initialTemp && roast.beansName && roast.batchSize) {
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
    uid: state.auth.uid,
    tempUnit,
    weightUnit,
    unitSystem: state.settings.unitSystem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {
      e.preventDefault();

      const f = e.target;
      const unitSystem = f.unitSystem.value;
      const roastNote = f.roastNote.value;
      const uid = f.uid.value;
      const beansName = f.beansName.value;
      const beansMoisture = parseFloat(f.beansMoisture.value);
      const batchSize = metricWeight(
        parseFloat(f.batchSize.value),
        unitSystem
      );
      const initialTemp = metricTemp(
        parseFloat(f.initialTemp.value),
        unitSystem
      );

      // Always convert to metric in database.
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
