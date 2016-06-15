import React from 'react';

const imgCreate = require('../../images/step_create.png');
const imgStart = require('../../images/step_timer.png');
const imgInput = require('../../images/step_input.png');
const imgStop = require('../../images/step_stop.png');

class Instructions extends React.Component {
  render() {
    return(
      <div className="mdl-grid bobon-instructions">
        <div className="mdl-cel mdl-cell--3-col">
          <div className="mdl-typography--headline mdl-typography--font-thin">
            1. Create roast
            <img src={ imgCreate } />
          </div>
        </div>

        <div className="mdl-cel mdl-cell--3-col">
          <div className="mdl-typography--headline mdl-typography--font-thin">
            2. Drop beans & start timer
          </div>
        </div>

        <div className="mdl-cel mdl-cell--3-col">
          <div className="mdl-typography--headline mdl-typography--font-thin">
            3. Enter temperatures & push 1st crack button
          </div>
        </div>

        <div className="mdl-cel mdl-cell--3-col">
          <div className="mdl-typography--headline mdl-typography--font-thin">
            4. Stop timer 
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;
