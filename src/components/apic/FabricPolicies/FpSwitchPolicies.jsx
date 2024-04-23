import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpSwitchPoliciesPsuPolicies from './FpSwitchPoliciesPsuPolicies'
import FpSwitchPoliciesNodeControlPolicies from './FpSwitchPoliciesNodeControlPolicies'
const  FpSwitchPolicies = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('fpswitchpoliciespsupolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciesnodecontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciespsupolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciesnodecontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciespsupolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciesnodecontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciespsupolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciesnodecontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciespsupolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpswitchpoliciesnodecontrolpolicies'); // Keep state for the Tab selection  
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
  };const hasFpSwitchPoliciesPsuPoliciesErrors = Boolean(errors && errors[name] && errors[name].psu_policies);
  const hasFpSwitchPoliciesNodeControlPoliciesErrors = Boolean(errors && errors[name] && errors[name].node_control_policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="fpswitchpoliciespsupolicies" title={tabTitle('Psu Policies', hasFpSwitchPoliciesPsuPoliciesErrors)}> 
          <FpSwitchPoliciesPsuPolicies
              control={control}
              name={`${name}.psu_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpswitchpoliciesnodecontrolpolicies" title={tabTitle('Node Control Policies', hasFpSwitchPoliciesNodeControlPoliciesErrors)}> 
          <FpSwitchPoliciesNodeControlPolicies
              control={control}
              name={`${name}.node_control_policies`}
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

export default FpSwitchPolicies;

