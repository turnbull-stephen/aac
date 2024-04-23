import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenSerDeviceSelectionPoliciesConsumerProviderRedirectPolicy from './TenSerDeviceSelectionPoliciesConsumerProviderRedirectPolicy'
import TenSerDeviceSelectionPoliciesConsumerProviderBridgeDomain from './TenSerDeviceSelectionPoliciesConsumerProviderBridgeDomain'
import TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroup from './TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroup'


const  TenSerDeviceSelectionPoliciesConsumerProvider = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
   
  const [key, setKey] = useState('tenserdeviceselectionpoliciesconsumerprovider'); // Keep state for the Tab selection
    
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
  const hasTenSerDeviceSelectionPoliciesConsumerProviderErrors = Boolean(errors && errors[name] && errors[name].provider)//;
  const hasTenSerDeviceSelectionPoliciesConsumerProviderRedirectPolicyErrors = Boolean(errors && errors[name] && errors[name].redirect_policy);
  const hasTenSerDeviceSelectionPoliciesConsumerProviderBridgeDomainErrors = Boolean(errors && errors[name] && errors[name].bridge_domain);
  const hasTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupErrors = Boolean(errors && errors[name] && errors[name].external_endpoint_group);
  
  const isTenSerDeviceSelectionPoliciesConsumerProviderActive = key === 'tenserdeviceselectionpoliciesconsumerprovider';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenserdeviceselectionpoliciesconsumerprovider" title={tabTitle('Provider', hasTenSerDeviceSelectionPoliciesConsumerProviderErrors)}>
          {isTenSerDeviceSelectionPoliciesConsumerProviderActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'tenant.ten_ser_device_selection_policies_consumer_provider', {})).map(([objectKey, value]) => (
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
        <Tab eventKey="tenserdeviceselectionpoliciesconsumerproviderredirectpolicy" title={tabTitle('Redirect Policy', hasTenSerDeviceSelectionPoliciesConsumerProviderRedirectPolicyErrors)}> 
          <TenSerDeviceSelectionPoliciesConsumerProviderRedirectPolicy
              control={control}
              name={`${name}.redirect_policy`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserdeviceselectionpoliciesconsumerproviderbridgedomain" title={tabTitle('Bridge Domain', hasTenSerDeviceSelectionPoliciesConsumerProviderBridgeDomainErrors)}> 
          <TenSerDeviceSelectionPoliciesConsumerProviderBridgeDomain
              control={control}
              name={`${name}.bridge_domain`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenserdeviceselectionpoliciesconsumerproviderexternalendpointgroup" title={tabTitle('External Endpoint Group', hasTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupErrors)}> 
          <TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroup
              control={control}
              name={`${name}.external_endpoint_group`}
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

export default TenSerDeviceSelectionPoliciesConsumerProvider;

