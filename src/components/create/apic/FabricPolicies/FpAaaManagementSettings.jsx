import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpPasswordStrengthProfile from './FpPasswordStrengthProfile'
const  FpAaaManagementSettings = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
   
  const [key, setKey] = useState('fpaaamanagementsettings'); // Keep state for the Tab selection
    
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
  const hasFpAaaManagementSettingsErrors = Boolean(errors && errors[name] && errors[name].management_settings)//;
  const hasFpPasswordStrengthProfileErrors = Boolean(errors && errors[name] && errors[name].password_strength_profile);
  
  const isFpAaaManagementSettingsActive = key === 'fpaaamanagementsettings';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        <Tab eventKey="fpaaamanagementsettings" title={tabTitle('Management Settings', hasFpAaaManagementSettingsErrors)}>
          {isFpAaaManagementSettingsActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'fabric_policies.fp_aaa_management_settings', {})).map(([objectKey, value]) => (
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
        <Tab eventKey="fppasswordstrengthprofile" title={tabTitle('Password Strength Profile', hasFpPasswordStrengthProfileErrors)}> 
          <FpPasswordStrengthProfile
              control={control}
              name={`${name}.password_strength_profile`}
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

export default FpAaaManagementSettings;

