import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpSpanSourceGroups from './FpSpanSourceGroups'
import FpSpanDestinationGroups from './FpSpanDestinationGroups'
const  FpSpan = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('fpspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpspandestinationgroups'); // Keep state for the Tab selection  
  const tabTitle = (title, hasErrors, errorCount) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {title}
      {hasErrors &&
        <span style={{ position: 'absolute', top: -10, right: -22, zIndex: 9999 }}>
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
  };const hasFpSpanSourceGroupsErrors = Boolean(errors && errors[name] && errors[name].source_groups);
  const hasFpSpanDestinationGroupsErrors = Boolean(errors && errors[name] && errors[name].destination_groups);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="fpspansourcegroups" title={tabTitle('Source Groups', hasFpSpanSourceGroupsErrors)}> 
          <FpSpanSourceGroups
              control={control}
              name={`${name}.source_groups`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpspandestinationgroups" title={tabTitle('Destination Groups', hasFpSpanDestinationGroupsErrors)}> 
          <FpSpanDestinationGroups
              control={control}
              name={`${name}.destination_groups`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab>
      </Tabs>
    </div>
  )
}

export default FpSpan;

