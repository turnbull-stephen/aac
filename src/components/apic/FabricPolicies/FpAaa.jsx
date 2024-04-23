import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import FpAaaManagementSettings from './FpAaaManagementSettings'
import FpAaaTacacsProviders from './FpAaaTacacsProviders'
import FpAaaRadiusProviders from './FpAaaRadiusProviders'
import FpAaaUsers from './FpAaaUsers'
import FpAaaLoginDomains from './FpAaaLoginDomains'
import FpCaCertificate from './FpCaCertificate'
import FpKeyRing from './FpKeyRing'
import FpAaaLdap from './FpAaaLdap'
import FpAaaSecurityDomains from './FpAaaSecurityDomains'
const  FpAaa = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {
   
  const [key, setKey] = useState('fpaaa'); // Keep state for the Tab selection
    
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
  const hasFpAaaErrors = Boolean(errors && errors[name] && errors[name].aaa)//;
  const hasFpAaaManagementSettingsErrors = Boolean(errors && errors[name] && errors[name].management_settings);
  const hasFpAaaTacacsProvidersErrors = Boolean(errors && errors[name] && errors[name].tacacs_providers);
  const hasFpAaaRadiusProvidersErrors = Boolean(errors && errors[name] && errors[name].radius_providers);
  const hasFpAaaUsersErrors = Boolean(errors && errors[name] && errors[name].users);
  const hasFpAaaLoginDomainsErrors = Boolean(errors && errors[name] && errors[name].login_domains);
  const hasFpCaCertificateErrors = Boolean(errors && errors[name] && errors[name].ca_certificates);
  const hasFpKeyRingErrors = Boolean(errors && errors[name] && errors[name].key_rings);
  const hasFpAaaLdapErrors = Boolean(errors && errors[name] && errors[name].ldap);
  const hasFpAaaSecurityDomainsErrors = Boolean(errors && errors[name] && errors[name].security_domains);
  
  const isFpAaaActive = key === 'fpaaa';
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        
        
        <Tab eventKey="fpaaa" title={tabTitle('Aaa', hasFpAaaErrors)}>
          {isFpAaaActive && (
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'fabric_policies.fp_aaa', {})).map(([objectKey, value]) => (
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
        <Tab eventKey="fpaaamanagementsettings" title={tabTitle('Management Settings', hasFpAaaManagementSettingsErrors)}> 
          <FpAaaManagementSettings
              control={control}
              name={`${name}.management_settings`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaatacacsproviders" title={tabTitle('Tacacs Providers', hasFpAaaTacacsProvidersErrors)}> 
          <FpAaaTacacsProviders
              control={control}
              name={`${name}.tacacs_providers`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaaradiusproviders" title={tabTitle('Radius Providers', hasFpAaaRadiusProvidersErrors)}> 
          <FpAaaRadiusProviders
              control={control}
              name={`${name}.radius_providers`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaausers" title={tabTitle('Users', hasFpAaaUsersErrors)}> 
          <FpAaaUsers
              control={control}
              name={`${name}.users`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaalogindomains" title={tabTitle('Login Domains', hasFpAaaLoginDomainsErrors)}> 
          <FpAaaLoginDomains
              control={control}
              name={`${name}.login_domains`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpcacertificate" title={tabTitle('Ca Certificates', hasFpCaCertificateErrors)}> 
          <FpCaCertificate
              control={control}
              name={`${name}.ca_certificates`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpkeyring" title={tabTitle('Key Rings', hasFpKeyRingErrors)}> 
          <FpKeyRing
              control={control}
              name={`${name}.key_rings`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaaldap" title={tabTitle('Ldap', hasFpAaaLdapErrors)}> 
          <FpAaaLdap
              control={control}
              name={`${name}.ldap`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
        </Tab><Tab eventKey="fpaaasecuritydomains" title={tabTitle('Security Domains', hasFpAaaSecurityDomainsErrors)}> 
          <FpAaaSecurityDomains
              control={control}
              name={`${name}.security_domains`}
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

export default FpAaa;

