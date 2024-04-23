import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupRedistribute from './TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupRedistribute'


const  TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroup = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
   
  const [key, setKey] = useState('tenserdeviceselectionpoliciesconsumerproviderexternalendpointgroup'); // Keep state for the Tab selection
    
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
  const hasTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupErrors = Boolean(errors && errors[name] && errors[name].external_endpoint_group)//;
  const hasTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupRedistributeErrors = Boolean(errors && errors[name] && errors[name].redistribute);
  
  const isTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupActive = key === 'tenserdeviceselectionpoliciesconsumerproviderexternalendpointgroup';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenserdeviceselectionpoliciesconsumerproviderexternalendpointgroup" title={tabTitle('External Endpoint Group', hasTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupErrors)}>
          {isTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'tenant.ten_ser_device_selection_policies_consumer_provider_external_endpoint_group', {})).map(([objectKey, value]) => (
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
        <Tab eventKey="tenserdeviceselectionpoliciesconsumerproviderexternalendpointgroupredistribute" title={tabTitle('Redistribute', hasTenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupRedistributeErrors)}> 
          <TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroupRedistribute
              control={control}
              name={`${name}.redistribute`}
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

export default TenSerDeviceSelectionPoliciesConsumerProviderExternalEndpointGroup;

