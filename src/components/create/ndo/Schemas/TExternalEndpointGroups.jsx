import React, { useState } from 'react';
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, Button, Accordion, Form, Pagination, Container, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _, { get } from 'lodash'

import ArrayFunctions from '../ArrayFunctions'
import Header from '../Header';
import schema from '../../../schemas/aac_ndo_schema.json'

import TEepgVrf from './TEepgVrf'
import TEepgL3out from './TEepgL3out'
import TEepgAp from './TEepgAp'
import TEepgSubnet from './TEepgSubnet'
import TEepgContracts from './TEepgContracts'
import TEepgSelectors from './TEepgSelectors'
import TEepgSites from './TEepgSites'


const TExternalEndpointGroups = React.memo(({ control, register, errors, clearErrors, setError, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    mode: 'all'
  });
  
  const title = 'External Endpoint Groups'
  
  const { getValues, setValue } = useFormContext()
  const formData = getValues()

  const { watch } = useFormContext();
  const schemaWatch = watch(`${name}`)

  const duplicate = (index) => {
    const ToDuplicate = { ...schemaWatch[index] };
    if (ToDuplicate.name) { ToDuplicate.name = ''; }
    if (ToDuplicate.ip) { ToDuplicate.ip = ''; }
    if (ToDuplicate.id) { ToDuplicate.id = ''; }
    append(ToDuplicate);
  };

  const handleDelete = (originalIndex) => {
    remove(originalIndex)
  };

  const [activeKeys, setActiveKeys] = useState({});
  const handleTabChange = (itemId, activeKey) => {
    setActiveKeys(prevKeys => ({ ...prevKeys, [itemId]: activeKey }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const paginatedFields = fields.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      {fields.length === 0 ? (
        <Container fluid className="d-flex justify-content-center">
          <h4 className='no-data'>Click '+ {title}' to create a new {title} </h4>
        </Container>
      ) : (
        paginatedFields.map((item, index) => {
          const originalIndex = (currentPage - 1) * itemsPerPage + index;
          const hasErrors = !!_.get(errors, `${name}.${originalIndex}`);
          const isTEepgVrfActive = activeKeys[item.id] === 'teepgvrf';
          const isTEepgL3outActive = activeKeys[item.id] === 'teepgl3out';
          const isTEepgApActive = activeKeys[item.id] === 'teepgap';
          const isTEepgSubnetActive = activeKeys[item.id] === 'teepgsubnet';
          const isTEepgContractsActive = activeKeys[item.id] === 'teepgcontracts';
          const isTEepgSelectorsActive = activeKeys[item.id] === 'teepgselectors';
          const isTEepgSitesActive = activeKeys[item.id] === 'teepgsites';
          
          return (
            <div key={item.id}>
              <Accordion className='mb-2'>
                <Accordion.Item eventKey={originalIndex.toString()}>
                  <Accordion.Header>

                    {
                      Header(originalIndex, name, hasErrors, formData, duplicate, title, handleDelete)
                    }

                  </Accordion.Header>
                  <Accordion.Body>
                    <Tabs
                      activeKey={activeKeys[item.id] || 'texternalendpointgroups'}
                      onSelect={(k) => handleTabChange(item.id, k)}
                      className="mb-2"
                      id={item.id}
                    >
                      <Tab eventKey="texternalendpointgroups" title="External Endpoint Groups">
                        <Card>
                          <Card.Body>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}>
                              {Object.entries(get(schema, 'schemas.t_external_endpoint_groups', {})).map(([objectKey, value]) => (
                                <ArrayFunctions
                                  key={objectKey} 
                                  originalIndex={originalIndex}
                                  objectKey={objectKey}
                                  value={value}
                                  errors={errors}
                                  register={register}
                                  control={control}
                                  formData={formData}
                                  name={name}
                                  setError={setError}
                                  clearErrors={clearErrors}
                                  Form={Form}
                                />
                              ))}
                            </div>
                          </Card.Body>
                        </Card>
                      </Tab>
                        <Tab eventKey="teepgvrf" title="Vrf">
                        {isTEepgVrfActive && (  
                            <TEepgVrf
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].vrf`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="teepgl3out" title="L3out">
                        {isTEepgL3outActive && (  
                            <TEepgL3out
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].l3out`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="teepgap" title="Application Profile">
                        {isTEepgApActive && (  
                            <TEepgAp
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].application_profile`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="teepgsubnet" title="Subnets">
                        {isTEepgSubnetActive && (  
                            <TEepgSubnet
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].subnets`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="teepgcontracts" title="Contracts">
                        {isTEepgContractsActive && (  
                            <TEepgContracts
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].contracts`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="teepgselectors" title="Selectors">
                        {isTEepgSelectorsActive && (  
                            <TEepgSelectors
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].selectors`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="teepgsites" title="Sites">
                        {isTEepgSitesActive && (  
                            <TEepgSites
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].sites`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        </Tabs>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div >
          )
        })
      )}
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <Pagination className="mt-2">
          {Array(Math.ceil(fields.length / itemsPerPage)).fill().map((_, index) => (
            <Pagination.Item
              key={index}
              active={index === currentPage - 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        {
          fields.length !== 0 && (
            <div className="d-flex align-items-center" style={{ minWidth: '172px' }}>
              <span className='me-2 small-font'>Items per page:</span>
              <Form.Select className="mb-2" style={{ maxWidth: "75px" }} size="sm" label="Items per page" aria-label="Items per page" value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Form.Select>
            </div>
          )
        }
      </div>
      <div>
        <Button variant="primary" size="sm" type="button" onClick={() => append({})}><FontAwesomeIcon icon={faPlus} /> {title}</Button>
      </div>
    </>
  )
})

export default TExternalEndpointGroups;

