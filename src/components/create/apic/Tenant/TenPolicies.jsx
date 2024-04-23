import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_apic_schema.json'

import TenOspfInterfacePolicies from './TenOspfInterfacePolicies'
import TenEigrpInterfacePolicies from './TenEigrpInterfacePolicies'
import TenOspfTimerPolicies from './TenOspfTimerPolicies'
import TenBgpTimerPolicy from './TenBgpTimerPolicy'
import TenBgpPeerPrefixPolicies from './TenBgpPeerPrefixPolicies'
import TenBgpBestPathPolicy from './TenBgpBestPathPolicy'
import TenBgpAddressFamilyContextPolicy from './TenBgpAddressFamilyContextPolicy'
import TenDhcpRelayPolicy from './TenDhcpRelayPolicy'
import TenDhcpOptionPolicy from './TenDhcpOptionPolicy'
import TenRouteTagPolicies from './TenRouteTagPolicies'
import TenRouteControlRouteMaps from './TenRouteControlRouteMaps'
import TenMatchRule from './TenMatchRule'
import TenSetRule from './TenSetRule'
import TenBfdInterfacePolicies from './TenBfdInterfacePolicies'
import TenMulticastRouteMaps from './TenMulticastRouteMaps'
import TenPimPolicies from './TenPimPolicies'
import TenIgmpSnoopingPolicies from './TenIgmpSnoopingPolicies'
import TenIgmpInterfacePolicies from './TenIgmpInterfacePolicies'
import TenIpSlaPolicies from './TenIpSlaPolicies'
import TenTrustControlPolicies from './TenTrustControlPolicies'
import TenSpan from './TenSpan'
import TenQos from './TenQos'
import TenMplsCustomQosPolicies from './TenMplsCustomQosPolicies'
import TenBfdMultihopNodePolicies from './TenBfdMultihopNodePolicies'
import TenNdInterfacePolicies from './TenNdInterfacePolicies'
import TenNdRaPrefixPolicies from './TenNdRaPrefixPolicies'


