import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import _, { get } from 'lodash'
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import cidrRegex from 'cidr-regex';
import ipRegex from 'ip-regex';

const ObjectFunctions = ({
  objectKey,
  value,
  errors,
  register,
  control,
  name,
  Form,
  })=> {
  
  const [createdOptions, setCreatedOptions] = useState([]);

  if (value.type === 'string') {
    // Check if key is Required
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    //objectKey = objectKey || "tenant"; 
    console.log(objectKey)
    const inputId = name ? `${name}-${objectKey}` : objectKey
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="text"
          id={inputId} // Ensure the id is set
          {...register(`${name}.${objectKey}`, {
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
          aria-invalid={_.get(errors, `${name}.${objectKey}`) ? "true" : "false"} className="input-field "
        />
        {_.get(errors, `${name}.${objectKey}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${objectKey}.message`)}</p>
        )}
      </div>
    )
  }

  if (value.type === 'int') {
    // Check if key is Required
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = name ? `${name}-${objectKey}` : objectKey
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="int"
          id={inputId} // Ensure the id is set
          {...register(`${name}.${objectKey}`, {
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
          defaultValue={value.default}
          aria-invalid={_.get(errors, `${name}.${objectKey}`) ? "true" : "false"} className="input-field "
        />
        {_.get(errors, `${name}.${objectKey}`) && (
          <p role="alert" className='errors'>{_.get(errors, `${name}.${objectKey}.message`)}</p>
        )}
      </div>
    )
  }
  if (value.type === 'ip') {
    // Check if key is Required
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = name ? `${name}-${objectKey}` : objectKey
    // Define the validation rules for IP addresses (only validate if the field is filled)
    const validateIP = value => {
      // If the field is not filled, return true (pass validation)
      if (!value) return true;

      // Check for a valid IP address with or without CIDR notation
      return ipRegex.v4({ exact: true }).test(value) ||
        ipRegex.v6({ exact: true }).test(value) ||
        cidrRegex.v4({ exact: true }).test(value) ||
        cidrRegex.v6({ exact: true }).test(value) ||
        "Invalid IP address";
    };
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Form.Control
          type="text"
          id={inputId} // Ensure the id is set
          {...register(`${name}.${objectKey}`, {
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
          aria-invalid={_.get(errors, `${name}.${objectKey}`) ? "true" : "false"}
          className="input-field"
        />
        {_.get(errors, `${name}.${objectKey}`) && (
          <p role="alert" className='errors'>
            {_.get(errors, `${name}.${objectKey}.message`)}
          </p>
        )}
      </div>
    )
  }
  if (value.type === 'select') {
    const isRequired = value.required;
    // Generate a unique identifier for this select input
    const inputId = name ? `${name}-${objectKey}` : objectKey
    const options = Array.isArray(value.enum) ? value.enum.map((data) => ({ value: data, label: data })) : [];
    //const defaultValue = { value: value.default, label: value.default };
    const selectStyles = {
      menuList: (base) => ({
        ...base,
        maxHeight: '200px', // Adjust this value to control the maximum height of the dropdown
        overflowY: 'scroll', // This will add a scrollbar if the items exceed the maxHeight

      }),
    };
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Controller
          control={control}
          name={`${name}.${objectKey}`}
          //defaultValue={defaultValue.value}
          render={({ field }) => (
            <ReactSelect
              inputId={inputId} // Ensure the id is set
              {...field}
              options={options}
              isClearable
              isSearchable
              placeholder={`Please select an option...`}
              styles={selectStyles}
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
    const inputId = name ? `${name}-${objectKey}` : objectKey
    const options = [{ value: true, label: 'enabled' }, { value: false, label: 'disabled' }];
    //const defaultValue = { value: value.default, label: value.default };
    return (
      <div key={inputId} className="mb-0">
        <label htmlFor={inputId} className="form-label mb-0">
          {value.title}
          {isRequired && <span className="required">*</span>}
        </label>
        <Controller
          control={control}
          name={`${name}.${objectKey}`}
          //defaultValue={defaultValue.value}
          render={({ field }) => (
            <ReactSelect
              inputId={inputId} // Ensure the id is set
              {...field}
              options={options}
              isClearable
              isSearchable
              value={options.find(option => option.value === field.value)}
              onChange={option => field.onChange(option ? option.value : "")}
            />
          )}
        />
      </div>
    )
  }
  if (value.type === 'list-string') {
    // Generate a unique identifier for this select input
    const inputId = name ? `${name}-${objectKey}` : objectKey
    const options = []
    return (
      <div key={inputId} className="mb-0">
        <label className="form-label mb-0">{value.title}</label>
        <Controller
          control={control}
          name={`${name}.${objectKey}`}
          render={({ field }) => {
            return (
              <CreatableSelect
                inputId={inputId} // Ensure the id is set
                {...field}
                isMulti
                isSearchable
                placeholder="Select or Create an option"
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
  return null; // Add this line to handle cases where value.type is not found.
}

export default ObjectFunctions;