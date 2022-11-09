import { useFormData } from '../utilities/useFormData';
import { useDbUpdate, useData, useDbDelete } from '../utilities/firebase';

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
        <button type="submit" className="btn btn-dark me-auto" disabled={disabled}>Submit</button>
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

  const ActiveModalEditItem = ({product, uid}) => {
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

    const [deleteupdate, result2] = useDbUpdate(`/Products/${uid}`);
    const deleteid = (evt) => {
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
                        <InputField name="img_url" text="Image URL" state={state} change={change}/>
                        <img src={product.img_url} style={{marginTop: "4px", height: "100px"}} alt="new"></img>
                    </div>
                </div>
                <ButtonBar message={result?.message} />
                <button onClick={deleteid}>Delete</button>
            </form>
      </div>
    );
};

export default ActiveModalEditItem;