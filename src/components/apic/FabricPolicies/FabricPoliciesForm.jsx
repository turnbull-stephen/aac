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
import FabricPolicies from './FabricPolicies';
import FpBanners from './FpBanners';
import FpEpLoopProtection from './FpEpLoopProtection';
import FpRogueEpControl from './FpRogueEpControl';
import FpGlobalSettings from './FpGlobalSettings';
import FpPortTracking from './FpPortTracking';
import FpPtp from './FpPtp';
import FpDateTimeFormat from './FpDateTimeFormat';
import FpDnsPolicy from './FpDnsPolicy';
import FpErrDisabledRecovery from './FpErrDisabledRecovery';
import FpPodPolicies from './FpPodPolicies';
import FpPodPolicyGroups from './FpPodPolicyGroups';
import FpPodProfiles from './FpPodProfiles';
import FpSwitchPolicies from './FpSwitchPolicies';
import FpLeafSwitchPolicyGroups from './FpLeafSwitchPolicyGroups';
import FpSpineSwitchPolicyGroups from './FpSpineSwitchPolicyGroups';
import FpLeafSwitchProfiles from './FpLeafSwitchProfiles';
import FpSpineSwitchProfiles from './FpSpineSwitchProfiles';
import FpLeafInterfaceProfiles from './FpLeafInterfaceProfiles';
import FpSpineInterfaceProfiles from './FpSpineInterfaceProfiles';
import FpExternalConnectivityPolicy from './FpExternalConnectivityPolicy';
import FpInfraDscpTranslationPolicy from './FpInfraDscpTranslationPolicy';
import FpVmwareVmmDomains from './FpVmwareVmmDomains';
import FpAaa from './FpAaa';
import FpGeolocation from './FpGeolocation';
import FpRemoteLocations from './FpRemoteLocations';
import FpSchedulers from './FpSchedulers';
import FpConfigExports from './FpConfigExports';
import FpMonitoring from './FpMonitoring';
import FpSpan from './FpSpan';
import FpSmartLicensing from './FpSmartLicensing';
import FpL2MtuPolicies from './FpL2MtuPolicies';
import FpSystemPerformance from './FpSystemPerformance';

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

