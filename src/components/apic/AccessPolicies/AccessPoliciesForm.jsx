import React, { useRef, useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, Row, Col, Card, Button, Form, Tab, Tabs  } from 'react-bootstrap';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import AccessPolicies from './AccessPolicies';
import ApVlanPool from './ApVlanPool';
import ApPhysicalDomain from './ApPhysicalDomain';
import ApRoutedDomain from './ApRoutedDomain';
import ApAaep from './ApAaep';
import ApSwitchPolicies from './ApSwitchPolicies';
import ApSpineSwitchPolicyGroups from './ApSpineSwitchPolicyGroups';
import ApLeafSwitchPolicyGroups from './ApLeafSwitchPolicyGroups';
import ApLeafSwitchProfiles from './ApLeafSwitchProfiles';
import ApSpineSwitchProfiles from './ApSpineSwitchProfiles';
import ApInterfacePolicies from './ApInterfacePolicies';
import ApLeafInterfacePolicyGroup from './ApLeafInterfacePolicyGroup';
import ApSpineInterfacePolicyGroup from './ApSpineInterfacePolicyGroup';
import ApLeafInterfaceProfiles from './ApLeafInterfaceProfiles';
import ApFexInterfaceProfiles from './ApFexInterfaceProfiles';
import ApSpineInterfaceProfiles from './ApSpineInterfaceProfiles';
import ApMcp from './ApMcp';
import ApQos from './ApQos';
import ApSpan from './ApSpan';
import ApVspan from './ApVspan';

const yaml = require('js-yaml');

// List of keys that should be converted from string to integer
const keysToInt = ['id', 'reserved_address_count']; // add all keys that need conversion

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

