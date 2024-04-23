
import React, { useState } from 'react';
import { Controller, } from "react-hook-form";
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';
import cidrRegex from 'cidr-regex';
import ipRegex from 'ip-regex';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

const  NodePolicies = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {  
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
  const [key, setKey] = useState('nodepolicies'); // Keep state for the Tab selection
  const hasNodePoliciesErrors = Boolean(errors && errors[name] && errors[name].node_policies)//;
  
  const [createdOptions, setCreatedOptions] = useState([]);

  return (
    <div>
    <Tabs
        activeKey={key}
        className={`mb-3 tabs-title`}
      //fill
      //justify
      >
        <Tab eventKey="nodepolicies" title={tabTitle('Node Policies', hasNodePoliciesErrors)}>
            <Card>
              <Card.Body> 
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}> 
                  {Object.entries(get(schema, 'node_policies.node_policies', {})).map(([objectKey, value]) => (
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
        </Tab>
      </Tabs>
    </div>
)}

export default NodePolicies;