const FabricPoliciesForm = () => {
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
            
            reset(loadedData.apic.fabric_policies);
            onSubmit(loadedData.apic.fabric_policies)
            
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

  // Define the Root for apic/fabric_policies
  
  const root = {
    "apic": { "fabric_policiess": {} }
  }
  

  const onSubmit = (data) => {
    // Remove empty arrays
    const cleanedData = removeEmptyArrays(data);
    const cleanedDataFinal = removeEmptyValues ? removeEmptyObjects(cleanedData) : cleanedData;

    // Use the conversion function to process the entire form data
    const processedData = convertToInt(cleanedDataFinal, keysToInt);
    
    root.apic.fabric_policiess = processedData;
    
    // To display the YAML representation of the fabric_policies array,
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

  const [key, setKey] = useState('fabricpolicies'); // Keep state for the Tab selection
  


  const hasFabricPoliciesErrors =Boolean(errors.leaf_switch_profile_name) || Boolean(errors.leaf_switch_selector_name) || Boolean(errors.leaf_interface_profile_name) || Boolean(errors.spine_switch_profile_name) || Boolean(errors.spine_switch_selector_name) || Boolean(errors.spine_interface_profile_name) || Boolean(errors.pod_profile_name) || Boolean(errors.pod_profile_pod_selector_name) || Boolean(errors.config_passphrase) || Boolean(errors.apic_conn_pref) || Boolean(errors.ip_aging) || Boolean(errors.ignore_acked_faults) || Boolean(errors.use_infra_gipo) || Boolean(errors.coop_group_policy) || Boolean(errors.l2_port_mtu) || Boolean(errors.fabric_isis_redistribute_metric) || Boolean(errors.fabric_isis_bfd) || Boolean(errors.fabric_bgp_as);
  const hasFpBannersErrors = Boolean(errors.banners);
  const hasFpEpLoopProtectionErrors = Boolean(errors.ep_loop_protection);
  const hasFpRogueEpControlErrors = Boolean(errors.rogue_ep_control);
  const hasFpGlobalSettingsErrors = Boolean(errors.global_settings);
  const hasFpPortTrackingErrors = Boolean(errors.port_tracking);
  const hasFpPtpErrors = Boolean(errors.ptp);
  const hasFpDateTimeFormatErrors = Boolean(errors.date_time_format);
  const hasFpDnsPolicyErrors = Boolean(errors.dns_policies);
  const hasFpErrDisabledRecoveryErrors = Boolean(errors.err_disabled_recovery);
  const hasFpPodPoliciesErrors = Boolean(errors.pod_policies);
  const hasFpPodPolicyGroupsErrors = Boolean(errors.pod_policy_groups);
  const hasFpPodProfilesErrors = Boolean(errors.pod_profiles);
  const hasFpSwitchPoliciesErrors = Boolean(errors.switch_policies);
  const hasFpLeafSwitchPolicyGroupsErrors = Boolean(errors.leaf_switch_policy_groups);
  const hasFpSpineSwitchPolicyGroupsErrors = Boolean(errors.spine_switch_policy_groups);
  const hasFpLeafSwitchProfilesErrors = Boolean(errors.leaf_switch_profiles);
  const hasFpSpineSwitchProfilesErrors = Boolean(errors.spine_switch_profiles);
  const hasFpLeafInterfaceProfilesErrors = Boolean(errors.leaf_interface_profiles);
  const hasFpSpineInterfaceProfilesErrors = Boolean(errors.spine_interface_profiles);
  const hasFpExternalConnectivityPolicyErrors = Boolean(errors.external_connectivity_policy);
  const hasFpInfraDscpTranslationPolicyErrors = Boolean(errors.infra_dscp_translation_policy);
  const hasFpVmwareVmmDomainsErrors = Boolean(errors.vmware_vmm_domains);
  const hasFpAaaErrors = Boolean(errors.aaa);
  const hasFpGeolocationErrors = Boolean(errors.geolocation);
  const hasFpRemoteLocationsErrors = Boolean(errors.remote_locations);
  const hasFpSchedulersErrors = Boolean(errors.schedulers);
  const hasFpConfigExportsErrors = Boolean(errors.config_exports);
  const hasFpMonitoringErrors = Boolean(errors.monitoring);
  const hasFpSpanErrors = Boolean(errors.span);
  const hasFpSmartLicensingErrors = Boolean(errors.smart_licensing);
  const hasFpL2MtuPoliciesErrors = Boolean(errors.l2_mtu_policies);
  const hasFpSystemPerformanceErrors = Boolean(errors.system_performance);
  

  return (
    <div className="full-height-layout">
      <Container fluid>
        <Row>
          <Col md={3}>
            <div>
              <label>Load Fabric Policies Data:</label>
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
            <h3 className='mt-2'>Fabric Policies</h3>
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
                        <Tab eventKey="fabricpolicies" title={tabTitle('Fabric Policies', hasFabricPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <FabricPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'fabric_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpbanners" title={tabTitle('Banners', hasFpBannersErrors)}>
                          <Card>
                            <Card.Body>
                            <FpBanners control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'banners'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpeploopprotection" title={tabTitle('Ep Loop Protection', hasFpEpLoopProtectionErrors)}>
                          <Card>
                            <Card.Body>
                            <FpEpLoopProtection control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'ep_loop_protection'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fprogueepcontrol" title={tabTitle('Rogue Ep Control', hasFpRogueEpControlErrors)}>
                          <Card>
                            <Card.Body>
                            <FpRogueEpControl control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'rogue_ep_control'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpglobalsettings" title={tabTitle('Global Settings', hasFpGlobalSettingsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpGlobalSettings control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'global_settings'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpporttracking" title={tabTitle('Port Tracking', hasFpPortTrackingErrors)}>
                          <Card>
                            <Card.Body>
                            <FpPortTracking control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'port_tracking'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpptp" title={tabTitle('Ptp', hasFpPtpErrors)}>
                          <Card>
                            <Card.Body>
                            <FpPtp control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'ptp'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpdatetimeformat" title={tabTitle('Date Time Format', hasFpDateTimeFormatErrors)}>
                          <Card>
                            <Card.Body>
                            <FpDateTimeFormat control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'date_time_format'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpdnspolicy" title={tabTitle('Dns Policies', hasFpDnsPolicyErrors)}>
                          <Card>
                            <Card.Body>
                            <FpDnsPolicy control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'dns_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fperrdisabledrecovery" title={tabTitle('Err Disabled Recovery', hasFpErrDisabledRecoveryErrors)}>
                          <Card>
                            <Card.Body>
                            <FpErrDisabledRecovery control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'err_disabled_recovery'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fppodpolicies" title={tabTitle('Pod Policies', hasFpPodPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpPodPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'pod_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fppodpolicygroups" title={tabTitle('Pod Policy Groups', hasFpPodPolicyGroupsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpPodPolicyGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'pod_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fppodprofiles" title={tabTitle('Pod Profiles', hasFpPodProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpPodProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'pod_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpswitchpolicies" title={tabTitle('Switch Policies', hasFpSwitchPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSwitchPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'switch_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpleafswitchpolicygroups" title={tabTitle('Leaf Switch Policy Groups', hasFpLeafSwitchPolicyGroupsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpLeafSwitchPolicyGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_switch_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpspineswitchpolicygroups" title={tabTitle('Spine Switch Policy Groups', hasFpSpineSwitchPolicyGroupsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSpineSwitchPolicyGroups control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_switch_policy_groups'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpleafswitchprofiles" title={tabTitle('Leaf Switch Profiles', hasFpLeafSwitchProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpLeafSwitchProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_switch_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpspineswitchprofiles" title={tabTitle('Spine Switch Profiles', hasFpSpineSwitchProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSpineSwitchProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_switch_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpleafinterfaceprofiles" title={tabTitle('Leaf Interface Profiles', hasFpLeafInterfaceProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpLeafInterfaceProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'leaf_interface_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpspineinterfaceprofiles" title={tabTitle('Spine Interface Profiles', hasFpSpineInterfaceProfilesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSpineInterfaceProfiles control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'spine_interface_profiles'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpexternalconnectivitypolicy" title={tabTitle('External Connectivity Policy', hasFpExternalConnectivityPolicyErrors)}>
                          <Card>
                            <Card.Body>
                            <FpExternalConnectivityPolicy control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'external_connectivity_policy'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpinfradscptranslationpolicy" title={tabTitle('Infra Dscp Translation Policy', hasFpInfraDscpTranslationPolicyErrors)}>
                          <Card>
                            <Card.Body>
                            <FpInfraDscpTranslationPolicy control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'infra_dscp_translation_policy'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpvmwarevmmdomains" title={tabTitle('Vmware Vmm Domains', hasFpVmwareVmmDomainsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpVmwareVmmDomains control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'vmware_vmm_domains'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpaaa" title={tabTitle('Aaa', hasFpAaaErrors)}>
                          <Card>
                            <Card.Body>
                            <FpAaa control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'aaa'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpgeolocation" title={tabTitle('Geolocation', hasFpGeolocationErrors)}>
                          <Card>
                            <Card.Body>
                            <FpGeolocation control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'geolocation'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpremotelocations" title={tabTitle('Remote Locations', hasFpRemoteLocationsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpRemoteLocations control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'remote_locations'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpschedulers" title={tabTitle('Schedulers', hasFpSchedulersErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSchedulers control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'schedulers'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpconfigexports" title={tabTitle('Config Exports', hasFpConfigExportsErrors)}>
                          <Card>
                            <Card.Body>
                            <FpConfigExports control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'config_exports'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpmonitoring" title={tabTitle('Monitoring', hasFpMonitoringErrors)}>
                          <Card>
                            <Card.Body>
                            <FpMonitoring control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'monitoring'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpspan" title={tabTitle('Span', hasFpSpanErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSpan control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'span'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpsmartlicensing" title={tabTitle('Smart Licensing', hasFpSmartLicensingErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSmartLicensing control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'smart_licensing'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpl2mtupolicies" title={tabTitle('L2 Mtu Policies', hasFpL2MtuPoliciesErrors)}>
                          <Card>
                            <Card.Body>
                            <FpL2MtuPolicies control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'l2_mtu_policies'} getValues={getValues} setValue={setValue} watch={watch} />
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="fpsystemperformance" title={tabTitle('System Performance', hasFpSystemPerformanceErrors)}>
                          <Card>
                            <Card.Body>
                            <FpSystemPerformance control={control} register={register} errors={errors} clearErrors={clearErrors} setError={setError} name={'system_performance'} getValues={getValues} setValue={setValue} watch={watch} />
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

export default FabricPoliciesForm;
