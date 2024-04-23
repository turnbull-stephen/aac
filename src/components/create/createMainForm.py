from importlib.abc import FileLoader
import json
import os

from jinja2 import Environment, FileSystemLoader

with open("./apic/tenant.json", "r") as d:
    json_data = json.load(d)

#with open("ap.json", "r") as d:
#    json_data = json.load(d)
#json_data = json_data.items()    



def create_main_form(data):
    # Set up Jinja2 environment and load the template
    env = Environment(loader=FileSystemLoader('.'), autoescape=True, extensions=['jinja2.ext.loopcontrols'])
    template = env.get_template('mainForm.j2')

    # Iterate over the components in the JSON data

    counter = 0
    #for parent_component in data:
    for component_key, component_value in data.items():
        counter = 0
        name = component_key.replace('_', ' ').title()
        lists = []
        if isinstance(component_value, dict) and component_key:
            
            # Collect all list type properties under the component
            lists.append({'name': name, 'object': component_key, 'sublist': []})
            parent = {}
            sublist = []
            for sub_component_key, sub_component_value in component_value[component_key].items():

                
                sub_component_value.update({'key': sub_component_key})
                
                if isinstance(sub_component_value, dict) and "ref" in sub_component_value:
                    #lists[counter].update({'title': sub_component_value['title']})
                    lists[counter]['sublist'].append(sub_component_value)
                if isinstance(sub_component_value, dict) and "ref" not in sub_component_value:
                    parent.update({'title' : name, 'key': component_key, 'ref': component_key})
                    sublist.append(sub_component_value)

            if len(sublist):
                parent.update({component_key : sublist})
                if parent not in lists[counter]['sublist']:
                    lists[counter]['sublist'].insert(0, parent)       
        counter =+ 1
       
        print(json.dumps(lists, indent=2))
        rendered_component = template.render(
            lists=lists
        )
        #
        folder_name = name.replace(' ', '')
        folder_name = "./apic/"+folder_name
        name = name.replace('_', ' ').title().replace(' ', '')
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)
        # Write the rendered component to a file
        with open(f"{folder_name}/{name+'Form'}.jsx", 'w') as file:
            file.write(rendered_component)
            print(f"Generated {folder_name}/{name+'Form'}.jsx")
            
def resolve_references(data):
    def get_resolved_reference(ref_key):
        # Get the dictionary that the ref_key refers to in the data
        return data.get(ref_key, {})

    resolved_list = []

    # Iterate through the top-level components
    for component_key, component_value in data.items():
        if isinstance(component_value, dict):
            # Iterate through the sub-components of each component
            for sub_component_key, sub_component_value in component_value.items():
                component_dict = {component_key : {}}
                if isinstance(sub_component_value, dict):
                    # A dictionary to store the resolved references
                    resolved_dict = {}
                    sublist = []

                    # Iterate through the properties of the sub-component
                    for prop_key, prop_value in sub_component_value.items():
                        if isinstance(prop_value, dict) and "ref" in prop_value:
                            # Resolve the reference and add it to the sublist
                            ref_data = get_resolved_reference(prop_value["ref"])
                            ref_data['type'] = prop_value.get("type", ref_data.get('type', None))
                            ref_data['ref'] = prop_value.get("ref", ref_data.get('ref', None))
                            sublist.append({prop_key: ref_data})
                        else:
                            # Non-reference properties are added directly to the resolved dictionary
                            resolved_dict[prop_key] = prop_value

                    # If there's a sublist with resolved references, add it to the resolved dictionary
                    if sublist:
                        resolved_dict['sublist'] = sublist
                    
                    component_dict[component_key].update({sub_component_key: resolved_dict})
                    # Add the resolved dictionary to the resolved list
                   
                resolved_list.append(component_dict)
    return resolved_list


def rename_ref_keys(data):
    # Step 1: Create a mapping of refs to their new keys and types
    ref_mapping = {}
    for key, value in data.items():
        if isinstance(value, dict):
            for policy_name, policy in value.items():
                if isinstance(policy, dict):
                    for sub_policy_name, sub_policy in policy.items():
                        
                        if isinstance(sub_policy, dict) and 'ref' in sub_policy:

                            ref_key = sub_policy['ref']
                            ref_mapping[ref_key] = {
                                'new_key': ref_key,
                                'object_key': sub_policy_name,
                                'type': sub_policy.get('type'),
                                'schema_ref': key
                            }
                            
    # Step 2: Rename keys based on the mapping
    for ref_key, info in ref_mapping.items():
        for key, value in list(data.items()):  # Convert to list to avoid RuntimeError
            #print(ref_key)
            if ref_key in value:
                # Rename the key and preserve the type
                value[info['new_key']] = value.pop(ref_key)
                if 'object_key' in info and info['object_key']:
                    value[info['new_key']]['object_key'] = info['object_key']
                if 'type' in info and info['type']:
                    value[info['new_key']]['type'] = info['type']
                if 'schema_ref' in info and info['schema_ref']:
                    value[info['new_key']]['schema_ref'] = info['schema_ref']+'.'+ref_key

    return data

