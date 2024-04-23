import React, { useState } from 'react';
import { Tabs, Tab, Card, Form, Button } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

const ApMcp = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {

  const [key, setKey] = useState('apmcp'); // Keep state for the Tab selection
  const [enabled, setEnabled] = useState(true); // State for the toggle

  const toggleEnabled = () => setEnabled(!enabled); // Toggle the enabled state

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
  const hasApMcpErrors = Boolean(errors && errors[name] && errors[name].mcp)//;

  const isApMcpActive = key === 'apmcp';
  return (
    <div>
      <Form>
        <Form.Check
          type="switch"
          id="enable-disable-mcp"
          label="Enable/Disable MCP"
          checked={enabled}
          onChange={toggleEnabled}
          className="mb-3"
        />
      </Form>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="apmcp" title={tabTitle('Mcp', hasApMcpErrors)}>
          {enabled && isApMcpActive && (
            <Card>
              <Card.Body>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}>
                  {Object.entries(get(schema, 'access_policies.ap_mcp', {})).map(([objectKey, value]) => (
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
      </Tabs>
    </div>
  )
}

export default ApMcp;
