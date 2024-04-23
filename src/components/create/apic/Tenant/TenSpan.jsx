import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenSpanDestinationGroups from './TenSpanDestinationGroups'
import TenSpanSourceGroups from './TenSpanSourceGroups'


const  TenSpan = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
  const [key, setKey] = useState('tenspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspansourcegroups'); // Keep state for the Tab selection  
  const tabTitle = (title, hasErrors, errorCount) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {title}
      {hasErrors &&
        <span style={{ position: 'absolute', top: -10, right: -22, zIndex: 1000 }}>
          <Badge >
            <ErrorIcon color="error" />
          </Badge>
        </span>
      }
    </div>
  );

  const [activeKeys, setActiveKeys] = useState({});
  const handleTabChange = (itemId, activeKey) => {
    setActiveKeys(prevKeys => ({ ...prevKeys, [itemId]: activeKey }));
  };const hasTenSpanDestinationGroupsErrors = Boolean(errors && errors[name] && errors[name].destination_groups);
  const hasTenSpanSourceGroupsErrors = Boolean(errors && errors[name] && errors[name].source_groups);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenspandestinationgroups" title={tabTitle('Destination Groups', hasTenSpanDestinationGroupsErrors)}> 
          <TenSpanDestinationGroups
              control={control}
              name={`${name}.destination_groups`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenspansourcegroups" title={tabTitle('Source Groups', hasTenSpanSourceGroupsErrors)}> 
          <TenSpanSourceGroups
              control={control}
              name={`${name}.source_groups`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab>
      </Tabs>
    </div>
  )
}

export default TenSpan;

