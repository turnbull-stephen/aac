import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_ndo_schema.json'

import TEepgContractsConsumers from './TEepgContractsConsumers'
import TEepgContractsProviders from './TEepgContractsProviders'
const  TEepgContracts = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('teepgcontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('teepgcontractsproviders'); // Keep state for the Tab selection  
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
  };const hasTEepgContractsConsumersErrors = Boolean(errors && errors[name] && errors[name].consumers);
  const hasTEepgContractsProvidersErrors = Boolean(errors && errors[name] && errors[name].providers);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="teepgcontractsconsumers" title={tabTitle('Consumers', hasTEepgContractsConsumersErrors)}> 
          <TEepgContractsConsumers
              control={control}
              name={`${name}.consumers`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="teepgcontractsproviders" title={tabTitle('Providers', hasTEepgContractsProvidersErrors)}> 
          <TEepgContractsProviders
              control={control}
              name={`${name}.providers`}
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

export default TEepgContracts;

