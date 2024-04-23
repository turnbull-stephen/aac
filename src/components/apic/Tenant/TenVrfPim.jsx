import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenVrfPimRps from './TenVrfPimRps'
import TenVrfPimIgmpContextSsmTranslatePolicies from './TenVrfPimIgmpContextSsmTranslatePolicies'
import TenVrfInterVrfPolicies from './TenVrfInterVrfPolicies'


const  TenVrfPim = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
   
  const [key, setKey] = useState('tenvrfpim'); // Keep state for the Tab selection
    
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
  const hasTenVrfPimErrors = Boolean(errors && errors[name] && errors[name].pim)//;
  const hasTenVrfPimRpsErrors = Boolean(errors && errors[name] && errors[name].static_rps);
  const hasTenVrfPimIgmpContextSsmTranslatePoliciesErrors = Boolean(errors && errors[name] && errors[name].igmp_context_ssm_translate_policies);
  const hasTenVrfInterVrfPoliciesErrors = Boolean(errors && errors[name] && errors[name].inter_vrf_policies);
  
  const isTenVrfPimActive = key === 'tenvrfpim';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenvrfpim" title={tabTitle('Pim', hasTenVrfPimErrors)}>
          {isTenVrfPimActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'tenant.ten_vrf_pim', {})).map(([objectKey, value]) => (
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
        <Tab eventKey="tenvrfpimrps" title={tabTitle('Static Rps', hasTenVrfPimRpsErrors)}> 
          <TenVrfPimRps
              control={control}
              name={`${name}.static_rps`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenvrfpimrps" title={tabTitle('Fabric Rps', hasTenVrfPimRpsErrors)}> 
          <TenVrfPimRps
              control={control}
              name={`${name}.fabric_rps`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenvrfpimigmpcontextssmtranslatepolicies" title={tabTitle('Igmp Context Ssm Translate Policies', hasTenVrfPimIgmpContextSsmTranslatePoliciesErrors)}> 
          <TenVrfPimIgmpContextSsmTranslatePolicies
              control={control}
              name={`${name}.igmp_context_ssm_translate_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenvrfintervrfpolicies" title={tabTitle('Inter Vrf Policies', hasTenVrfInterVrfPoliciesErrors)}> 
          <TenVrfInterVrfPolicies
              control={control}
              name={`${name}.inter_vrf_policies`}
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

export default TenVrfPim;

