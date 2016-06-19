import React from 'react';

const imgCreate = require('../../images/step_create.png');
const imgInput = require('../../images/step_input.png');
const imgStart = require('../../images/step_timer.png');
const imgStop = require('../../images/step_stop.png');

class Instructions extends React.Component {
  render() {
    return (
      <div className="mdl-grid bobon-instructions bobon-util__full-width">
        <div className="mdl-cell mdl-shadow--2dp mdl-color--teal-500
                        mdl-cell--3-col-desktop mdl-cell--12-col-tablet"
        >
          <div className="mdl-typography--headline mdl-typography--font-thin">
            1. Create roast
          </div>
          <img src={ imgCreate } />
        </div>

        <div className="mdl-cell mdl-shadow--2dp mdl-color--teal-500
                        mdl-cell--3-col-desktop mdl-cell--12-col-tablet"
        >
          <div className="mdl-typography--headline mdl-typography--font-thin">
            2. Drop beans & start timer
          </div>
          <img src={ imgStart } />
        </div>

        <div className="mdl-cell mdl-shadow--2dp mdl-color--teal-500
                        mdl-cell--3-col-desktop mdl-cell--12-col-tablet"
        >
          <div className="mdl-typography--headline mdl-typography--font-thin">
            3. Enter temperatures. Push FIRST CRACK when it happens
          </div>
          <img src={ imgInput } />
        </div>

        <div className="mdl-cell mdl-shadow--2dp mdl-color--teal-500
                        mdl-cell--3-col-desktop mdl-cell--12-col-tablet"
        >
          <div className="mdl-typography--headline mdl-typography--font-thin">
            4. Stop timer & complete the roast
          </div>
          <img src={ imgStop } />
        </div>
      </div>
    );
  }
}

export default Instructions;
