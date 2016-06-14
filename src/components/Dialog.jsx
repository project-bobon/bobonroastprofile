import React from 'react';

import Button from './utils/Button';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardAction from './utils/CardAction';

class Dialog extends React.Component {
  render() {
    if (this.props.text) {
      return (
        <div className="bobon-dialog-container">
          <div className="bobon-dialog-cell">
            <Card customClass="bobon-dialog bobon-dialog-{ this.props.dialogType }">
              <CardTitle>
                { this.props.text }
              </CardTitle>
              <CardAction>
                <Button
                  onClick={ (e) => {
                      e.preventDefault();
                      console.log(this.props);
                      if (this.props.yesAction) {
                        this.props.yesAction();
                      }
                      this.props.clearDialog();
                    } }
                >
                  { this.props.yesText }
                </Button>

                <Button
                  onClick={ (e) => {
                      e.preventDefault();
                      if (this.props.noAction) {
                        this.props.noAction();
                      }
                      this.props.clearDialog();
                    } }
                >
                  { this.props.noText }
                </Button>
              </CardAction>
            </Card>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Dialog;
