import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenSerL4l7Devices from './TenSerL4l7Devices'
import TenSerImportedL4l7Devices from './TenSerImportedL4l7Devices'
import TenSerRedirectPolicies from './TenSerRedirectPolicies'
import TenSerServiceEpgPolicies from './TenSerServiceEpgPolicies'
import TenSerRedirectHealthGroups from './TenSerRedirectHealthGroups'
import TenSerRedirectBackupPolicies from './TenSerRedirectBackupPolicies'
import TenSerServiceGraphTemplates from './TenSerServiceGraphTemplates'
import TenSerDeviceSelectionPolicies from './TenSerDeviceSelectionPolicies'


const  TenServices = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
  const [key, setKey] = useState('tenserl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserimportedl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserserviceepgpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirecthealthgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectbackuppolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserservicegraphtemplates'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserdeviceselectionpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserimportedl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserserviceepgpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirecthealthgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectbackuppolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserservicegraphtemplates'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserdeviceselectionpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserimportedl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserserviceepgpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirecthealthgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectbackuppolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserservicegraphtemplates'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserdeviceselectionpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserimportedl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserserviceepgpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirecthealthgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectbackuppolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserservicegraphtemplates'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserdeviceselectionpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserimportedl4l7devices'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserserviceepgpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirecthealthgroups'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserredirectbackuppolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserservicegraphtemplates'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenserdeviceselectionpolicies'); // Keep state for the Tab selection  
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
  };const hasTenSerL4l7DevicesErrors = Boolean(errors && errors[name] && errors[name].l4l7_devices);
  const hasTenSerImportedL4l7DevicesErrors = Boolean(errors && errors[name] && errors[name].imported_l4l7_devices);
  const hasTenSerRedirectPoliciesErrors = Boolean(errors && errors[name] && errors[name].redirect_policies);
  const hasTenSerServiceEpgPoliciesErrors = Boolean(errors && errors[name] && errors[name].service_epg_policies);
  const hasTenSerRedirectHealthGroupsErrors = Boolean(errors && errors[name] && errors[name].redirect_health_groups);
  const hasTenSerRedirectBackupPoliciesErrors = Boolean(errors && errors[name] && errors[name].redirect_backup_policies);
  const hasTenSerServiceGraphTemplatesErrors = Boolean(errors && errors[name] && errors[name].service_graph_templates);
  const hasTenSerDeviceSelectionPoliciesErrors = Boolean(errors && errors[name] && errors[name].device_selection_policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenserl4l7devices" title={tabTitle('L4l7 Devices', hasTenSerL4l7DevicesErrors)}> 
          <TenSerL4l7Devices
              control={control}
              name={`${name}.l4l7_devices`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserimportedl4l7devices" title={tabTitle('Imported L4l7 Devices', hasTenSerImportedL4l7DevicesErrors)}> 
          <TenSerImportedL4l7Devices
              control={control}
              name={`${name}.imported_l4l7_devices`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserredirectpolicies" title={tabTitle('Redirect Policies', hasTenSerRedirectPoliciesErrors)}> 
          <TenSerRedirectPolicies
              control={control}
              name={`${name}.redirect_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserserviceepgpolicies" title={tabTitle('Service Epg Policies', hasTenSerServiceEpgPoliciesErrors)}> 
          <TenSerServiceEpgPolicies
              control={control}
              name={`${name}.service_epg_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserredirecthealthgroups" title={tabTitle('Redirect Health Groups', hasTenSerRedirectHealthGroupsErrors)}> 
          <TenSerRedirectHealthGroups
              control={control}
              name={`${name}.redirect_health_groups`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserredirectbackuppolicies" title={tabTitle('Redirect Backup Policies', hasTenSerRedirectBackupPoliciesErrors)}> 
          <TenSerRedirectBackupPolicies
              control={control}
              name={`${name}.redirect_backup_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserservicegraphtemplates" title={tabTitle('Service Graph Templates', hasTenSerServiceGraphTemplatesErrors)}> 
          <TenSerServiceGraphTemplates
              control={control}
              name={`${name}.service_graph_templates`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserdeviceselectionpolicies" title={tabTitle('Device Selection Policies', hasTenSerDeviceSelectionPoliciesErrors)}> 
          <TenSerDeviceSelectionPolicies
              control={control}
              name={`${name}.device_selection_policies`}
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

export default TenServices;

