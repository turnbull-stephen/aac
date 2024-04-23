import React, { useState } from 'react';
import { useFormContext, useFieldArray } from "react-hook-form";
import { Card, Button, Accordion, Form, Pagination, Container, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import _, { get } from 'lodash'

import ArrayFunctions from '../ArrayFunctions'
import Header from '../Header';
import schema from '../../../schemas/aac_apic_schema.json'

import TenL3outsOspf from './TenL3outsOspf'
import TenL3outsEigrp from './TenL3outsEigrp'
import TenL3outsBgpPeers from './TenL3outsBgpPeers'
import TenL3outsNodes from './TenL3outsNodes'
import TenL3outsNodeProfiles from './TenL3outsNodeProfiles'
import TenL3outsExternalEndpointGroups from './TenL3outsExternalEndpointGroups'
import TenL3outsImportRouteMap from './TenL3outsImportRouteMap'
import TenL3outsExportRouteMap from './TenL3outsExportRouteMap'
import TenL3outsDefaultRouteLeakPolicy from './TenL3outsDefaultRouteLeakPolicy'
import TenL3outsRedistributionRouteMaps from './TenL3outsRedistributionRouteMaps'
import TenL3outsExpectedState from './TenL3outsExpectedState'


const TenL3outs = React.memo(({ control, register, errors, clearErrors, setError, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
    mode: 'all'
  });
  
  const title = 'L3outs'
  
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
          const isTenL3outsOspfActive = activeKeys[item.id] === 'tenl3outsospf';
          const isTenL3outsEigrpActive = activeKeys[item.id] === 'tenl3outseigrp';
          const isTenL3outsBgpPeersActive = activeKeys[item.id] === 'tenl3outsbgppeers';
          const isTenL3outsNodesActive = activeKeys[item.id] === 'tenl3outsnodes';
          const isTenL3outsNodeProfilesActive = activeKeys[item.id] === 'tenl3outsnodeprofiles';
          const isTenL3outsExternalEndpointGroupsActive = activeKeys[item.id] === 'tenl3outsexternalendpointgroups';
          const isTenL3outsImportRouteMapActive = activeKeys[item.id] === 'tenl3outsimportroutemap';
          const isTenL3outsExportRouteMapActive = activeKeys[item.id] === 'tenl3outsexportroutemap';
          const isTenL3outsDefaultRouteLeakPolicyActive = activeKeys[item.id] === 'tenl3outsdefaultrouteleakpolicy';
          const isTenL3outsRedistributionRouteMapsActive = activeKeys[item.id] === 'tenl3outsredistributionroutemaps';
          const isTenL3outsExpectedStateActive = activeKeys[item.id] === 'tenl3outsexpectedstate';
          
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
                      activeKey={activeKeys[item.id] || 'tenl3outs'}
                      onSelect={(k) => handleTabChange(item.id, k)}
                      className="mb-2"
                      id={item.id}
                    >
                      <Tab eventKey="tenl3outs" title="L3outs">
                        <Card>
                          <Card.Body>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: '1rem' }}>
                              {Object.entries(get(schema, 'tenant.ten_l3outs', {})).map(([objectKey, value]) => (
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
                        <Tab eventKey="tenl3outsospf" title="Ospf">
                        {isTenL3outsOspfActive && (  
                            <TenL3outsOspf
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].ospf`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outseigrp" title="Eigrp">
                        {isTenL3outsEigrpActive && (  
                            <TenL3outsEigrp
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].eigrp`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsbgppeers" title="Bgp Peers">
                        {isTenL3outsBgpPeersActive && (  
                            <TenL3outsBgpPeers
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].bgp_peers`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsnodes" title="Nodes">
                        {isTenL3outsNodesActive && (  
                            <TenL3outsNodes
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].nodes`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsnodeprofiles" title="Node Profiles">
                        {isTenL3outsNodeProfilesActive && (  
                            <TenL3outsNodeProfiles
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].node_profiles`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsexternalendpointgroups" title="External Endpoint Groups">
                        {isTenL3outsExternalEndpointGroupsActive && (  
                            <TenL3outsExternalEndpointGroups
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].external_endpoint_groups`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsimportroutemap" title="Import Route Map">
                        {isTenL3outsImportRouteMapActive && (  
                            <TenL3outsImportRouteMap
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].import_route_map`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsexportroutemap" title="Export Route Map">
                        {isTenL3outsExportRouteMapActive && (  
                            <TenL3outsExportRouteMap
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].export_route_map`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsdefaultrouteleakpolicy" title="Default Route Leak Policy">
                        {isTenL3outsDefaultRouteLeakPolicyActive && (  
                            <TenL3outsDefaultRouteLeakPolicy
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].default_route_leak_policy`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsredistributionroutemaps" title="Redistribution Route Maps">
                        {isTenL3outsRedistributionRouteMapsActive && (  
                            <TenL3outsRedistributionRouteMaps
                              key={item.id}
                              control={control}
                              name={`${name}[${originalIndex}].redistribution_route_maps`}
                              register={register}
                              errors={errors}
                              setError={setError}
                              clearErrors={clearErrors}
                              formData={formData}
                            />
                        )}
                        </Tab>
                        
                        <Tab eventKey="tenl3outsexpectedstate" title="Expected State">
                        {isTenL3outsExpectedStateActive && (  
                            <TenL3outsExpectedState
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

export default TenL3outs;