#def rename_ref_keys(data):
    # Step 1: Find all keys that have a "ref" pointing to another key
    for policy_name, policy in data.items():
        if isinstance(policy, dict): #and policy_name.endswith('_policies'):
            # Look for a key with a "ref" inside the nested dictionary
            nested_dict = policy.get(policy_name, {})
            for nested_key, nested_value in list(nested_dict.items()):
                if isinstance(nested_value, dict) and 'ref' in nested_value:
                    # We found a "ref", so let's rename the referenced key
                    ref_key = nested_value['ref']
                    type_value = nested_value['type']
                    if ref_key in policy:
                        # Rename the key in the policy to match the nested_key
                        policy[nested_key] = policy.pop(ref_key)
                        policy[nested_key].update({'type' : type_value})
    return data



def remove_entries_with_only_sublist(data_list):
    # Create a new list that will only include the items we want to keep
    new_data_list = []

    for item in data_list:
        # Each item is a dictionary; we expect it to have only one key-value pair
        for key, value in item.items():      
            for key1, value1 in value.items():
                # Check if the value is a dictionary and if it has more than the 'sublist' key
                if isinstance(value1, dict) and not (len(value1) == 1 and 'sublist' in value1):
                    # If it has more than the 'sublist' key or is not a dictionary, we keep the item
                    new_data_list.append(item)
                    break  # No need to check further keys, we are keeping this item
    
    return new_data_list

# Rename the keys
renamed_data = rename_ref_keys(json_data)
result = resolve_references(json_data)
data = remove_entries_with_only_sublist(result)
#print(result)
# Output the result
#print(json.dumps(renamed_data, indent=2))
#print(json.dumps(data, indent=2))

data_json = (json.dumps(data, indent=2))

with open("data.json", 'w') as file:
    file.write(data_json)
    
def custom_title_case(key):
    parts = key.split('_')
    new_parts = []
    for part in parts:
        # Only capitalize 'l1' or 'l2' if it is at the beginning
        if part.lower() in ['l1', 'l2', ] and new_parts:
            new_parts.append(part.lower())
        else:
            # Capitalize the first letter and add the rest unchanged
            new_parts.append(part.capitalize())
    return ''.join(new_parts)

prefixes = ["ap_", "ten_ser_", "ten_", "pp_"]

def remove_prefix(s, prefixes):
    for prefix in prefixes:
        if s.startswith(prefix):
            return s[len(prefix):]
    return s

def create_child_forms(json_data, data):
# Set up Jinja2 environment and load the template
    env = Environment(loader=FileSystemLoader('.'), autoescape=True, extensions=['jinja2.ext.loopcontrols', 'jinja2.ext.do'])
    template = env.get_template('childForm.j2')
    
    for object_data in data:
        for parent_key, parent_value in object_data.items():
            counter = 0
            folder_name = parent_key.replace('_', ' ').title().replace(' ', '')
            for component_key, component_value in parent_value.items():

                keys_list = list(parent_value.keys())
                key = keys_list[counter]

                #tab_title = remove_prefix(key, prefixes)
                key_name = custom_title_case(key)
                # Add schema ref to parent
                if parent_key == key:
                    component_value.update({'schema_ref': key+'.'+key})
                #component_value.update({'tab_title': tab_title})
                component_value.update({'title': key})
                
                if component_key == key:
                    rendered_component = template.render(data=component_value)
                    
                    folder_name = "./apic/"+folder_name
                    #print("folder name: "+folder_name)
                    if not os.path.exists(folder_name):
                        os.makedirs(folder_name)
                    # Write the rendered component to a file
                    with open(f"{folder_name}/{key_name}.jsx", 'w') as file:
                        file.write(rendered_component)
                        print(f"Generated {folder_name}/{key_name}.jsx")
                counter += 1

#create_main_form(json_data)           
create_child_forms(json_data, data)