const AccessPoliciesForm = () => {
  const methods = useForm({ mode: 'all' });
  const { register, control, handleSubmit, reset, watch, formState: { errors }, clearErrors, setError, getValues, setValue } = methods;

  const [yamlPreData, setYamlPreData] = useState();

  // Remove empty objects
  const [removeEmptyValues, setRemoveEmptyValues] = useState(true);
  const handleCheckboxChange = (event) => {
    setRemoveEmptyValues(event.target.checked);
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
            
            reset(loadedData.apic.access_policies);
            onSubmit(loadedData.apic.access_policies)
            
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

  //console.log(allErrors)
  const onError = (errors, e) => {
    console.log(errors, e);
    const errorMessages = getErrorMessage(errors);
    const errorMessage = errorMessages.join("\n");
    setAllErrors(errorMessage); // set state variable
    setSnackbarMessage('Errors Found, Form Validation Failed!');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  // Define the Root for apic/access_policies
  
  const root = {
    "apic": { "access_policiess": {} }
  }
  

  const onSubmit = (data) => {
    // Remove empty arrays
    const cleanedData = removeEmptyArrays(data);
    const cleanedDataFinal = removeEmptyValues ? removeEmptyObjects(cleanedData) : cleanedData;

    // Use the conversion function to process the entire form data
    const processedData = convertToInt(cleanedDataFinal, keysToInt);
    
    root.apic.access_policiess = processedData;
    
    // To display the YAML representation of the access_policies array,
    setYamlPreData(yaml.dump(root));

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

  const [key, setKey] = useState('accesspolicies'); // Keep state for the Tab selection
  


  const hasAccessPoliciesErrors =Boolean(errors.leaf_switch_profile_name) || Boolean(errors.leaf_switch_selector_name) || Boolean(errors.leaf_interface_profile_name) || Boolean(errors.leaf_interface_selector_name) || Boolean(errors.leaf_interface_selector_sub_port_name) || Boolean(errors.fex_profile_name) || Boolean(errors.fex_interface_selector_name) || Boolean(errors.spine_switch_profile_name) || Boolean(errors.spine_switch_selector_name) || Boolean(errors.spine_interface_profile_name) || Boolean(errors.spine_interface_selector_name) || Boolean(errors.vpc_group_name) || Boolean(errors.infra_vlan);
  const hasApVlanPoolErrors = Boolean(errors.vlan_pools);
  const hasApPhysicalDomainErrors = Boolean(errors.physical_domains);
  const hasApRoutedDomainErrors = Boolean(errors.routed_domains);
  const hasApAaepErrors = Boolean(errors.aaeps);
  const hasApSwitchPoliciesErrors = Boolean(errors.switch_policies);
  const hasApSpineSwitchPolicyGroupsErrors = Boolean(errors.spine_switch_policy_groups);
  const hasApLeafSwitchPolicyGroupsErrors = Boolean(errors.leaf_switch_policy_groups);
  const hasApLeafSwitchProfilesErrors = Boolean(errors.leaf_switch_profiles);
  const hasApSpineSwitchProfilesErrors = Boolean(errors.spine_switch_profiles);
  const hasApInterfacePoliciesErrors = Boolean(errors.interface_policies);
  const hasApLeafInterfacePolicyGroupErrors = Boolean(errors.leaf_interface_policy_groups);
  const hasApSpineInterfacePolicyGroupErrors = Boolean(errors.spine_interface_policy_groups);
  const hasApLeafInterfaceProfilesErrors = Boolean(errors.leaf_interface_profiles);
  const hasApFexInterfaceProfilesErrors = Boolean(errors.fex_interface_profiles);
  const hasApSpineInterfaceProfilesErrors = Boolean(errors.spine_interface_profiles);
  const hasApMcpErrors = Boolean(errors.mcp);
  const hasApQosErrors = Boolean(errors.qos);
  const hasApSpanErrors = Boolean(errors.span);
  const hasApVspanErrors = Boolean(errors.vspan);
  

  return (
    <div className="full-height-layout">
      <Container fluid>
        <Row>
          <Col md={3}>
            <div>
              <label>Load Access Policies Data:</label>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" accept=".yaml,.yml" ref={fileInput} onChange={handleFileChange} />
              </Form.Group>
              <div>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <h5>Code Preview (Press "Submit" to update)</h5>
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
                </Box>
                <pre className="pre-tag">{yamlPreData}</pre>
              </div>
              <div>
                <label hidden>
                  Remove Empty Values:
                  <input
                    type="checkbox"
                    checked={removeEmptyValues}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
              <div>
                <h5>Validation Errors</h5>
                <pre className="pre-errors errors">{allErrors}</pre>
              </div>

            </div>
          </Col>
          <Col md={9}>
            <div >
            <h3 className='mt-2'>Access Policies</h3>
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
                        <Tab eventKey="accesspolicies" title={tabTitle('Access Policies', hasAccessPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <AccessPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'access_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apvlanpool" title={tabTitle('Vlan Pools', hasApVlanPoolErrors)}>
                          <Card>
                            <Card.Body>
                            <ApVlanPool control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'vlan_pools'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apphysicaldomain" title={tabTitle('Physical Domains', hasApPhysicalDomainErrors)}>
                          <Card>
                            <Card.Body>
                            <ApPhysicalDomain control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'physical_domains'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="aprouteddomain" title={tabTitle('Routed Domains', hasApRoutedDomainErrors)}>
                          <Card>
                            <Card.Body>
                            <ApRoutedDomain control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'routed_domains'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apaaep" title={tabTitle('Aaeps', hasApAaepErrors)}>
                          <Card>
                            <Card.Body>
                            <ApAaep control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'aaeps'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apswitchpolicies" title={tabTitle('Switch Policies', hasApSwitchPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApSwitchPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'switch_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apspineswitchpolicygroups" title={tabTitle('Spine Switch Policy Groups', hasApSpineSwitchPolicyGroupsErrors)}>
                          <Card>
                            <Card.Body>
                            <ApSpineSwitchPolicyGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_switch_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apleafswitchpolicygroups" title={tabTitle('Leaf Switch Policy Groups', hasApLeafSwitchPolicyGroupsErrors)}>
                          <Card>
                            <Card.Body>
                            <ApLeafSwitchPolicyGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_switch_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apleafswitchprofiles" title={tabTitle('Leaf Switch Profiles', hasApLeafSwitchProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApLeafSwitchProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_switch_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apspineswitchprofiles" title={tabTitle('Spine Switch Profiles', hasApSpineSwitchProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApSpineSwitchProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_switch_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apinterfacepolicies" title={tabTitle('Interface Policies', hasApInterfacePoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApInterfacePolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'interface_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apleafinterfacepolicygroup" title={tabTitle('Leaf Interface Policy Groups', hasApLeafInterfacePolicyGroupErrors)}>
                          <Card>
                            <Card.Body>
                            <ApLeafInterfacePolicyGroup control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_interface_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apspineinterfacepolicygroup" title={tabTitle('Spine Interface Policy Groups', hasApSpineInterfacePolicyGroupErrors)}>
                          <Card>
                            <Card.Body>
                            <ApSpineInterfacePolicyGroup control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_interface_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apleafinterfaceprofiles" title={tabTitle('Leaf Interface Profiles', hasApLeafInterfaceProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApLeafInterfaceProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_interface_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apfexinterfaceprofiles" title={tabTitle('Fex Interface Profiles', hasApFexInterfaceProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApFexInterfaceProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'fex_interface_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apspineinterfaceprofiles" title={tabTitle('Spine Interface Profiles', hasApSpineInterfaceProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <ApSpineInterfaceProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_interface_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apmcp" title={tabTitle('Mcp', hasApMcpErrors)}>
                          <Card>
                            <Card.Body>
                            <ApMcp control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'mcp'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apqos" title={tabTitle('Qos', hasApQosErrors)}>
                          <Card>
                            <Card.Body>
                            <ApQos control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'qos'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apspan" title={tabTitle('Span', hasApSpanErrors)}>
                          <Card>
                            <Card.Body>
                            <ApSpan control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'span'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="apvspan" title={tabTitle('Vspan', hasApVspanErrors)}>
                          <Card>
                            <Card.Body>
                            <ApVspan control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'vspan'} getValues={getValues} setValue={setValue} watch={watch} />
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
          </Col>
        </Row>
      </Container >
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>

  );
}

export default AccessPoliciesForm;
