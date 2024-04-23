import { Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';
import { faTrashCan, faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _, { get } from 'lodash'

const Header = (originalIndex, name, hasErrors, formData, duplicate, title, handleDelete) => {

  const nameValue = _.get(formData, `${name}.${originalIndex}.name`);
  const idValue = _.get(formData, `${name}.${originalIndex}.id`);
  const ipValue = _.get(formData, `${name}.${originalIndex}.ip`);
  const groupPrefixValue = _.get(formData, `${name}.${originalIndex}.group_prefix`);
  const prefixValue = _.get(formData, `${name}.${originalIndex}.prefix`);
  const channelValue = _.get(formData, `${name}.${originalIndex}.channel`);
  const nodeIdValue = _.get(formData, `${name}.${originalIndex}.node_id`);
  const node2IdValue = _.get(formData, `${name}.${originalIndex}.node2_id`);
  let moduleValue = _.get(formData, `${name}.${originalIndex}.module`); // Use 'let' here
  const portValue = _.get(formData, `${name}.${originalIndex}.port`)
  const dhcpRelayPolicyValue = _.get(formData, `${name}.${originalIndex}.dhcp_relay_policy`)
  const keyValue = _.get(formData, `${name}.${originalIndex}.key`)
  const valueValue = _.get(formData, `${name}.${originalIndex}.value`)
  const routeMapValue = _.get(formData, `${name}.${originalIndex}.route_map`)
  const filterValue = _.get(formData, `${name}.${originalIndex}.filter`)
  const communityValue = _.get(formData, `${name}.${originalIndex}.community`)
  const orderValue = _.get(formData, `${name}.${originalIndex}.order`)
  const priorityValue = _.get(formData, `${name}.${originalIndex}.priority`)
  const serviceGraphTemplate = _.get(formData, `${name}.${originalIndex}.service_graph_template`)

 // Filter and join first group with "-"
const firstGroup = [nodeIdValue, node2IdValue].filter(value => value || value === 0);
const firstResult = firstGroup.join('-');

// Determine if moduleValue should fallback to "1"
if (!moduleValue && (portValue || portValue === 0)) {
  moduleValue = '1'; // Fallback to "1" only if portValue is present and moduleValue is not
}

// Assemble the secondResult string
let secondResult = '';
if (moduleValue || moduleValue === 0) {
  secondResult += moduleValue;
}
if (portValue || portValue === 0) {
  secondResult += (secondResult ? '/' : '') + portValue;
}

// Combine both results with a space only if both are not empty
const result = (firstResult && secondResult) ? `${firstResult} ${secondResult}` : firstResult || secondResult;

  const displayValue = nameValue || idValue || channelValue || result || nodeIdValue || ipValue || groupPrefixValue || prefixValue || dhcpRelayPolicyValue || keyValue || valueValue || routeMapValue || filterValue || communityValue || orderValue || priorityValue || serviceGraphTemplate;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', zIndex: 100 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ position: 'relative', display: 'inline-block', zIndex: 100}}>
          <span className="circle">
            {originalIndex + 1}
          </span>
          {hasErrors &&
            <span style={{ position: 'absolute', top: -10, right: 6, zIndex: 100 }}>
              <Badge >
                <ErrorIcon color="error" />
              </Badge>
            </span>
          }
        </div>
        <span className='title'>
          {displayValue}
        </span>
      </div>
      <div>
        <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              Delete {_.get(formData, `${name}.${originalIndex}.name`)} {title}
            </Tooltip>
          }
        >
          <span
            className="text-danger pseudo-button"
            onClick={(e) => { e.stopPropagation(); handleDelete(originalIndex); }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="fa-lg" />
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              Duplicate {_.get(formData, `${name}.${originalIndex}.name`)} {title}
            </Tooltip>
          }
        >
          <span
            className="text-secondary pseudo-button"
            onClick={(e) => { e.stopPropagation(); duplicate(originalIndex); }}
          >
            <FontAwesomeIcon icon={faCopy} className="fa-lg" />
          </span>
        </OverlayTrigger>

      </div>
    </div>
  )
}
export default Header;