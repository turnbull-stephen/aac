import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

const  FpManagementAccessPolicyHttps = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
   
  const [key, setKey] = useState('fpmanagementaccesspolicyhttps'); // Keep state for the Tab selection
    
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
  const hasFpManagementAccessPolicyHttpsErrors = Boolean(errors && errors[name] && errors[name].https)//;
  
  const isFpManagementAccessPolicyHttpsActive = key === 'fpmanagementaccesspolicyhttps';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        <Tab eventKey="fpmanagementaccesspolicyhttps" title={tabTitle('Https', hasFpManagementAccessPolicyHttpsErrors)}>
          {isFpManagementAccessPolicyHttpsActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'fabric_policies.fp_management_access_policy_https', {})).map(([objectKey, value]) => (
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
        
      </Tabs>
    </div>
  )
}

export default FpManagementAccessPolicyHttps;

