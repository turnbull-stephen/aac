import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpDateTimePolicy from './FpDateTimePolicy'
import FpSnmpPolicy from './FpSnmpPolicy'
import FpManagementAccessPolicy from './FpManagementAccessPolicy'
const  FpPodPolicies = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('fpdatetimepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpsnmppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmanagementaccesspolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpdatetimepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpsnmppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmanagementaccesspolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpdatetimepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpsnmppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmanagementaccesspolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpdatetimepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpsnmppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmanagementaccesspolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpdatetimepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpsnmppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmanagementaccesspolicy'); // Keep state for the Tab selection  
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
  };const hasFpDateTimePolicyErrors = Boolean(errors && errors[name] && errors[name].date_time_policies);
  const hasFpSnmpPolicyErrors = Boolean(errors && errors[name] && errors[name].snmp_policies);
  const hasFpManagementAccessPolicyErrors = Boolean(errors && errors[name] && errors[name].management_access_policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="fpdatetimepolicy" title={tabTitle('Date Time Policies', hasFpDateTimePolicyErrors)}> 
          <FpDateTimePolicy
              control={control}
              name={`${name}.date_time_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpsnmppolicy" title={tabTitle('Snmp Policies', hasFpSnmpPolicyErrors)}> 
          <FpSnmpPolicy
              control={control}
              name={`${name}.snmp_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpmanagementaccesspolicy" title={tabTitle('Management Access Policies', hasFpManagementAccessPolicyErrors)}> 
          <FpManagementAccessPolicy
              control={control}
              name={`${name}.management_access_policies`}
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

export default FpPodPolicies;

