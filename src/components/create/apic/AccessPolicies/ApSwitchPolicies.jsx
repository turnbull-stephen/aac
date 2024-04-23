import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import ApMstPolicy from './ApMstPolicy'
import ApVpcPolicy from './ApVpcPolicy'
import ApForwardingScalePolicy from './ApForwardingScalePolicy'
const  ApSwitchPolicies = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('apmstpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvpcpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apforwardingscalepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmstpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvpcpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apforwardingscalepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmstpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvpcpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apforwardingscalepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmstpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvpcpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apforwardingscalepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmstpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apvpcpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apforwardingscalepolicy'); // Keep state for the Tab selection  
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
  };const hasApMstPolicyErrors = Boolean(errors && errors[name] && errors[name].mst_policies);
  const hasApVpcPolicyErrors = Boolean(errors && errors[name] && errors[name].vpc_policies);
  const hasApForwardingScalePolicyErrors = Boolean(errors && errors[name] && errors[name].forwarding_scale_policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="apmstpolicy" title={tabTitle('Mst Policies', hasApMstPolicyErrors)}> 
          <ApMstPolicy
              control={control}
              name={`${name}.mst_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apvpcpolicy" title={tabTitle('Vpc Policies', hasApVpcPolicyErrors)}> 
          <ApVpcPolicy
              control={control}
              name={`${name}.vpc_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apforwardingscalepolicy" title={tabTitle('Forwarding Scale Policies', hasApForwardingScalePolicyErrors)}> 
          <ApForwardingScalePolicy
              control={control}
              name={`${name}.forwarding_scale_policies`}
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

export default ApSwitchPolicies;

