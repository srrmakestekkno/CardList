import './App.css';
import React, { useRef, useState } from 'react';
import axios from "axios";

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className='github-profile'>
        <img src={profile.avatar_url} />
        <div className='info'>
          <div className='name'>{profile.name}</div>
          <div className='company'>{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userNane: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://github.com/users/${this.state.userNane}`);
    this.props.onSubmit(resp.data);
    this.setState({ userNane: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userNane}
          onChange={event => this.setState({ userNane: event.target.value })}
          placeholder='Search username'
          required />
          <button>Add Card</button>
      </form>
    );
  }
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
