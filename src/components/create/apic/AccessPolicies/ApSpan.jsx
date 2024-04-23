import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import ApSpanDestinationGroups from './ApSpanDestinationGroups'
import ApSpanSourceGroups from './ApSpanSourceGroups'
import ApSpanFilterGroups from './ApSpanFilterGroups'
const  ApSpan = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('apspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanfiltergroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanfiltergroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanfiltergroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanfiltergroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspansourcegroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanfiltergroups'); // Keep state for the Tab selection  
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
  };const hasApSpanDestinationGroupsErrors = Boolean(errors && errors[name] && errors[name].destination_groups);
  const hasApSpanSourceGroupsErrors = Boolean(errors && errors[name] && errors[name].source_groups);
  const hasApSpanFilterGroupsErrors = Boolean(errors && errors[name] && errors[name].filter_groups);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="apspandestinationgroups" title={tabTitle('Destination Groups', hasApSpanDestinationGroupsErrors)}> 
          <ApSpanDestinationGroups
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
        </Tab><Tab eventKey="apspansourcegroups" title={tabTitle('Source Groups', hasApSpanSourceGroupsErrors)}> 
          <ApSpanSourceGroups
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
        </Tab><Tab eventKey="apspanfiltergroups" title={tabTitle('Filter Groups', hasApSpanFilterGroupsErrors)}> 
          <ApSpanFilterGroups
              control={control}
              name={`${name}.filter_groups`}
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

export default ApSpan;

