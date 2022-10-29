import { useFormData } from '../utilities/useFormData';
import { useDbUpdate } from '../utilities/firebase';

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

  const ActiveModalEditItem = ({product}) => {
    const [update, result] = useDbUpdate(`/Products/${product.name}`);
    const [state, change] = useFormData(validateInput, product);
    const submit = (evt) => {
      evt.preventDefault();
      if (!state.errors) {
        update(state.values);
      }
    };
  
    return (
        <div>
            <div className = "d-inline-flex flex-column align-items-center">
                <h1>Edit {product.name}:</h1>
            </div>
            <form onSubmit={submit} noValidate className={state.errors ? "was-validated" : null} >
                <InputField name="quantity" text="Quantity" state={state} change={change} />
                <InputField name="volume" text="Volume" state={state} change={change} />
                <InputField  name="category" text="Category" state={state} change={change} />
                <div className = "d-inline-flex flex-column align-items-center">
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}>
                        <InputField name="img_url" text="Image URL" state={state} change={change}/>
                        <img src={product.img_url} style={{marginTop: "4px", height: "100px"}} alt="new"></img>
                    </div>
                </div>
                <ButtonBar message={result?.message} />
            </form>
      </div>
    );
};

export default ActiveModalEditItem;