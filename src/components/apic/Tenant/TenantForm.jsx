import React, { useRef, useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, Row, Col, Card, Button, Form, Tab, Tabs } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tenant from './Tenant';
import TenVrf from './TenVrf';
import TenBridgeDomains from './TenBridgeDomains';
import TenApplicationProfiles from './TenApplicationProfiles';
import TenInbEndpointGroups from './TenInbEndpointGroups';
import TenOobEndpointGroups from './TenOobEndpointGroups';
import TenExtMgmtInstances from './TenExtMgmtInstances';
import TenL3outs from './TenL3outs';
import TenSrMplsL3outs from './TenSrMplsL3outs';
import TenFilters from './TenFilters';
import TenContracts from './TenContracts';
import TenOobContracts from './TenOobContracts';
import TenImportedContracts from './TenImportedContracts';
import TenPolicies from './TenPolicies';
import TenServices from './TenServices';
import TenExpectedState from './TenExpectedState';

import SplitPane from 'react-split-pane';
import MonacoYamlEditor from '../MonacoYamlEditor'; // Import the component you created
import '../SplitPaneStyles.css'

//import apicJsonSchema from '../../../schemas/aac_apic_json_schema.json'
//console.log(apicJsonSchema)

//import 'react-split-pane/lib/SplitPane.css';

const yaml = require('js-yaml');

// List of keys that should be converted from string to integer
// add all keys that need conversion
const keysToInt = ['l2_port_mtu', 'fabric_isis_redistribute_metric', 'fabric_bgp_as', 'detection_interval', 'detection_multiplier', 'hold_interval', 'delay', 'min_links', 'global_domain', 'announce_interval', 'announce_timeout', 'sync_interval', 'delay_interval', 'interval', 'apic_ntp_server_master_stratum', 'auth_key_id', 'id', 'minimum_health', 'maximum_critical_faults', 'maximum_major_faults', 'maximum_minor_faults', 'port', 'from', 'to', 'from_module', 'from_port', 'to_module', 'to_port', 'fabric_id', 'site_id', 'num_links', 'password_change_count', 'password_change_interval', 'password_no_change_interval', 'password_history_count', 'web_token_timeout', 'web_token_max_validity', 'web_session_idle_timeout', 'login_block_duration', 'login_max_failed_attempts', 'login_max_failed_attempts_window', 'password_mininum_length', 'password_maximum_length', 'timeout', 'retries', 'priority', 'hour', 'minute', 'maximum_size', 'node_id', 'pod_id', 'module', 'flow_id', 'mtu', 'ttl', 'port_mtu_size', 'response_threshold', 'top_slowest_requests', 'calculation_window', 'infra_vlan', 'vlan', 'primary_vlan', 'secondary_vlan', 'frequency_sec', 'frequency_msec', 'initial_delay', 'loop_detection', 'level', 'bandwidth_percent', 'minimum_buffer', 'wred_max_threshold', 'wred_min_threshold', 'wred_probability', 'weight', 'sub_port', 'node2_id', 'fex_id', 'from_sub_port', 'to_sub_port', 'max_links', 'revision', 'peer_dead_interval', 'reserved_address_count', 'switch_1', 'switch_2', 'pod', 'remote_pool_id', 'psu_count', 'from_prefix_length', 'to_prefix_length', 'asm_traffic_registry_max_rate', 'area_cost', 'asn', 'remote_as', 'allowed_self_as_count', 'local_as', 'preference', 'order', 'administrative_distance', 'segment_id_index', 'cost', 'hello_interval', 'dead_interval', 'lsa_retransmit_interval', 'lsa_transmit_delay', 'bandwidth', 'reference_bandwidth', 'distance', 'max_ecmp', 'spf_init_interval', 'spf_hold_interval', 'spf_max_interval', 'max_lsa_reset_interval', 'max_lsa_sleep_count', 'max_lsa_sleep_interval', 'lsa_arrival_interval', 'lsa_group_pacing_interval', 'lsa_hold_interval', 'lsa_start_interval', 'lsa_max_interval', 'max_lsa_num', 'max_lsa_threshold', 'max_prefixes', 'threshold', 'restart_time', 'keepalive_interval', 'maximum_as_limit', 'ebgp_distance', 'ibgp_distance', 'local_distance', 'ebgp_max_ecmp', 'ibgp_max_ecmp', 'local_max_ecmp', 'tag', 'from_length', 'to_length', 'metric', 'half_life', 'max_suppress_time', 'reuse_limit', 'suppress_limit', 'count', 'echo_rx_interval', 'min_rx_interval', 'min_tx_interval', 'designated_router_delay', 'designated_router_priority', 'join_prune_interval', 'last_member_query_interval', 'query_interval', 'query_response_interval', 'start_query_count', 'start_query_interval', 'grp_timeout', 'last_member_count', 'last_member_response_time', 'querier_timeout', 'robustness_variable', 'startup_query_count', 'startup_query_interval', 'frequency', 'multiplier', 'version', 'hop_limit', 'ns_tx_interval', 'retransmit_retry_count', 'nud_retransmit_base', 'nud_retransmit_interval', 'nud_retransmit_count', 'route_advertise_interval', 'router_lifetime', 'reachable_time', 'retransmit_timer', 'valid_lifetime', 'preferred_lifetime', 'max_threshold', 'min_threshold']

