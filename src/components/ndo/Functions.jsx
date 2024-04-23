
import ReactSelect from 'react-select';
import cidrRegex from 'cidr-regex';
import _, { get } from 'lodash'

const Functions = (originalIndex, key, value, errors, register, name, Form, required) => {
  if (value.type === 'string') {
    // Check if key is Required
    const isRequired = value.required;
    return (
      <div key={key} className="mb-0">
        <label className="form-label mb-0">{value.title}{isRequired && <span className="required">*</span>}</label>
        <Form.Control
          type="text"
          {...register(`${name}[${originalIndex}].${key}`, {
            required: isRequired ? `${value.title} is required` : false,
            pattern: {
              value: new RegExp(value.pattern),
              message: "Invalid pattern"
            },
            minLength: {
              value: value.minLength,
              message: `Minimum length is ${value.minLength}`
            },
            maxLength: {
              value: value.maxLength,
              message: `Maximum length is ${value.maxLength}`
            }
          })}
          aria-invalid={_.get(errors, `${name}.${originalIndex}.${key}`) ? "true" : "false"} className="input-field "
        />
        {_.get(errors, `${name}.${originalIndex}.${key}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${originalIndex}.${key}.message`)}</p>
        )}
      </div>
    )
  }

  if (value.type === 'int') {
    // Check if key is Required
    const isRequired = value.required;
    return (
      <div key={key} className="mb-0">
        <label className="form-label mb-0">{value.title}{isRequired && <span className="required">*</span>}</label>
        <Form.Control
          type="int"
          {...register(`${name}[${originalIndex}].${key}`, {
            required: isRequired ? `${value.title} is required` : false,
            pattern: {
              value: new RegExp(value.pattern),
              message: "Invalid pattern"
            },
            min: {
              value: value.minimum,
              message: `Minimum value is ${value.minimum}`
            },
            max: {
              value: value.maximum,
              message: `Maximum value is ${value.maximum}`
            }
          })}
          defaultValue={value.default}
          aria-invalid={_.get(errors, `${name}.${originalIndex}.${key}`) ? "true" : "false"} className="input-field "
        />
        {_.get(errors, `${name}.${originalIndex}.${key}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${originalIndex}.${key}.message`)}</p>
        )}
      </div>
    )
  }
  if (value.type === 'ip') {
    // Check if key is Required
    const isRequired = value.required;
    // Define the validation rules for IP addresses (only validate if the field is filled)
    const validateIP = value => {
      // If the field is not filled, return true (pass validation)
      if (!value) return true;

      // If the field is filled, perform IP address validation
      return cidrRegex.v4({ exact: true }).test(value) ||
        cidrRegex.v6({ exact: true }).test(value) ||
        "Invalid IP address";
    };
    return (
      <div key={`${name}-${key}`} className="mb-0">
        <label className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="text"
          {...register(`${name}[${originalIndex}].${key}`, {
            required: isRequired ? `${value.title} is required` : false,
            validate: value.type === 'ip' ? validateIP : undefined,
            pattern: value.pattern ? {
              value: new RegExp(value.pattern),
              message: "Invalid pattern"
            } : undefined,
            minLength: value.minLength ? {
              value: value.minLength,
              message: `Minimum length is ${value.minLength}`
            } : undefined,
            maxLength: value.maxLength ? {
              value: value.maxLength,
              message: `Maximum length is ${value.maxLength}`
            } : undefined
          })}
          aria-invalid={_.get(errors, `${name}.${originalIndex}.${key}`) ? "true" : "false"}
          className="input-field"
        />
        {_.get(errors, `${name}.${originalIndex}.${key}`) && (
          <p role="alert" className='errors'>
            {_.get(errors, `${name}.${originalIndex}.${key}.message`)}
          </p>
        )}
      </div>
    )
  }
  
  
  return null; // Add this line to handle cases where value.type is not string or value.enum is true.
}
export default Functions;