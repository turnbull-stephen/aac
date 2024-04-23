import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpGeolocationSites from './FpGeolocationSites'
const  FpGeolocation = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('fpgeolocationsites'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpgeolocationsites'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpgeolocationsites'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpgeolocationsites'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpgeolocationsites'); // Keep state for the Tab selection  
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
  };const hasFpGeolocationSitesErrors = Boolean(errors && errors[name] && errors[name].sites);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="fpgeolocationsites" title={tabTitle('Sites', hasFpGeolocationSitesErrors)}> 
          <FpGeolocationSites
              control={control}
              name={`${name}.sites`}
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

export default FpGeolocation;

