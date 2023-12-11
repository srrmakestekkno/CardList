import './App.css';
import React, { useRef, useState } from 'react';
import axios from "axios";

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

const Card = (props) => {
  const profile = props;
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} />
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
}

const Form = (props) => {
	const [userName, setState] = useState("");
	const handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setState("");
  };
	
  	return (
    	<form onSubmit={handleSubmit}>
    	  <input 
          type="text" 
          value={userName}
          onChange={event => setState(event.target.value)}
          placeholder="GitHub username" 
          required 
        />
        <button>Add card</button>
    	</form>
    );
  
}

const App = (props) => {
  const [profiles, setProfiles] = useState([]);

  const addNewProfile = (profileData) => {
    setProfiles((prevProfiles) => [...prevProfiles, profileData]);
  };

  return (
    <div>
      <div className="header">{props.title}</div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles={profiles} />
    </div>
  );
};

export default App;
