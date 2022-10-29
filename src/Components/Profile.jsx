import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';
import {signInWithGoogle, signOut, useUserState, useData } from '../utilities/firebase';
import {SignInButton, SignOutButton} from "../Navigation"
import { useState } from 'react';

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      <input
        className="form-control"
        id={name}
        name={name}
        defaultValue={state?.values?.[name]}
        onChange={change}
      />
      <div className="invalid-feedback">{state?.errors?.[name]}</div>
    </div>
  );
  
  const ButtonBar = ({ message, disabled }) => {
    return (
      <div className="d-flex">
        <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
        <span className="p-2">{message}</span>
      </div>
    );
  };


export const Profile = () => {

    const [user] = useUserState();

    return (
        <div>
            <div className = "d-inline-flex flex-column align-items-center">
                <h1>Profile</h1>
                <div className = "d-inline-flex flex-column align-items-center">
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}>
                        <p className="ms-auto" id="welcome">Hello {user?.displayName}.</p> 
                        { user ? <SignOutButton /> : <SignInButton /> }
                    </div>
                </div>
                <InputField name="dailyGoal" text="Daily Goal in ml"/>
            </div>
      </div>
    );
};