const  TenPolicies = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors, formData }) => {
  const [key, setKey] = useState('tenospfinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('teneigrpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospftimerpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgptimerpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgppeerprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpbestpathpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpaddressfamilycontextpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcprelaypolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcpoptionpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutetagpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutecontrolroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmatchrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tensetrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmulticastroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenpimpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpsnoopingpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenipslapolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tentrustcontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspan'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenqos'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmplscustomqospolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdmultihopnodepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndraprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospfinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('teneigrpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospftimerpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgptimerpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgppeerprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpbestpathpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpaddressfamilycontextpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcprelaypolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcpoptionpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutetagpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutecontrolroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmatchrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tensetrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmulticastroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenpimpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpsnoopingpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenipslapolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tentrustcontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspan'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenqos'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmplscustomqospolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdmultihopnodepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndraprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospfinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('teneigrpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospftimerpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgptimerpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgppeerprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpbestpathpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpaddressfamilycontextpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcprelaypolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcpoptionpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutetagpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutecontrolroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmatchrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tensetrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmulticastroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenpimpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpsnoopingpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenipslapolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tentrustcontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspan'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenqos'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmplscustomqospolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdmultihopnodepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndraprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospfinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('teneigrpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospftimerpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgptimerpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgppeerprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpbestpathpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpaddressfamilycontextpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcprelaypolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcpoptionpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutetagpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutecontrolroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmatchrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tensetrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmulticastroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenpimpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpsnoopingpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenipslapolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tentrustcontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspan'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenqos'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmplscustomqospolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdmultihopnodepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndraprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospfinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('teneigrpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenospftimerpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgptimerpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgppeerprefixpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpbestpathpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbgpaddressfamilycontextpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcprelaypolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tendhcpoptionpolicy'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutetagpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenroutecontrolroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmatchrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tensetrule'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmulticastroutemaps'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenpimpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpsnoopingpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenigmpinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenipslapolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tentrustcontrolpolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenspan'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenqos'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenmplscustomqospolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenbfdmultihopnodepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndinterfacepolicies'); // Keep state for the Tab selectionconst [key, setKey] = useState('tenndraprefixpolicies'); // Keep state for the Tab selection  
  const tabTitle = (title, hasErrors, errorCount) => (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {title}
      {hasErrors &&
        <span style={{ position: 'absolute', top: -10, right: -22, zIndex: 1000 }}>
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
  };const hasTenOspfInterfacePoliciesErrors = Boolean(errors && errors[name] && errors[name].ospf_interface_policies);
  const hasTenEigrpInterfacePoliciesErrors = Boolean(errors && errors[name] && errors[name].eigrp_interface_policies);
  const hasTenOspfTimerPoliciesErrors = Boolean(errors && errors[name] && errors[name].ospf_timer_policies);
  const hasTenBgpTimerPolicyErrors = Boolean(errors && errors[name] && errors[name].bgp_timer_policies);
  const hasTenBgpPeerPrefixPoliciesErrors = Boolean(errors && errors[name] && errors[name].bgp_peer_prefix_policies);
  const hasTenBgpBestPathPolicyErrors = Boolean(errors && errors[name] && errors[name].bgp_best_path_policies);
  const hasTenBgpAddressFamilyContextPolicyErrors = Boolean(errors && errors[name] && errors[name].bgp_address_family_context_policies);
  const hasTenDhcpRelayPolicyErrors = Boolean(errors && errors[name] && errors[name].dhcp_relay_policies);
  const hasTenDhcpOptionPolicyErrors = Boolean(errors && errors[name] && errors[name].dhcp_option_policies);
  const hasTenRouteTagPoliciesErrors = Boolean(errors && errors[name] && errors[name].route_tag_policies);
  const hasTenRouteControlRouteMapsErrors = Boolean(errors && errors[name] && errors[name].route_control_route_maps);
  const hasTenMatchRuleErrors = Boolean(errors && errors[name] && errors[name].match_rules);
  const hasTenSetRuleErrors = Boolean(errors && errors[name] && errors[name].set_rules);
  const hasTenBfdInterfacePoliciesErrors = Boolean(errors && errors[name] && errors[name].bfd_interface_policies);
  const hasTenMulticastRouteMapsErrors = Boolean(errors && errors[name] && errors[name].multicast_route_maps);
  const hasTenPimPoliciesErrors = Boolean(errors && errors[name] && errors[name].pim_policies);
  const hasTenIgmpSnoopingPoliciesErrors = Boolean(errors && errors[name] && errors[name].igmp_snooping_policies);
  const hasTenIgmpInterfacePoliciesErrors = Boolean(errors && errors[name] && errors[name].igmp_interface_policies);
  const hasTenIpSlaPoliciesErrors = Boolean(errors && errors[name] && errors[name].ip_sla_policies);
  const hasTenTrustControlPoliciesErrors = Boolean(errors && errors[name] && errors[name].trust_control_policies);
  const hasTenSpanErrors = Boolean(errors && errors[name] && errors[name].span);
  const hasTenQosErrors = Boolean(errors && errors[name] && errors[name].qos);
  const hasTenMplsCustomQosPoliciesErrors = Boolean(errors && errors[name] && errors[name].mpls_custom_qos_policies);
  const hasTenBfdMultihopNodePoliciesErrors = Boolean(errors && errors[name] && errors[name].bfd_multihop_node_policies);
  const hasTenNdInterfacePoliciesErrors = Boolean(errors && errors[name] && errors[name].nd_interface_policies);
  const hasTenNdRaPrefixPoliciesErrors = Boolean(errors && errors[name] && errors[name].nd_ra_prefix_policies);
  
  
  
  
  
  return (
    <div>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 tabs-title`} >
        <Tab eventKey="tenospfinterfacepolicies" title={tabTitle('Ospf Interface Policies', hasTenOspfInterfacePoliciesErrors)}> 
          <TenOspfInterfacePolicies
              control={control}
              name={`${name}.ospf_interface_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="teneigrpinterfacepolicies" title={tabTitle('Eigrp Interface Policies', hasTenEigrpInterfacePoliciesErrors)}> 
          <TenEigrpInterfacePolicies
              control={control}
              name={`${name}.eigrp_interface_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenospftimerpolicies" title={tabTitle('Ospf Timer Policies', hasTenOspfTimerPoliciesErrors)}> 
          <TenOspfTimerPolicies
              control={control}
              name={`${name}.ospf_timer_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenbgptimerpolicy" title={tabTitle('Bgp Timer Policies', hasTenBgpTimerPolicyErrors)}> 
          <TenBgpTimerPolicy
              control={control}
              name={`${name}.bgp_timer_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenbgppeerprefixpolicies" title={tabTitle('Bgp Peer Prefix Policies', hasTenBgpPeerPrefixPoliciesErrors)}> 
          <TenBgpPeerPrefixPolicies
              control={control}
              name={`${name}.bgp_peer_prefix_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenbgpbestpathpolicy" title={tabTitle('Bgp Best Path Policies', hasTenBgpBestPathPolicyErrors)}> 
          <TenBgpBestPathPolicy
              control={control}
              name={`${name}.bgp_best_path_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenbgpaddressfamilycontextpolicy" title={tabTitle('Bgp Address Family Context Policies', hasTenBgpAddressFamilyContextPolicyErrors)}> 
          <TenBgpAddressFamilyContextPolicy
              control={control}
              name={`${name}.bgp_address_family_context_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tendhcprelaypolicy" title={tabTitle('Dhcp Relay Policies', hasTenDhcpRelayPolicyErrors)}> 
          <TenDhcpRelayPolicy
              control={control}
              name={`${name}.dhcp_relay_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tendhcpoptionpolicy" title={tabTitle('Dhcp Option Policies', hasTenDhcpOptionPolicyErrors)}> 
          <TenDhcpOptionPolicy
              control={control}
              name={`${name}.dhcp_option_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenroutetagpolicies" title={tabTitle('Route Tag Policies', hasTenRouteTagPoliciesErrors)}> 
          <TenRouteTagPolicies
              control={control}
              name={`${name}.route_tag_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenroutecontrolroutemaps" title={tabTitle('Route Control Route Maps', hasTenRouteControlRouteMapsErrors)}> 
          <TenRouteControlRouteMaps
              control={control}
              name={`${name}.route_control_route_maps`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenmatchrule" title={tabTitle('Match Rules', hasTenMatchRuleErrors)}> 
          <TenMatchRule
              control={control}
              name={`${name}.match_rules`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tensetrule" title={tabTitle('Set Rules', hasTenSetRuleErrors)}> 
          <TenSetRule
              control={control}
              name={`${name}.set_rules`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenbfdinterfacepolicies" title={tabTitle('Bfd Interface Policies', hasTenBfdInterfacePoliciesErrors)}> 
          <TenBfdInterfacePolicies
              control={control}
              name={`${name}.bfd_interface_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenmulticastroutemaps" title={tabTitle('Multicast Route Maps', hasTenMulticastRouteMapsErrors)}> 
          <TenMulticastRouteMaps
              control={control}
              name={`${name}.multicast_route_maps`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenpimpolicies" title={tabTitle('Pim Policies', hasTenPimPoliciesErrors)}> 
          <TenPimPolicies
              control={control}
              name={`${name}.pim_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenigmpsnoopingpolicies" title={tabTitle('Igmp Snooping Policies', hasTenIgmpSnoopingPoliciesErrors)}> 
          <TenIgmpSnoopingPolicies
              control={control}
              name={`${name}.igmp_snooping_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenigmpinterfacepolicies" title={tabTitle('Igmp Interface Policies', hasTenIgmpInterfacePoliciesErrors)}> 
          <TenIgmpInterfacePolicies
              control={control}
              name={`${name}.igmp_interface_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenipslapolicies" title={tabTitle('Ip Sla Policies', hasTenIpSlaPoliciesErrors)}> 
          <TenIpSlaPolicies
              control={control}
              name={`${name}.ip_sla_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tentrustcontrolpolicies" title={tabTitle('Trust Control Policies', hasTenTrustControlPoliciesErrors)}> 
          <TenTrustControlPolicies
              control={control}
              name={`${name}.trust_control_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenspan" title={tabTitle('Span', hasTenSpanErrors)}> 
          <TenSpan
              control={control}
              name={`${name}.span`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenqos" title={tabTitle('Qos', hasTenQosErrors)}> 
          <TenQos
              control={control}
              name={`${name}.qos`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenmplscustomqospolicies" title={tabTitle('Mpls Custom Qos Policies', hasTenMplsCustomQosPoliciesErrors)}> 
          <TenMplsCustomQosPolicies
              control={control}
              name={`${name}.mpls_custom_qos_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenbfdmultihopnodepolicies" title={tabTitle('Bfd Multihop Node Policies', hasTenBfdMultihopNodePoliciesErrors)}> 
          <TenBfdMultihopNodePolicies
              control={control}
              name={`${name}.bfd_multihop_node_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenndinterfacepolicies" title={tabTitle('Nd Interface Policies', hasTenNdInterfacePoliciesErrors)}> 
          <TenNdInterfacePolicies
              control={control}
              name={`${name}.nd_interface_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab><Tab eventKey="tenndraprefixpolicies" title={tabTitle('Nd Ra Prefix Policies', hasTenNdRaPrefixPoliciesErrors)}> 
          <TenNdRaPrefixPolicies
              control={control}
              name={`${name}.nd_ra_prefix_policies`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
              formData={formData}
            />
        </Tab>
      </Tabs>
    </div>
  )
}

export default TenPolicies;

