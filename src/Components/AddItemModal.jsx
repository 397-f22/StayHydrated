import { useFormData } from '../utilities/useFormData';
import { useDbUpdate, useData } from '../utilities/firebase';
import {useState} from 'react';

const InputField = ({ name, text, state, change }) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {text}
      </label>
      <input
        className="form-control"
        id={name}
        name={name}
        defaultValue={state.values?.[name]}
        onChange={change}
      />
      <div className="invalid-feedback">{state.errors?.[name]}</div>
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

const validateInput = (quantity, volume) => {
    switch (quantity) {
      case 'quantity':
        return "";
      case 'volume':
        return "";
      default: return '';
    }
  };

  const AddItemModal = ({count}) => {
    const [update, result] = useDbUpdate(`/Products/`);
    //const [state, change] = useFormData(validateInput, product);
    // const [state, change] = useState({values:{category: "", img_url: "", name: "", quantity: 0, volume: 0}});

    const submitData = () => {
      const vol = document.getElementById("volume_new").value;
      const catalog = document.getElementById("category_new").value;
      
      // const quantity = document.getElementById("quantity").value;
      const jsonObj = {
        [count]: {
          category: catalog,
          img_url: "",
          name: count,
          quantity: 0,
          volume: vol
        },
      };
  
      update(jsonObj);
    }

    return (
        <div className='text-center'>
            <div className = "d-inline-flex flex-column align-items-center">
            
                <h1>Add new item:</h1>
                <form >  
                  Volume (mL):
                  <input id="volume_new" name="volume" text="Volume (mL)"  />
                  Category:
                  <input id="category_new" name ="category" text="Category" />
                  <button  
                    type="submit"
                    value="Submit"
                    onClick={submitData}>Submit</button>
                </form>
            </div>
      </div>
    );
};

export default AddItemModal;