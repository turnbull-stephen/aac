import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpAaLdapProviders from './FpAaLdapProviders'
import FpAaLdapGroupMapRules from './FpAaLdapGroupMapRules'
import FpAaLdapGroupMaps from './FpAaLdapGroupMaps'
const  FpAaaLdap = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('fpaaldapproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaprules'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaprules'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaprules'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaprules'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapproviders'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaprules'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpaaldapgroupmaps'); // Keep state for the Tab selection  
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
  };const hasFpAaLdapProvidersErrors = Boolean(errors && errors[name] && errors[name].providers);
  const hasFpAaLdapGroupMapRulesErrors = Boolean(errors && errors[name] && errors[name].group_map_rules);
  const hasFpAaLdapGroupMapsErrors = Boolean(errors && errors[name] && errors[name].group_maps);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="fpaaldapproviders" title={tabTitle('Providers', hasFpAaLdapProvidersErrors)}> 
          <FpAaLdapProviders
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
        </Tab><Tab eventKey="fpaaldapgroupmaprules" title={tabTitle('Group Map Rules', hasFpAaLdapGroupMapRulesErrors)}> 
          <FpAaLdapGroupMapRules
              control={control}
              name={`${name}.group_map_rules`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaldapgroupmaps" title={tabTitle('Group Maps', hasFpAaLdapGroupMapsErrors)}> 
          <FpAaLdapGroupMaps
              control={control}
              name={`${name}.group_maps`}
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

export default FpAaaLdap;

