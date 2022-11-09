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

  const AddItemModal = ({count, uid}) => {
    const [update, result] = useDbUpdate(`/Products/${uid}`);
    const [products, loading, error] = useData(`/Products/${uid}`);
    //const [state, change] = useFormData(validateInput, product);
    const [state, change] = useState({values:{category: "", img_url: "", name: "", quantity: 0, volume: 0}});

    const submitData = (evt) => {
      evt.preventDefault();
      const vol = document.getElementById("volume_new").value;
      const catalog = document.getElementById("category_new").value;
      const img = document.getElementById("img_new").value;
      count = Object.entries(products).length
      console.log(count);
      // const quantity = document.getElementById("quantity").value;
      const jsonObj = {
        [count]: {
          category: catalog,
          img_url: img,
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
                {/* <InputField name="volume" text="Volume (mL)" state={state} change={change}/>
                <InputField name="category" text="Category" state={state} change={change} /> */}
                  Volume (mL):
                  <input id="volume_new" name="volume" text="Volume (mL)"  />
                  <br/>
                  Category:
                  <input id="category_new" name ="category" text="Category" />
                  <br/>
                  Image Url:
                  <input id="img_new" name ="img url" text="image url" />
                  {document.getElementById("img_new")?
                  <img src={document.getElementById("img_new").value} style={{marginTop: "4px", height: "100px"}} alt="new"></img>
                  :""}
                  <br/>
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