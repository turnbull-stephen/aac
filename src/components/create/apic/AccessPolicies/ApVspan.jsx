import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import ApVspanSessions from './ApVspanSessions'
import ApVspanDestinationGroups from './ApVspanDestinationGroups'
const  ApVspan = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('apvspansessions'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspansessions'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspansessions'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspansessions'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspandestinationgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspansessions'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvspandestinationgroups'); // Keep state for the Tab selection  
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
  };const hasApVspanSessionsErrors = Boolean(errors && errors[name] && errors[name].sessions);
  const hasApVspanDestinationGroupsErrors = Boolean(errors && errors[name] && errors[name].destination_groups);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="apvspansessions" title={tabTitle('Sessions', hasApVspanSessionsErrors)}> 
          <ApVspanSessions
              control={control}
              name={`${name}.sessions`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apvspandestinationgroups" title={tabTitle('Destination Groups', hasApVspanDestinationGroupsErrors)}> 
          <ApVspanDestinationGroups
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

export default ApVspan;

