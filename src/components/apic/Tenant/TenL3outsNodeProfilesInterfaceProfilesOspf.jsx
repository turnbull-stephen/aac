import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'



const  TenL3outsNodeProfilesInterfaceProfilesOspf = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
   
  const [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesospf'); // Keep state for the Tab selection
    
  const tabTitle = (title, hasErrors, errorCount) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {title}
      {hasErrors &&
        <span style={{ position: 'absolute', top: -10, right: -22, zIndex: 1000 }}>
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
  const hasTenL3outsNodeProfilesInterfaceProfilesOspfErrors = Boolean(errors && errors[name] && errors[name].ospf)//;
  
  const isTenL3outsNodeProfilesInterfaceProfilesOspfActive = key === 'tenl3outsnodeprofilesinterfaceprofilesospf';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenl3outsnodeprofilesinterfaceprofilesospf" title={tabTitle('Ospf', hasTenL3outsNodeProfilesInterfaceProfilesOspfErrors)}>
          {isTenL3outsNodeProfilesInterfaceProfilesOspfActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'tenant.ten_l3outs_node_profiles_interface_profiles_ospf', {})).map(([objectKey, value]) => (
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
                      formData={formData}
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

export default TenL3outsNodeProfilesInterfaceProfilesOspf;

