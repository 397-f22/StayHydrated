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
            
            <h1>Edit Item:</h1>
            <form
                onSubmit={submit}
                noValidate
                className={state.errors ? "was-validated" : null}
            >
                <InputField
                name="quantity"
                text="Quantity"
                state={state}
                change={change}
                />
                <InputField
                name="volume"
                text="Volume"
                state={state}
                change={change}
                />
                <ButtonBar message={result?.message} />
            </form>
      </div>
    );
};

export default ActiveModalEditItem;