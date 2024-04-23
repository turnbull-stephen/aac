import React, { useState } from 'react';
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, Button, Accordion, Form, Pagination, Container, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _, { get } from 'lodash'

import ArrayFunctions from '../ArrayFunctions'
import Header from '../Header';
import schema from '../../../schemas/aac_apic_schema.json'

import TenApEndpointSecurityGroupsContracts from './TenApEndpointSecurityGroupsContracts'
import TenApEndpointSecurityGroupsTagSelectors from './TenApEndpointSecurityGroupsTagSelectors'
import TenApEndpointSecurityGroupsEpgSelectors from './TenApEndpointSecurityGroupsEpgSelectors'
import TenApEndpointSecurityGroupsIpSubnetSelectors from './TenApEndpointSecurityGroupsIpSubnetSelectors'
import TenApEndpointSecurityGroupsExpectedState from './TenApEndpointSecurityGroupsExpectedState'


const TenApEndpointSecurityGroups = React.memo(({ control, register, errors, clearErrors, setError, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    mode: 'all'
  });
  
  const title = 'Endpoint Security Groups'
  
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

  const renderPagination = (currentPage, pageCount) => {
    // Determine the number of pages you want to show in the pagination bar
    let maxPageItems = 5; // Adjust this number based on your design needs

    let startPage, endPage;
    if (pageCount <= maxPageItems) {
      // Less than maxPageItems total pages so show all
      startPage = 1;
      endPage = pageCount;
    } else {
      // More than maxPageItems total pages so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(maxPageItems / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageItems / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // Close to the beginning; only show the first maxPageItems pages
        startPage = 1;
        endPage = maxPageItems;
      } else if (currentPage + maxPagesAfterCurrentPage >= pageCount) {
        // Close to the end; only show the last maxPageItems pages
        startPage = pageCount - maxPageItems + 1;
        endPage = pageCount;
      } else {
        // Somewhere in the middle; show some pages before and some pages after current page
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Create an array containing the range of pages to be displayed
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />

        {startPage > 1 && <Pagination.Item onClick={() => setCurrentPage(1)}>1</Pagination.Item>}
        {startPage > 2 && <Pagination.Ellipsis />}

        {pages.map(page =>
          <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
            {page}
          </Pagination.Item>
        )}

        {endPage < pageCount - 1 && <Pagination.Ellipsis />}
        {endPage < pageCount && <Pagination.Item onClick={() => setCurrentPage(pageCount)}>{pageCount}</Pagination.Item>}

        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount} />
        <Pagination.Last onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount} />
      </Pagination>
    );
  };

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
          const isTenApEndpointSecurityGroupsContractsActive = activeKeys[item.id] === 'tenapendpointsecuritygroupscontracts';
          const isTenApEndpointSecurityGroupsTagSelectorsActive = activeKeys[item.id] === 'tenapendpointsecuritygroupstagselectors';
          const isTenApEndpointSecurityGroupsEpgSelectorsActive = activeKeys[item.id] === 'tenapendpointsecuritygroupsepgselectors';
          const isTenApEndpointSecurityGroupsIpSubnetSelectorsActive = activeKeys[item.id] === 'tenapendpointsecuritygroupsipsubnetselectors';
          const isTenApEndpointSecurityGroupsExpectedStateActive = activeKeys[item.id] === 'tenapendpointsecuritygroupsexpectedstate';
          
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
                      activeKey={activeKeys[item.id] || 'tenapendpointsecuritygroups'}
                      onSelect={(k) => handleTabChange(item.id, k)}
                      className="mb-2"
                      id={item.id}
                    >
                      <Tab eventKey="tenapendpointsecuritygroups" title="Endpoint Security Groups">
                        <Card>
                          <Card.Body>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}>
                              {Object.entries(get(schema, 'tenant.ten_ap_endpoint_security_groups', {})).map(([objectKey, value]) => (
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
                        <Tab eventKey="tenapendpointsecuritygroupscontracts" title="Contracts">
                        {isTenApEndpointSecurityGroupsContractsActive && (  
                            <TenApEndpointSecurityGroupsContracts
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].contracts`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenapendpointsecuritygroupstagselectors" title="Tag Selectors">
                        {isTenApEndpointSecurityGroupsTagSelectorsActive && (  
                            <TenApEndpointSecurityGroupsTagSelectors
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].tag_selectors`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenapendpointsecuritygroupsepgselectors" title="Epg Selectors">
                        {isTenApEndpointSecurityGroupsEpgSelectorsActive && (  
                            <TenApEndpointSecurityGroupsEpgSelectors
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].epg_selectors`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenapendpointsecuritygroupsipsubnetselectors" title="Ip Subnet Selectors">
                        {isTenApEndpointSecurityGroupsIpSubnetSelectorsActive && (  
                            <TenApEndpointSecurityGroupsIpSubnetSelectors
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].ip_subnet_selectors`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenapendpointsecuritygroupsexpectedstate" title="Expected State">
                        {isTenApEndpointSecurityGroupsExpectedStateActive && (  
                            <TenApEndpointSecurityGroupsExpectedState
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].expected_state`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
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
      <>
        {fields.length !== 0 && (
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            {
              renderPagination(currentPage, Math.ceil(fields.length / itemsPerPage))
            }
            <div className="d-flex align-items-center" style={{ minWidth: '172px' }}>
              <span className='me-2 small-font'>Items per page:</span>
              <Form.Select className="mb-2" style={{ maxWidth: "75px" }} size="sm" label="Items per page" aria-label="Items per page" id={title} value={itemsPerPage} onChange={e => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Form.Select>
            </div>
          </div>
        )}
      </>
      <div>
        <Button variant="primary" size="sm" type="button" onClick={() => append({})}><FontAwesomeIcon icon={faPlus} /> {title}</Button>
      </div>
    </>
  )
})

export default TenApEndpointSecurityGroups;

