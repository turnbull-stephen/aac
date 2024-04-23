import React, { useState } from 'react';
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, Button, Accordion, Form, Pagination, Container, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _, { get } from 'lodash'

import ArrayFunctions from '../ArrayFunctions'
import Header from '../Header';
import schema from '../../../schemas/aac_ndo_schema.json'

import TApplicationProfiles from './TApplicationProfiles'
import TVrfs from './TVrfs'
import TBridgeDomains from './TBridgeDomains'
import TFilters from './TFilters'
import TContracts from './TContracts'
import TL3outs from './TL3outs'
import TExternalEndpointGroups from './TExternalEndpointGroups'
import TServiceGraphs from './TServiceGraphs'


const SchemasTemplates = React.memo(({ control, register, errors, clearErrors, setError, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    mode: 'all'
  });
  
  const title = 'Templates'
  
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
          const isTApplicationProfilesActive = activeKeys[item.id] === 'tapplicationprofiles';
          const isTVrfsActive = activeKeys[item.id] === 'tvrfs';
          const isTBridgeDomainsActive = activeKeys[item.id] === 'tbridgedomains';
          const isTFiltersActive = activeKeys[item.id] === 'tfilters';
          const isTContractsActive = activeKeys[item.id] === 'tcontracts';
          const isTL3outsActive = activeKeys[item.id] === 'tl3outs';
          const isTExternalEndpointGroupsActive = activeKeys[item.id] === 'texternalendpointgroups';
          const isTServiceGraphsActive = activeKeys[item.id] === 'tservicegraphs';
          
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
                      activeKey={activeKeys[item.id] || 'schemastemplates'}
                      onSelect={(k) => handleTabChange(item.id, k)}
                      className="mb-2"
                      id={item.id}
                    >
                      <Tab eventKey="schemastemplates" title="Templates">
                        <Card>
                          <Card.Body>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}>
                              {Object.entries(get(schema, 'schemas.schemas_templates', {})).map(([objectKey, value]) => (
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
                        <Tab eventKey="tapplicationprofiles" title="Application Profiles">
                        {isTApplicationProfilesActive && (  
                            <TApplicationProfiles
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].application_profiles`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tvrfs" title="Vrfs">
                        {isTVrfsActive && (  
                            <TVrfs
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].vrfs`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tbridgedomains" title="Bridge Domains">
                        {isTBridgeDomainsActive && (  
                            <TBridgeDomains
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].bridge_domains`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tfilters" title="Filters">
                        {isTFiltersActive && (  
                            <TFilters
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].filters`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tcontracts" title="Contracts">
                        {isTContractsActive && (  
                            <TContracts
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
                        
                        <Tab eventKey="tl3outs" title="L3outs">
                        {isTL3outsActive && (  
                            <TL3outs
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].l3outs`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="texternalendpointgroups" title="External Endpoint Groups">
                        {isTExternalEndpointGroupsActive && (  
                            <TExternalEndpointGroups
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].external_endpoint_groups`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tservicegraphs" title="Service Graphs">
                        {isTServiceGraphsActive && (  
                            <TServiceGraphs
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].service_graphs`}
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

export default SchemasTemplates;

