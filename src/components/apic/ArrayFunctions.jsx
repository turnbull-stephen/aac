import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import _, { get } from 'lodash'
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import cidrRegex from 'cidr-regex';
import ipRegex from 'ip-regex';

const ArrayFunctions = ({
  originalIndex,
  objectKey,
  value,
  errors,
  register,
  control,
  formData,
  name,
  setError,
  clearErrors,
  Form,
}) => {

  const [createdOptions, setCreatedOptions] = useState([]);

  if (value.type === 'string') {
    // Check if key is Required
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    return (
      <div key={`${name}.${originalIndex}.${objectKey}`} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="text"
          id={inputId} // Ensure the id is set
          {...register(`${name}[${originalIndex}].${objectKey}`, {
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
          aria-invalid={_.get(errors, `${name}.${originalIndex}.${objectKey}`) ? "true" : "false"} className="input-field "
        />
        {_.get(errors, `${name}.${originalIndex}.${objectKey}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${originalIndex}.${objectKey}.message`)}</p>
        )}
      </div>
    )
  }
  if (value.type === 'int') {
    // Check if key is Required
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    return (
      <div key={`${name}.${originalIndex}.${objectKey}`} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="int"
          id={inputId} // Ensure the id is set
          {...register(`${name}[${originalIndex}].${objectKey}`, {
            required: isRequired ? `${value.title} is required` : false,
            pattern: {
              value: /^-?\d+$/,
              message: "Invalid Number Value"
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
          //defaultValue={value.default}
          aria-invalid={_.get(errors, `${name}.${originalIndex}.${objectKey}`) ? "true" : "false"} className="input-field "
        />
        {_.get(errors, `${name}.${originalIndex}.${objectKey}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${originalIndex}.${objectKey}.message`)}</p>
        )}
      </div>
    )
  }

  if (value.type === 'ip' || value.type === 'cidr' || value.type === 'ip_cidr') {
    // Check if key is Required
    const isRequired = value.required;
    // Define the validation rules for IP addresses (only validate if the field is filled)
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    const validateIP = value => {
      // If the field is not filled, return true (pass validation)
      if (!value) return true;

      // Check for a valid IP address with or without CIDR notation
      return ipRegex.v4({ exact: true }).test(value) ||
        ipRegex.v6({ exact: true }).test(value) ||
        "Invalid IP address";
    };
    const validateCIDR = value => {
      // If the field is not filled, return true (pass validation)
      if (!value) return true;

      // Check for a valid IP address with or without CIDR notation
      return cidrRegex.v4({ exact: true }).test(value) ||
        cidrRegex.v6({ exact: true }).test(value) ||
        "Invalid IP address";
    };
    const validateIPCIDR = value => {
      // If the field is not filled, return true (pass validation)
      if (!value) return true;

      // Check for a valid IP address with or without CIDR notation
      return ipRegex.v4({ exact: true }).test(value) ||
        ipRegex.v6({ exact: true }).test(value) ||
        cidrRegex.v4({ exact: true }).test(value) ||
        cidrRegex.v6({ exact: true }).test(value) ||
        "Invalid IP address";
    };

    const validators = {
      ip: validateIP,
      cidr: validateCIDR,
      ip_cidr: validateIPCIDR
    };
    return (
      <div key={`${name}.${originalIndex}.${objectKey}`} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="text"
          id={inputId} // Ensure the id is set
          {...register(`${name}[${originalIndex}].${objectKey}`, {
            required: isRequired ? `${value.title} is required` : false,
            validate: validators[value.type],
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
          aria-invalid={_.get(errors, `${name}.${originalIndex}.${objectKey}`) ? "true" : "false"}
          className="input-field"
        />
        {_.get(errors, `${name}.${originalIndex}.${objectKey}`) && (
          <p role="alert" className='errors'>
            {_.get(errors, `${name}.${originalIndex}.${objectKey}.message`)}
          </p>
        )}
      </div>
    )
  }

  if (value.type === 'select') {
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    const options = Array.isArray(value.enum) ? value.enum.map((data) => ({ value: data, label: data })) : [];
    //const defaultValue = { value: value.default, label: value.default };
    const customStyles = {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }
    return (
      <div key={`${name}.${originalIndex}.${objectKey}`} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Controller
          control={control}
          name={`${name}.${originalIndex}.${objectKey}`}
          //defaultValue={defaultValue.value}
          render={({ field }) => (
            <ReactSelect
              inputId={inputId} // Ensure the id is set
              {...field}
              options={options}
              isClearable
              isSearchable
              placeholder={`Please select an option...`}
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              styles={customStyles}
              value={options.find(option => option.value === field.value)}
              onChange={option => field.onChange(option ? option.value : "")}
            />
          )}
        />
      </div>
    )
  }

  if (value.type === 'select-bool' || value.type === 'bool') {
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    const options = [{ value: true, label: 'enabled' }, { value: false, label: 'disabled' }];
    //const defaultValue = { value: value.default, label: value.default };
    const customStyles = {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Controller
          control={control}
          name={`${name}.${originalIndex}.${objectKey}`}
          //defaultValue={defaultValue.value}
          render={({ field }) => (
            <ReactSelect
              inputId={inputId} // Ensure the id is set
              {...field}
              options={options}
              isClearable
              isSearchable
              placeholder={`Select...`}
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              styles={customStyles}
              value={options.find(option => option.value === field.value)}
              onChange={option => field.onChange(option ? option.value : "")}
            />
          )}
        />
      </div>
    )
  }

  if (value.type === 'select-ref') {
    const isRequired = value.required;
    const customStyles = {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }
    // Get options from reference within the form
    let options = [];
    const refParts = value.ref.split('.');

    if (refParts.length === 2) {
      // Handle the case where ref has two parts.
      const refOptions = Array.isArray(formData[refParts[0]])
        ? formData[refParts[0]].map((data) => ({ value: data[refParts[1]], label: data[refParts[1]] }))
        : [];
      options = refOptions;
    }
    // Handle the case where ref has three parts.
    if (refParts.length === 3) {
      if (formData[refParts[0]] && Array.isArray(formData[refParts[0]][refParts[1]])) {
        const refOptions = formData[refParts[0]][refParts[1]].map((data) => {
          return { value: data[refParts[2]], label: data[refParts[2]] };
        });
        options = refOptions;
      }
    }

    return (
      <div key={objectKey} className="mb-0">
        <label className="form-label mb-0">{value.title}{isRequired && <span className="required">*</span>}</label>
        <Controller
          control={control}
          name={`${name}[${originalIndex}].${objectKey}`}
          defaultValue={value.default}
          rules={{
            required: isRequired ? `${value.title} is required` : false
          }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              options={options}
              isClearable
              isSearchable
              placeholder="Please select an option"
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              styles={customStyles}
              onChange={option => field.onChange(option ? option.value : '')}
              value={options.find(option => option.value === field.value) || ''} // If the option is not found, set value to empty ''
            />
          )}
        />
        {_.get(errors, `${name}.${originalIndex}.${objectKey}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${originalIndex}.${objectKey}.message`)}</p>
        )}
      </div>
    )
  }

  if (value.type === 'multiselect-ref') {
    const isRequired = value.required;
    // Get options from reference within the form
    let options = [];
    const refParts = value.ref.split('.');

    if (refParts.length === 2) {
      // Handle the case where ref has two parts.
      const refOptions = Array.isArray(formData[refParts[0]])
        ? formData[refParts[0]].map((data) => ({ value: data[refParts[1]], label: data[refParts[1]] }))
        : [];
      options = refOptions;
    }
    // Handle the case where ref has three parts.
    if (refParts.length === 3) {
      if (formData[refParts[0]] && Array.isArray(formData[refParts[0]][refParts[1]])) {
        const refOptions = formData[refParts[0]][refParts[1]].map((data) => {
          return { value: data[refParts[2]], label: data[refParts[2]] };
        });
        options = refOptions;
      }
    }
    const customStyles = {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }
    return (
      <div key={objectKey} className="mb-0">
        <label className="form-label mb-0">{value.title}{isRequired && <span className="required">*</span>}</label>
        <Controller
          control={control}
          name={`${name}[${originalIndex}].${objectKey}`}
          defaultValue={value.default}
          rules={{
            required: isRequired ? `${value.title} is required` : false
          }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              isMulti
              isSearchable
              placeholder="Please select an option"
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              styles={customStyles}
              options={options}
              value={field.value ? field.value.map(val => options.find(option => option.value === val) || "") : []}
              onChange={option => field.onChange(option ? option.map(opt => opt.value) || "" : [])}
            />
          )}
        />
        {_.get(errors, `${name}.${originalIndex}.${objectKey}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${originalIndex}.${objectKey}.message`)}</p>
        )}
      </div>
    )
  }

  if (value.type === 'list-string') {
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    const options = []

    const customStyles = {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Controller
          control={control}
          name={`${name}.${originalIndex}.${objectKey}`}
          render={({ field }) => {
            return (
              <CreatableSelect
                inputId={inputId} // Ensure the id is set
                {...field}
                isMulti
                isSearchable
                placeholder="Select or Create an option"
                menuPortalTarget={document.body}
                menuPosition={'fixed'}
                styles={customStyles}
                value={field.value ? field.value.map(val => options.find(option => option.value === val) || { value: val, label: val }) : []}
                onChange={option => {
                  field.onChange(option ? option.map(opt => opt.value) || "" : []);

                  // New options created
                  const newOptions = option ? option.filter(opt => !options.includes(opt)) : [];
                  setCreatedOptions(prev => [...prev, ...newOptions]);

                  // Options removed
                  if (option && field.value && option.length < field.value.length) {
                    const removedOption = field.value.find(val => !option.map(opt => opt.value).includes(val));
                    setCreatedOptions(prev => prev.filter(opt => opt.value !== removedOption));
                  }
                }}
              />
            )
          }}
        />
      </div>
    )
  }
  if (value.type === 'oneOf') { // check for oneOf
    // Check if key is Required
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = `${name}-${originalIndex}-${objectKey}`;
    const customStyles = {
      ///.....
      menuPortal: provided => ({ ...provided, zIndex: 9999 }),
      menu: provided => ({ ...provided, zIndex: 9999 })
      ///.....
    }
    return (
      <div key={inputId} className="mb-0 dropdown-container" >
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Controller
          control={control}
          name={`${name}[${originalIndex}].${objectKey}`}
          //defaultValue={value.default}
          rules={{
            required: isRequired ? `${value.title} is required` : false,
            validate: {
              validNumberInRange: inputValue => {
                if (!isRequired) {
                  return true;
                }
                if (value.oneOf[1].enum.includes(inputValue)) {
                  return true;
                }
                if (!isNaN(inputValue) && (inputValue >= value.oneOf[0].minimum && inputValue <= value.oneOf[0].maximum)) {
                  return true;
                }
                return 'Invalid entry. Please enter a number between: ' + value.oneOf[0].minimum + ' and ' + value.oneOf[0].maximum + '.';
              },
            },
          }}
          render={({ field }) => (
            <CreatableSelect
              inputId={inputId} // Ensure the id is set
              {...field}
              options={value.oneOf[1].enum.map((item) => ({ label: item, value: item }))}
              isClearable
              isSearchable
              placeholder={`Please select an option or enter a number`}
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              styles={customStyles}
              onChange={option => {
                if (option) {
                  if (value.oneOf[1].enum.includes(option.value)) {
                    clearErrors(`${name}[${originalIndex}].${objectKey}`);
                    field.onChange(option.value);
                  } else {
                    const numValue = Number(option.value);
                    if (!isNaN(numValue) && (numValue >= value.oneOf[0].minimum && numValue <= value.oneOf[0].maximum)) {
                      clearErrors(`${name}[${originalIndex}].${objectKey}`);
                      field.onChange(numValue);
                    } else {
                      setError(`${name}[${originalIndex}].${objectKey}`, { type: "manual", message: 'Invalid entry. Please enter a number between: ' + value.oneOf[0].minimum + ' and ' + value.oneOf[0].maximum + '.' });
                    }
                  }
                } else {
                  clearErrors(`${name}[${originalIndex}].${objectKey}`);
                  field.onChange('');
                  if (isRequired) {
                    setError(`${name}[${originalIndex}].${objectKey}`, { type: "manual", message: `${value.title} is required` });
                  }
                }
              }}
              onCreateOption={(inputValue) => {
                const numValue = Number(inputValue);
                if (!isNaN(numValue) && (numValue >= value.oneOf[0].minimum && numValue <= value.oneOf[0].maximum)) {
                  clearErrors(`${name}[${originalIndex}].${objectKey}`);
                  field.onChange(numValue);
                } else if (isRequired && inputValue === '') {
                  setError(`${name}[${originalIndex}].${objectKey}`, { type: "manual", message: `${value.title} is required` });
                } else {
                  setError(`${name}[${originalIndex}].${objectKey}`, { type: "manual", message: 'Invalid entry. Please enter a number between: ' + value.oneOf[0].minimum + ' and ' + value.oneOf[0].maximum + '.' });
                }
              }}
              value={field.value ? (typeof field.value === 'number' ? { label: field.value.toString(), value: field.value } : { label: field.value, value: field.value }) : ''}
            />
          )}
        />
        <p className="errors">{_.get(errors, `${name}[${originalIndex}].${objectKey}`)?.message}</p>
      </div>
    )
  }
  return null; // Add this line to handle cases where value.type is not found.
}

export default ArrayFunctions;