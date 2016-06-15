import React from 'react';
import C from '../constants';

import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardAction from './utils/CardAction';
import CardContent from './utils/CardContent';

class PostRoastNoteForm extends React.Component {

  componentDidUpdate(props) {
    componentHandler.upgradeDom();
  }

  noteInput() {
    let content = null;
    let autoFocus = false;

    if (this.props.editing) {
      autoFocus = true;
    }
    content = (
      <textarea
        className="mdl-textfield__input"
        type="text"
        id="postRoastNote"
        name="postRoastNote"
        rows="5"
        defaultValue={ this.props.postRoastNote }
        autoFocus={ autoFocus }
      >
      </textarea>
    );

    return content;
  }

  actionButton() {
    let content = null;

    if (this.props.editing === C.FIELD_STATUS_NOT_EDITING) {
      let btnText = 'Edit';

      if (this.props.postRoastNote === '' || !this.props.postRoastNote) {
        btnText = 'Add Comment';
      }

      content = (
        <CardAction>
          <button
            className="mdl-button mdl-button--colored mdl-js-button
                       mdl-js-ripple-effect"
            onClick={ () => {
                this.props.toggleEditing(
                  this.props.roastId,
                  C.FIELD_POST_ROAST_NOTE
                );
              } }
          >
            { btnText }
          </button>
        </CardAction>
      );
    }

    return content;
  }

  noteForm() {
    if ((this.props.postRoastNote === '' || this.props.postRoastNote === null) &&
        this.props.editing !== C.FIELD_STATUS_EDITING
    ) {
      return null;
    }

    let content = (
      <CardContent>
        <plaintext>
          { this.props.postRoastNote }
        </plaintext>
      </CardContent>
    );

    if (this.props.editing === C.FIELD_STATUS_EDITING) {
      content = (
        <CardAction>
          <form onSubmit={ this.props.onSubmit }>

            <input
              type="hidden"
              defaultValue={ this.props.roastId }
              name="roastId"
              id="roastId"
            />

            <div className="bobon-textfield-wrapper bobon-util__full-width">
              <div className="mdl-textfield mdl-js-textfield">
                { this.noteInput() }
              </div>
            </div>

            <input
              className="mdl-button mdl-js-button mdl-js-ripple-effect"
              type="submit"
              value="Save Comment"
            />

            <button className="mdl-button mdl-js-button mdl-js-ripple-effect"
              onClick={ (e) => {
                  e.preventDefault();
                  this.props.toggleEditing(
                    this.props.roastId,
                    C.FIELD_POST_ROAST_NOTE
                  );
                } }
            >
              Cancel
            </button>

          </form>
        </CardAction>
      );
    } 

    return content;
  }

  render() {
    let content = null;

    if (this.props.status === C.ROAST_COMPLETED) {
      content = (
        <Card customClass="mdl-cell mdl-cell--12-col">
          <CardTitle>
            Post-roasting notes
          </CardTitle>

          { this.noteForm() }

          { this.actionButton() }
        </Card>
      );
    }

    return content;
  }
}

export default PostRoastNoteForm;
