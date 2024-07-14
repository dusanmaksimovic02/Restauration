import "./TextBox.css";

type TextBoxProps = {
  name: string;
  value: string;
};

const TextBox = (props: TextBoxProps) => {
  return (
    <>
      <div className="text-box">
        <label htmlFor={props.name} className="label">
          {props.name}
        </label>
        <div className="sadrzaj">{props.value}</div>
      </div>
    </>
  );
};

type EditTextBoxProps = {
  name: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

const EditTextBox = (props: EditTextBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value); 
  };

  return (
    <>
      <div className="edit-text-box">
        <label htmlFor={props.name} className="label">
          {props.name}
        </label>
        <input
          className="input"
          id={props.name}
          type={props.type}
          value={props.value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export { TextBox, EditTextBox };
