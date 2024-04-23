import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpExternalConnectivityPolicyRoutingProfiles from './FpExternalConnectivityPolicyRoutingProfiles'
import FpExternalConnectivityPolicyExpectedState from './FpExternalConnectivityPolicyExpectedState'
const  FpExternalConnectivityPolicy = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
   
  const [key, setKey] = useState('fpexternalconnectivitypolicy'); // Keep state for the Tab selection
    
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
  }; 
  const hasFpExternalConnectivityPolicyErrors = Boolean(errors && errors[name] && errors[name].external_connectivity_policy)//;
  const hasFpExternalConnectivityPolicyRoutingProfilesErrors = Boolean(errors && errors[name] && errors[name].routing_profiles);
  const hasFpExternalConnectivityPolicyExpectedStateErrors = Boolean(errors && errors[name] && errors[name].expected_state);
  
  const isFpExternalConnectivityPolicyActive = key === 'fpexternalconnectivitypolicy';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        <Tab eventKey="fpexternalconnectivitypolicy" title={tabTitle('External Connectivity Policy', hasFpExternalConnectivityPolicyErrors)}>
          {isFpExternalConnectivityPolicyActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'fabric_policies.fp_external_connectivity_policy', {})).map(([objectKey, value]) => (
                    <ObjectFunctions
                      key={objectKey}
                      objectKey={objectKey}
                      value={value}
                      errors={errors}
                      register={register}
                      control={control}
                      name={name}
                      Form={Form}
                      setError={setError}
                      clearErrors={clearErrors}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </Tab>
        <Tab eventKey="fpexternalconnectivitypolicyroutingprofiles" title={tabTitle('Routing Profiles', hasFpExternalConnectivityPolicyRoutingProfilesErrors)}> 
          <FpExternalConnectivityPolicyRoutingProfiles
              control={control}
              name={`${name}.routing_profiles`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpexternalconnectivitypolicyexpectedstate" title={tabTitle('Expected State', hasFpExternalConnectivityPolicyExpectedStateErrors)}> 
          <FpExternalConnectivityPolicyExpectedState
              control={control}
              name={`${name}.expected_state`}
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

export default FpExternalConnectivityPolicy;

