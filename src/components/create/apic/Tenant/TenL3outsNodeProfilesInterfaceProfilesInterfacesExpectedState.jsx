import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateOspfNeighbors from './TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateOspfNeighbors'
import TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateBfdNeighbors from './TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateBfdNeighbors'


const  TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedState = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
  const [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstateospfneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstatebfdneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstateospfneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstatebfdneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstateospfneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstatebfdneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstateospfneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstatebfdneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstateospfneighbors'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstatebfdneighbors'); // Keep state for the Tab selection  
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
  };const hasTenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateOspfNeighborsErrors = Boolean(errors && errors[name] && errors[name].ospf_neighbors);
  const hasTenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateBfdNeighborsErrors = Boolean(errors && errors[name] && errors[name].bfd_neighbors);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstateospfneighbors" title={tabTitle('Ospf Neighbors', hasTenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateOspfNeighborsErrors)}> 
          <TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateOspfNeighbors
              control={control}
              name={`${name}.ospf_neighbors`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenl3outsnodeprofilesinterfaceprofilesinterfacesexpectedstatebfdneighbors" title={tabTitle('Bfd Neighbors', hasTenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateBfdNeighborsErrors)}> 
          <TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedStateBfdNeighbors
              control={control}
              name={`${name}.bfd_neighbors`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab>
      </Tabs>
    </div>
  )
}

export default TenL3outsNodeProfilesInterfaceProfilesInterfacesExpectedState;

