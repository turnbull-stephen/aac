import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import ApCdpPolicy from './ApCdpPolicy'
import ApLldpPolicy from './ApLldpPolicy'
import ApLinkLevelPolicy from './ApLinkLevelPolicy'
import ApPortChannelPolicy from './ApPortChannelPolicy'
import ApPortChannelMemberPolicy from './ApPortChannelMemberPolicy'
import ApSpanningTreePolicy from './ApSpanningTreePolicy'
import ApMcpPolicy from './ApMcpPolicy'
import ApL2Policy from './ApL2Policy'
import ApStormControlPolicy from './ApStormControlPolicy'
const  ApInterfacePolicies = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
  const [key, setKey] = useState('apcdppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplldppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplinklevelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelmemberpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanningtreepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmcppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apl2policy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apstormcontrolpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apcdppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplldppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplinklevelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelmemberpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanningtreepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmcppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apl2policy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apstormcontrolpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apcdppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplldppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplinklevelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelmemberpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanningtreepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmcppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apl2policy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apstormcontrolpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apcdppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplldppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplinklevelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelmemberpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanningtreepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmcppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apl2policy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apstormcontrolpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apcdppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplldppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('aplinklevelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apportchannelmemberpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apspanningtreepolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apmcppolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apl2policy'); // Keep state for the Tab selectionconst [key, setKey] = useState('apstormcontrolpolicy'); // Keep state for the Tab selection  
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
  };const hasApCdpPolicyErrors = Boolean(errors && errors[name] && errors[name].cdp_policies);
  const hasApLldpPolicyErrors = Boolean(errors && errors[name] && errors[name].lldp_policies);
  const hasApLinkLevelPolicyErrors = Boolean(errors && errors[name] && errors[name].link_level_policies);
  const hasApPortChannelPolicyErrors = Boolean(errors && errors[name] && errors[name].port_channel_policies);
  const hasApPortChannelMemberPolicyErrors = Boolean(errors && errors[name] && errors[name].port_channel_member_policies);
  const hasApSpanningTreePolicyErrors = Boolean(errors && errors[name] && errors[name].spanning_tree_policies);
  const hasApMcpPolicyErrors = Boolean(errors && errors[name] && errors[name].mcp_policies);
  const hasApL2PolicyErrors = Boolean(errors && errors[name] && errors[name].l2_policies);
  const hasApStormControlPolicyErrors = Boolean(errors && errors[name] && errors[name].storm_control_policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        
        
        
        
        <Tab eventKey="apcdppolicy" title={tabTitle('Cdp Policies', hasApCdpPolicyErrors)}> 
          <ApCdpPolicy
              control={control}
              name={`${name}.cdp_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="aplldppolicy" title={tabTitle('Lldp Policies', hasApLldpPolicyErrors)}> 
          <ApLldpPolicy
              control={control}
              name={`${name}.lldp_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="aplinklevelpolicy" title={tabTitle('Link Level Policies', hasApLinkLevelPolicyErrors)}> 
          <ApLinkLevelPolicy
              control={control}
              name={`${name}.link_level_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apportchannelpolicy" title={tabTitle('Port Channel Policies', hasApPortChannelPolicyErrors)}> 
          <ApPortChannelPolicy
              control={control}
              name={`${name}.port_channel_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apportchannelmemberpolicy" title={tabTitle('Port Channel Member Policies', hasApPortChannelMemberPolicyErrors)}> 
          <ApPortChannelMemberPolicy
              control={control}
              name={`${name}.port_channel_member_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apspanningtreepolicy" title={tabTitle('Spanning Tree Policies', hasApSpanningTreePolicyErrors)}> 
          <ApSpanningTreePolicy
              control={control}
              name={`${name}.spanning_tree_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apmcppolicy" title={tabTitle('Mcp Policies', hasApMcpPolicyErrors)}> 
          <ApMcpPolicy
              control={control}
              name={`${name}.mcp_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apl2policy" title={tabTitle('L2 Policies', hasApL2PolicyErrors)}> 
          <ApL2Policy
              control={control}
              name={`${name}.l2_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="apstormcontrolpolicy" title={tabTitle('Storm Control Policies', hasApStormControlPolicyErrors)}> 
          <ApStormControlPolicy
              control={control}
              name={`${name}.storm_control_policies`}
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

export default ApInterfacePolicies;

