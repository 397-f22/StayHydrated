import { useFormData } from '../utilities/useFormData';
import { useDbUpdate, useData, setData } from '../utilities/firebase';
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

  const AddItemModal = ({close, count, uid}) => {
    const [update, result] = useDbUpdate(`/Products/${uid}`);
    const [products, loading, error] = useData(`/Products/${uid}`);
    //const [state, change] = useFormData(validateInput, product);
    const [state, change] = useState({values:{category: "", img_url: "", name: "", quantity: 0, volume: 0}});

    const submitData = (evt) => {
      close();
      evt.preventDefault();
      const vol = document.getElementById("volume_new").value;
      const catalog = document.getElementById("category_new").value;
      const img = document.getElementById("images").value;
      const id = Object.values(products).filter(x => x["category"]).pop().name;
      const count = Object.entries(products).length;
      console.log("id", id+1);

      // const quantity = document.getElementById("quantity").value;
      const jsonObj = {
        [id+1]: {
          category: catalog,
          img_url: url,
          name: id+1,
          quantity: 0,
          volume: vol
        },
      };
  
      update(jsonObj);
    }

    const [url, setUrl] = useState("https://cdn-icons-png.flaticon.com/512/4507/4507444.png");

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
                  Image:
                  <select class="form-select" name="images" id="images" onChange={(ev) => setUrl(ev.target.value)}>
                    <option value="https://cdn-icons-png.flaticon.com/512/4507/4507444.png">Water</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/2722/2722527.png">Soda</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/869/869460.png">Milk</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/920/920541.png">Alcohol</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/2442/2442019.png">Juice</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/2309/2309403.png">Lemonade</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/1047/1047503.png">Coffee</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/3504/3504747.png">Tea</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/1881/1881426.png">Energy Drinks</option>
                    <option value="https://cdn-icons-png.flaticon.com/512/454/454570.png">Soup</option>
                  </select>
                  {document.getElementById("images")?
                  <img src={url} style={{marginTop: "4px", height: "100px"}} alt="new"></img>
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