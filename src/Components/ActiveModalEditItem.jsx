import { useFormData } from '../utilities/useFormData';
import { useDbUpdate} from '../utilities/firebase';

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
  
  const ButtonBar = ({close, message, disabled }) => {
    return (
      <div className="d-flex">
        <button type="submit" className="btn btn-dark me-auto" disabled={disabled} onClick={() => close()}>Submit</button>
        {/* <span className="p-2">{message}</span> */}
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

  const ActiveModalEditItem = ({close, product, uid}) => {
    const [update, result] = useDbUpdate(`/Products/${uid}/${product.name}`);
    const [state, change] = useFormData(validateInput, product);
    //console.log(product)
    const submit = (evt) => {
      evt.preventDefault();
      if (!state.errors) {
        console.log(uid);
        console.log(state.values)
        update(state.values);
      }
    };

    const [deleteupdate, /*result2*/] = useDbUpdate(`/Products/${uid}`);
    const deleteid = (evt) => {
      evt.preventDefault();
      console.log("delete", product.name)
      const jsonObj = {[product.name]:null};
      deleteupdate(jsonObj);
    }
  
    return (
        <div>
            <div className = "d-inline-flex flex-column align-items-center">
                <h1>Edit {product.category}:</h1>
            </div>
            <form onSubmit={submit} noValidate className={state.errors ? "was-validated" : null} >
                {/* <InputField name="quantity" text="Quantity" state={state} change={change}/> */}
                <InputField name="volume" text="Volume (mL)" state={state} change={change}/>
                <InputField name="category" text="Category" state={state} change={change} />
                <div className = "d-inline-flex flex-column align-items-center">
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}>
                      Image:
                        <select class="form-select" name="images" id="images" onChange={(ev) => product.img_url = ev.target.value}>
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
                        {/* <InputField name="img_url" text="Image URL" state={state} change={change}/>
                        <img src={product.img_url} style={{marginTop: "4px", height: "100px"}} alt="new"></img> */}
                    </div>
                </div>
                <div className="d-flex">
                  <ButtonBar message={result?.message} close = {close}/>
                  <button className="btn btn-danger me-auto" onClick={deleteid}>Delete</button>
                </div>
                
            </form>
      </div>
    );
};

export default ActiveModalEditItem;