import './App.css';
import React, { useRef, useState } from 'react';
import axios from "axios";

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

const Card = (props) => {
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

const Form = (props) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setUserName({ userName: "" });
  };

  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={event => setUserName(event.target.value)}
          placeholder='Search username'
          required />
          <button>Add Card</button>
      </form>
    );
  
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
