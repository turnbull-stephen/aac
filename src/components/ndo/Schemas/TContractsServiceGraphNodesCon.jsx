import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_ndo_schema.json'

import TContractsServiceGraphNodesConSites from './TContractsServiceGraphNodesConSites'
const  TContractsServiceGraphNodesCon = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
   
  const [key, setKey] = useState('tcontractsservicegraphnodescon'); // Keep state for the Tab selection
    
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
  const hasTContractsServiceGraphNodesConErrors = Boolean(errors && errors[name] && errors[name].consumer)//;
  const hasTContractsServiceGraphNodesConSitesErrors = Boolean(errors && errors[name] && errors[name].sites);
  
  const isTContractsServiceGraphNodesConActive = key === 'tcontractsservicegraphnodescon';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        <Tab eventKey="tcontractsservicegraphnodescon" title={tabTitle('Consumer', hasTContractsServiceGraphNodesConErrors)}>
          {isTContractsServiceGraphNodesConActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'schemas.t_contracts_service_graph_nodes_con', {})).map(([objectKey, value]) => (
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
        <Tab eventKey="tcontractsservicegraphnodesconsites" title={tabTitle('Sites', hasTContractsServiceGraphNodesConSitesErrors)}> 
          <TContractsServiceGraphNodesConSites
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

export default TContractsServiceGraphNodesCon;

