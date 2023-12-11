import './App.css';

const CardList = (props) => (
  <div>
    {}
  </div>
);

class Card extends React.Component {

}

class Form extends React.Component {

}

class App extends React.Component {
  state = {
    profiles: []
  };

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));    
  };
  render () {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
