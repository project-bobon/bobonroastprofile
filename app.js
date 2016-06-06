var App = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      roasts: [],
      currentRoastKey: '',
      newRoastTitle: '',
      timer: undefined,
      elapsed: 0,
      timerStart: 0,
      diff: 0,
      timerOn: false,
      canvas: ReactDOM.createElement('canvas')
    };
  },

  componentWillMount: function() {
    var ref = firebase.database().ref('roasts');
    this.bindAsArray(ref, 'roasts');
  },

  _showRoast: function(key) {
    this.stopWatchStop();
    this.setState({
      currentRoastKey: key,
      elapsed: 0
    });
  },

  _deleteRoast: function(key) {
    var newRoasts = this.state.roasts.filter(function(roast) {
      return roast['.key'] !== key;
    });
    var ref = firebase.database().ref('roasts');

    ref.child(key).remove();
  },

  roastList: function() {
    return this.state.roasts.map(function(r) {
      return (
        <li key={ r['.key'] }>
          { r.title }
          | <a onClick={ this._showRoast.bind(this, r['.key']) }>Show</a>
          | <a onClick={ this._deleteRoast.bind(this, r['.key']) }>Delete</a>
        </li>
      );
    }.bind(this));
  },

  addPoint: function(e) {
    e.preventDefault();
    var currentRoast = this.firebaseRefs.roasts.child(this.state.currentRoastKey);

    currentRoast.child('points').push({
      time: this.state.elapsed / 1000 << 0,
      temperature: e.target.temperature.value
    });
    e.target.temperature.value = '';
  },

  _roastDetails: function(roast) {
    var tempList = '';
    if ('points' in roast) {
      tempList = Object.keys(roast.points).map(function(k) {
        var p = roast.points[k];
        return (
          <li key={ roast['.key'] + '--' + k }>
            { p.time + ': ' + p.temperature }
          </li>
        );
      });
    }
    return(
      <div>
        <h1>{ roast.title }</h1>
        <div>
          { this.stopWatch() }
        </div>
        <div>
          Temperature list:
          <form onSubmit={ this.addPoint }>
            <input name="temperature"></input>
            <input type="submit" value="Add temperature" />
          </form>
          <ul>
            { tempList }
          </ul>
        </div>
      </div>
    );
  },

  _getRoastDetails: function(roastKey) {
    var roast = this.state.roasts.find(function(r) {
      return r['.key'] === roastKey;
    });

    if (typeof(roast) !== 'undefined') {
      return this._roastDetails(roast);
    }

    return '';
  },

  _addRoast: function(e) {
    var title = e.target.title.value;
    var newRoasts = this.state.roasts;

    e.preventDefault();

    if (title !== '') {
      this.firebaseRefs.roasts.push({
        title: title
      });

      this.setState({
        newRoastTitle: ''
      });
    }
  },

  _onRoastTitleChange: function(e) {
    this.setState({
      newRoastTitle: e.target.value
    });
  },

  stopWatchTick: function() {
    var elapsed = Date.now() - this.state.timerStart;
    this.setState({
      elapsed: elapsed
    });
  },

  stopWatchStart: function(e) {
    e.preventDefault();

    var timerStart = Date.now();
    var timer = setInterval(this.stopWatchTick, 10);

    this.setState({
      timerOn: true,
      timerStart: Date.now(),
      timer: timer
    });

  },

  stopWatchStop: function(e) {
    if (typeof(e) !== 'undefined') {
      e.preventDefault();
    }
    clearInterval(this.state.timer);
    this.setState({
      timerOn: false
    });
  },

  stopWatch: function() {
    var fsec = (this.state.elapsed / 10) % 100 << 0;
    var min = (this.state.elapsed / 1000 / 60) << 0;
    var sec = (this.state.elapsed / 1000) % 60 << 0;

    return(
      <div>
        <h3>{ min + ' : ' + sec + ' : ' + fsec }</h3>
        <a onClick={ this.stopWatchStart }> Start </a>
        <a onClick={ this.stopWatchStop }> Stop </a>
      </div>
    );
  },

  render: function() {
    return(
      <div>
        <h1>HT Roast v0.1.0</h1>
        <div className='columns small-12 medium-6'>
          <ul>
            { this.roastList() }
          </ul>
          <form onSubmit={ this._addRoast }>
            <input type="text" name="title" value={ this.state.newRoastTitle } onChange={ this._onRoastTitleChange }></input>
            <input type='submit' value='add new'></input>
          </form>
        </div>
        <div className='columns small-12 medium-6'>
          { this._getRoastDetails(this.state.currentRoastKey) }
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('main')
);
