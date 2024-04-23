import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_ndo_schema.json'

import TVrfsContractsConsumers from './TVrfsContractsConsumers'
import TVrfsContractsProviders from './TVrfsContractsProviders'
const  TVrfsContracts = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('tvrfscontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsconsumers'); // Keep state for the Tab selectionconst [key, setKey] = useState('tvrfscontractsproviders'); // Keep state for the Tab selection  
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
  };const hasTVrfsContractsConsumersErrors = Boolean(errors && errors[name] && errors[name].consumers);
  const hasTVrfsContractsProvidersErrors = Boolean(errors && errors[name] && errors[name].providers);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="tvrfscontractsconsumers" title={tabTitle('Consumers', hasTVrfsContractsConsumersErrors)}> 
          <TVrfsContractsConsumers
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
        </Tab><Tab eventKey="tvrfscontractsproviders" title={tabTitle('Providers', hasTVrfsContractsProvidersErrors)}> 
          <TVrfsContractsProviders
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

export default TVrfsContracts;

