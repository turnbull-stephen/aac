import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpMonitoringSnmpTraps from './FpMonitoringSnmpTraps'
import FpMonitoringSyslogs from './FpMonitoringSyslogs'
import FpMonitoringCallhomes from './FpMonitoringCallhomes'
import FpMonitoringSmartCallhomes from './FpMonitoringSmartCallhomes'
import FpMonitoringPolicies from './FpMonitoringPolicies'
const  FpMonitoring = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('fpmonitoringsnmptraps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsyslogs'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsmartcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsnmptraps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsyslogs'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsmartcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsnmptraps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsyslogs'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsmartcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsnmptraps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsyslogs'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsmartcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsnmptraps'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsyslogs'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringsmartcallhomes'); // Keep state for the Tab selectionconst [key, setKey] = useState('fpmonitoringpolicies'); // Keep state for the Tab selection  
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
  };const hasFpMonitoringSnmpTrapsErrors = Boolean(errors && errors[name] && errors[name].snmp_traps);
  const hasFpMonitoringSyslogsErrors = Boolean(errors && errors[name] && errors[name].syslogs);
  const hasFpMonitoringCallhomesErrors = Boolean(errors && errors[name] && errors[name].callhomes);
  const hasFpMonitoringSmartCallhomesErrors = Boolean(errors && errors[name] && errors[name].smart_callhomes);
  const hasFpMonitoringPoliciesErrors = Boolean(errors && errors[name] && errors[name].policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="fpmonitoringsnmptraps" title={tabTitle('Snmp Traps', hasFpMonitoringSnmpTrapsErrors)}> 
          <FpMonitoringSnmpTraps
              control={control}
              name={`${name}.snmp_traps`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpmonitoringsyslogs" title={tabTitle('Syslogs', hasFpMonitoringSyslogsErrors)}> 
          <FpMonitoringSyslogs
              control={control}
              name={`${name}.syslogs`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpmonitoringcallhomes" title={tabTitle('Callhomes', hasFpMonitoringCallhomesErrors)}> 
          <FpMonitoringCallhomes
              control={control}
              name={`${name}.callhomes`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpmonitoringsmartcallhomes" title={tabTitle('Smart Callhomes', hasFpMonitoringSmartCallhomesErrors)}> 
          <FpMonitoringSmartCallhomes
              control={control}
              name={`${name}.smart_callhomes`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpmonitoringpolicies" title={tabTitle('Policies', hasFpMonitoringPoliciesErrors)}> 
          <FpMonitoringPolicies
              control={control}
              name={`${name}.policies`}
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

export default FpMonitoring;