const convertToInt = (data, keys) => {
  // Recursively process the data to find and convert values
  if (Array.isArray(data)) {
    return data.map(item => convertToInt(item, keys));
  } else if (typeof data === 'object' && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      // If the current key is in the list of keys to convert, parse it as an integer
      if (keys.includes(key)) {
        acc[key] = value !== "" ? parseInt(value, 10) : null;
      } else if (typeof value === 'object') {
        // If the value is an object or array, process it recursively
        acc[key] = convertToInt(value, keys);
      } else {
        // Otherwise, keep the original value
        acc[key] = value;
      }
      return acc;
    }, {});
  }
  return data;
};


const TenantForm = () => {
  const methods = useForm({ mode: 'all' });
  const { register, control, handleSubmit, reset, watch, formState: { errors }, clearErrors, setError, getValues, setValue } = methods;

  const [yamlPreData, setYamlPreData] = useState();

  // Used for the Monaco Editor without adding root to the object/array
  const [yamlEditData, setYamlEditData] = useState();

  // Used for the Monaco Editor
  const editorRef = useRef();

  // Remove empty objects
  const [removeEmptyValues, setRemoveEmptyValues] = useState(true);
  const handleCheckboxChange = (event) => {
    setRemoveEmptyValues(event.target.checked);
  };


  // Remove empty objects
  const [tenantName, setTenantName] = useState(false);
  const [tenantCheckboxName, setTenantCheckboxName] = useState(false);
  const handleTenantCheckboxChange = (event) => {
    setTenantName(event.target.checked);
  };
  // Load Tenant Data
  const fileInput = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file extension is .yaml or .yml
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension === 'yaml' || fileExtension === 'yml') {
        const reader = new FileReader();

        reader.onload = (event) => {
          try {
            const loadedData = yaml.load(event.target.result);
            console.log(loadedData);

            if (loadedData.apic.tenants[0].name === 'mgmt') {
              setTenantName(true)
              setTenantCheckboxName(true)
            }
            else {
              setTenantName(false)
              setTenantCheckboxName(false)
            }

            reset(loadedData.apic.tenants[0]);
            //onSubmit(loadedData.apic.tenants[0]);
            setYamlEditData(loadedData.apic.tenants[0])

            setSnackbarMessage('Tenant Loaded Successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
          } catch (error) {
            console.error('Failed to parse YAML:', error);
            setSnackbarMessage('Tenant Loaded Failed!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
          }
        };

        reader.readAsText(file);
      } else {
        // Alert the user or handle the error
        setSnackbarMessage('Please select a YAML file (.yaml or .yml)');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  function removeEmptyObjects(data) {
    // Check if the value is 'empty' according to your criteria
    function isEmptyValue(value) {
      if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        return true;
      }
      if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0;
      }
      return false;
    }

    // Remove empty objects recursively
    function removeEmpty(data) {
      if (Array.isArray(data)) {
        return data.map(removeEmpty).filter(value => !isEmptyValue(value));
      } else if (typeof data === 'object' && data !== null) {
        const newObj = Object.entries(data)
          .map(([key, value]) => [key, removeEmpty(value)])
          .filter(([key, value]) => !isEmptyValue(value));
        if (newObj.length === 0) {
          return undefined;
        }
        return Object.fromEntries(newObj);
      }
      return data;
    }

    return removeEmpty(data);
  }

  function removeEmptyArrays(data) {
    if (Array.isArray(data)) {
      const newArr = data.map(removeEmptyArrays).filter(value => value !== undefined);
      return newArr.length === 0 ? undefined : newArr;
    }
    if (typeof data === 'object' && data !== null) {
      return Object.fromEntries(
        Object.entries(data)
          .map(([key, value]) => [key, removeEmptyArrays(value)])
          .filter(([key, value]) => value !== undefined)
      );
    }
    return data;
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setAllErrors('');
    }
  }, [errors]);

  const [allErrors, setAllErrors] = useState('');

  const getErrorMessage = (error, path = '') => {
    return Object.entries(error).reduce((messages, [key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      if (value.message) {
        messages.push(`${newPath}: ${value.message}`);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          messages.push(...getErrorMessage(item, `${newPath}[${index + 1}]`));
        });
      } else if (typeof value === 'object') {
        messages.push(...getErrorMessage(value, newPath));
      }
      return messages;
    }, []);
  };

  const onError = (errors, e) => {
    console.log(errors, e);
    const errorMessages = getErrorMessage(errors);
    const errorMessage = errorMessages.join("\n");
    setAllErrors(errorMessage); // set state variable
    setSnackbarMessage('Errors Found, Form Validation Failed!');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  // Define the Root for apic/tenant
  const root = {
    "apic": { "tenants": [] }
  }

  const onSubmit = (data) => {
    // Remove empty arrays
    const cleanedData = removeEmptyArrays(data);
    const cleanedDataFinal = removeEmptyValues ? removeEmptyObjects(cleanedData) : cleanedData;

    // Use the conversion function to process the entire form data
    const processedData = convertToInt(cleanedDataFinal, keysToInt);

    root.apic.tenants.push(processedData);

    // To display the YAML representation of the data in the preview window,
    setYamlPreData(yaml.dump(root));

    // To update the YAML representation of the data in the Monaco Editor window,
    setYamlEditData(processedData);

    // Form submission logic here...
    console.log(data);
    setSnackbarMessage('Submission successful!');
    setSnackbarSeverity('success');

    setOpenSnackbar(true);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Handle the Copy the Code to clipboard with snackbar message
  const handleCopyToClipboard = () => {
    console.log(yamlPreData)
    navigator.clipboard.writeText(yamlPreData)
      .then(() => {
        // Success! Use the existing Snackbar state to show a copied message.
        setSnackbarMessage('Copied Code Clipboard!');
        setSnackbarSeverity('success'); // Assuming you want a success message
        setOpenSnackbar(true);
      })
      .catch(err => {
        // Error! Optionally handle the error case by using the Snackbar as well.
        setSnackbarMessage('Failed to copy Code to Clipboard');
        setSnackbarSeverity('error'); // Assuming you want an error message
        setOpenSnackbar(true);
        console.error('Failed to copy Code to Clipboard', err);
      });
  };

  //const watchAllFields = watch();
  // If errors are found in a component the parent tab will indicate this with a red !
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

  const handleEditorUpdate = () => {
    if (editorRef.current) {
      const yamlContent = editorRef.current.getValue();
      try {
        const jsonData = yaml.load(yamlContent);
        setYamlEditData(jsonData)
        reset(jsonData); // Reset the form state with the valid JSON data
      } catch (error) {
        // Errors are now handled by the onChange event, so nothing is needed here.
        console.error("YAML content error on reset", error);
      }
    }
  };

  const [key, setKey] = useState('tenant'); // Keep state for the Tab selection

  const hasTenantErrors = Boolean(errors.name) || Boolean(errors.managed) || Boolean(errors.alias) || Boolean(errors.description) || Boolean(errors.security_domains);
  const hasTenVrfErrors = Boolean(errors.vrfs);
  const hasTenBridgeDomainsErrors = Boolean(errors.bridge_domains);
  const hasTenApplicationProfilesErrors = Boolean(errors.application_profiles);
  const hasTenInbEndpointGroupsErrors = Boolean(errors.inb_endpoint_groups);
  const hasTenOobEndpointGroupsErrors = Boolean(errors.oob_endpoint_groups);
  const hasTenExtMgmtInstancesErrors = Boolean(errors.ext_mgmt_instances);
  const hasTenL3outsErrors = Boolean(errors.l3outs);
  const hasTenSrMplsL3outsErrors = Boolean(errors.sr_mpls_l3outs);
  const hasTenFiltersErrors = Boolean(errors.filters);
  const hasTenContractsErrors = Boolean(errors.contracts);
  const hasTenOobContractsErrors = Boolean(errors.oob_contracts);
  const hasTenImportedContractsErrors = Boolean(errors.imported_contracts);
  const hasTenPoliciesErrors = Boolean(errors.policies);
  const hasTenServicesErrors = Boolean(errors.services);
  const hasTenExpectedStateErrors = Boolean(errors.expected_state);

  const [editorHeight, setEditorHeight] = useState(); // Set initial height in pixels

  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedSetEditorHeight = debounce((newSize) => {
    setEditorHeight(newSize);
  }, 200); // 200ms delay, adjust as needed

  return (
    <div >
      <Container fluid >
        <Row>
          <SplitPane style={{ maxHeight: "94%", maxWidth: "100%" }} split="vertical" minSize={100} defaultSize={"30%"}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <div>
                <Row>
                  <label>Load Tenant Data:</label>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" accept=".yaml,.yml" ref={fileInput} onChange={handleFileChange} />
                  </Form.Group>

                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <h5>Live Code Editor</h5>
                    <Tooltip title="Copy Code Clipboard" placement="top">
                      <IconButton
                        onClick={handleCopyToClipboard}
                        aria-label="copy to clipboard"
                        sx={{
                          "&:hover": {
                            color: "primary.main", // Change to desired hover color
                          },
                        }}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                      <Tooltip title="Update Form Data" placement="top">
                        <IconButton
                          onClick={handleEditorUpdate}
                          aria-label="Update Form Data"
                          sx={{
                            "&:hover": {
                              color: "primary.main", // Change to desired hover color
                            },
                          }}
                        >
                        <UpdateIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Row >
              </div>
              <SplitPane split="horizontal" defaultSize={550} style={{ position: 'relative', height: 'calc(100% - 100px)' }} onChange={debouncedSetEditorHeight}>
                <MonacoYamlEditor
                  yamlEditData={yamlEditData} // The name of the field that holds the YAML/JSON data
                  editorRef={editorRef}
                />
                <div className='mt-2'>
                  <h5>Validation Errors</h5>
                  <pre className="pre-errors errors">{allErrors}</pre>
                </div>
              </SplitPane>

            </div>
            <div style={{ overflow: 'auto', height: '100%'}}>
              <h3 className='mt-2'>Tenant</h3>
              <FormControlLabel
                control={
                  <Switch
                    checked={tenantName}
                    onChange={handleTenantCheckboxChange}
                    disabled={tenantCheckboxName}
                    name="checkedTenant"
                  />
                }
                label="Is mgmt"
              />
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <Card>
                    <Card.Body>
                      <Tabs
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className={`border-primary tabs-title`}
                      //justify
                      //fill
                      >
                        <Tab eventKey="tenant" title={tabTitle('Tenant', hasTenantErrors)}>
                          <Card>
                            <Card.Body>
                              <Tenant control={control} register={register} errors={errors} name={''} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenvrf" title={tabTitle('Vrfs', hasTenVrfErrors)}>
                          <Card>
                            <Card.Body>
                              <TenVrf control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'vrfs'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenbridgedomains" title={tabTitle('Bridge Domains', hasTenBridgeDomainsErrors)}>
                          <Card>
                            <Card.Body>
                              <TenBridgeDomains control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'bridge_domains'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenapplicationprofiles" title={tabTitle('Application Profiles', hasTenApplicationProfilesErrors)}>
                          <Card>
                            <Card.Body>
                              <TenApplicationProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'application_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        {
                          tenantName && (
                            <Tab eventKey="teninbendpointgroups" title={tabTitle('Inb Endpoint Groups', hasTenInbEndpointGroupsErrors)}>
                              <Card>
                                <Card.Body>
                                  <TenInbEndpointGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'inb_endpoint_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                                </Card.Body>
                              </Card>
                            </Tab>
                          )}
                        {
                          tenantName && (
                            <Tab eventKey="tenoobendpointgroups" title={tabTitle('Oob Endpoint Groups', hasTenOobEndpointGroupsErrors)}>
                              <Card>
                                <Card.Body>
                                  <TenOobEndpointGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'oob_endpoint_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                                </Card.Body>
                              </Card>
                            </Tab>
                          )}
                        {
                          tenantName && (
                            <Tab eventKey="tenextmgmtinstances" title={tabTitle('Ext Mgmt Instances', hasTenExtMgmtInstancesErrors)}>
                              <Card>
                                <Card.Body>
                                  <TenExtMgmtInstances control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'ext_mgmt_instances'} getValues={getValues} setValue={setValue} watch={watch} />
                                </Card.Body>
                              </Card>
                            </Tab>
                          )}
                        <Tab eventKey="tenl3outs" title={tabTitle('L3Outs', hasTenL3outsErrors)}>
                          <Card>
                            <Card.Body>
                              <TenL3outs control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'l3outs'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>

                        <Tab eventKey="tensrmplsl3outs" title={tabTitle('Sr Mpls L3Outs', hasTenSrMplsL3outsErrors)}>
                          <Card>
                            <Card.Body>
                              <TenSrMplsL3outs control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'sr_mpls_l3outs'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenfilters" title={tabTitle('Filters', hasTenFiltersErrors)}>
                          <Card>
                            <Card.Body>
                              <TenFilters control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'filters'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tencontracts" title={tabTitle('Contracts', hasTenContractsErrors)}>
                          <Card>
                            <Card.Body>
                              <TenContracts control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'contracts'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        {
                          tenantName && (
                            <Tab eventKey="tenoobcontracts" title={tabTitle('Oob Contracts', hasTenOobContractsErrors)}>
                              <Card>
                                <Card.Body>
                                  <TenOobContracts control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'oob_contracts'} getValues={getValues} setValue={setValue} watch={watch} />
                                </Card.Body>
                              </Card>
                            </Tab>
                          )}
                        <Tab eventKey="tenimportedcontracts" title={tabTitle('Imported Contracts', hasTenImportedContractsErrors)}>
                          <Card>
                            <Card.Body>
                              <TenImportedContracts control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'imported_contracts'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenpolicies" title={tabTitle('Policies', hasTenPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                              <TenPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenservices" title={tabTitle('Services', hasTenServicesErrors)}>
                          <Card>
                            <Card.Body>
                              <TenServices control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'services'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="tenexpectedstate" title={tabTitle('Expected State', hasTenExpectedStateErrors)}>
                          <Card>
                            <Card.Body>
                              <TenExpectedState control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'expected_state'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                      </Tabs>
                    </Card.Body>
                  </Card>
                  <div className="mt-2">
                    <Button variant="primary" size="sm" type="submit" value="Submit">Submit</Button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </SplitPane >
        </Row >
      </Container >
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div >
  );
}

export default TenantForm;
