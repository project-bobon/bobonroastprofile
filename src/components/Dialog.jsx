import React, { PropTypes } from 'react';

import Button from './utils/Button';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardAction from './utils/CardAction';

class Dialog extends React.Component {
  static propTypes() {
    return {
      clearDialog: PropTypes.func.isRequired,
      dialogType: PropTypes.string,
      noAction: PropTypes.func,
      noText: PropTypes.string,
      text: PropTypes.string.isRequired,
      yesAction: PropTypes.func,
      yesText: PropTypes.string
    }
  }

  render() {
    let content = null;
    if (this.props.text) {
      content = (
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
    }

    return content;
  }
}

export default Dialog;
