import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApicForm from './components/apic/Apic/ApicForm';
import TenantForm from './components/apic/Tenant/TenantForm';
import AccessPoliciesForm from "./components/apic/AccessPolicies/AccessPoliciesForm"
import PodPoliciesForm from './components/apic/PodPolicies/PodPoliciesForm'
import NodePoliciesForm from './components/apic/NodePolicies/NodePoliciesForm'
import InterfacePoliciesForm from './components/apic/InterfacePolicies/InterfacePoliciesForm'
import FarbicPoliciesForm from "./components/apic/FabricPolicies/FabricPoliciesForm"

import NdoForm from './components/ndo/Ndo/NdoForm';
import SchemasForm from "./components/ndo/Schemas/SchemasForm"

const yaml = require('js-yaml');

const App = () => {

  //const schema = (aac_apic_schema['pod_policies']);
  //console.log(schema)


  return (
    <Router>
      <div className='full-height-layout'>
        <Navbar bg="dark" className="px-3" data-bs-theme="dark" expand="lg"> {/* Add padding for visual spacing */}
          {/* No Container here means the Navbar is fluid/full-width */}
          <Navbar.Brand as={Link} to="/">Data-Model Creator and Editor for AaC
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              {/* APIC Dropdown Menu */}
              <NavDropdown title="APIC" id="apic-dropdown">
                <NavDropdown.Item as={Link} to="/apic">
                  APIC - Apic
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tenant">
                  APIC - Tenant
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/access-policies">
                  APIC - Access Policies
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/pod-policies">
                  APIC - Pod Policies
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/node-policies">
                  APIC - Node Policies
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/interface-policies">
                  APIC - Interface Policies
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/farbic-policies">
                  APIC - Fabric Policies
                </NavDropdown.Item>
                {/* Add more sub-options here if needed */}
              </NavDropdown>
              <NavDropdown title="NDO" id="ndo-dropdown">
              <NavDropdown.Item as={Link} to="/ndo-ndo">
                  NDO - System
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ndo-schemas">
                  NDO - Schemas
                </NavDropdown.Item>

                {/* Add more sub-options here if needed */}
              </NavDropdown>
              {/* Add other Nav.Link or NavDropdown items here */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<div>Home Page Content</div>} />
             {/* Apic Route */}
             <Route path="/apic" element={<ApicForm />} />
            {/* Tenant Route */}
            <Route path="/tenant" element={<TenantForm />} />
            {/* Access Policies Route */}
            <Route path="/access-policies" element={<AccessPoliciesForm />}/>
            {/* Pod Policies Route */}
            <Route path="/pod-policies" element={<PodPoliciesForm />} />
            {/* Pod Policies Route */}
            <Route path="/node-policies" element={<NodePoliciesForm />} />
            {/* Pod Policies Route */}
            <Route path="/interface-policies" element={<InterfacePoliciesForm />} />
            {/* Pod Policies Route */}
            <Route path="/farbic-policies" element={<FarbicPoliciesForm />} />
            {/* NDO System Route */}
            <Route path="/ndo-ndo" element={<NdoForm />} />
            {/* NDO Schemas Route */}
            <Route path="/ndo-schemas" element={<SchemasForm />} />
            {/* Access Policies Route */}

          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;