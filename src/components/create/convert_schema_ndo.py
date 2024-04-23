import yaml
import json

with open('./ndo/ndo_schema.yaml', 'r') as file:
    # Create a generator for the documents
    aac_ndo_schema = yaml.safe_load(file)
    
    ## Skip the first document and take the second one
    #if documents:
    #    next(documents, None)  # Skip the first document
    #    aac_schema = next(documents, None)
    #else:
    #    aac_schema = 


ndo_parents = ["ndo", "schemas"]

def add_to_parents(schema_name):
    object_name = schema_name.split('_')[0]

    if object_name == 'schemas' or schema_name == "schemas":
        return 'schemas'
    if object_name == 't' or schema_name == "schemas_templates":
        return 'schemas'
    else:
        return 'ndo'

new_schema = {}  # Ensure new_schema is initialized

for parent in ndo_parents:
    new_schema.update({parent : {}})

for schema_name, attributes in aac_ndo_schema.items():
        parent = add_to_parents(schema_name)
        new_schema[parent].update({'name' : parent.replace("_", " ").title()})
        new_schema[parent].update({schema_name: {}})
        
        #if parent == schema_name:
        
        #new_schema[parent]
        for attribute_name, validation_rule in attributes.items():
            #new_schema[parent][schema_name][attribute_name] = attribute_name
            #print(schema_name, attribute_name, validation_rule)
            if validation_rule.split('(')[0] ==  "regex":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "string"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Split the string by single quotes
                parts = validation_rule.split("'")
                # The second element in the list will be the string between the single quotes
                pattern = parts[1]

                start_index = validation_rule.find(']{') + 2
                end_index = validation_rule.rfind('}')
                # Extract the contents inside the parentheses
                pattern_lenth_contents = validation_rule[start_index:end_index]

                if 'egex' not in pattern_lenth_contents:
                    new_schema[parent][schema_name][attribute_name]['minLength'] = int(pattern_lenth_contents.split(',')[0])
                    new_schema[parent][schema_name][attribute_name]['maxLength'] = int(pattern_lenth_contents.split(',')[1])

                new_schema[parent][schema_name][attribute_name]['pattern'] = pattern.replace('^[a-zA-Z0-9_.:-]{1,64}$', '^[a-zA-Z0-9_.:-]+$').replace('^[a-zA-Z0-9\\\\\\\\!#$%()*,-./:;@ _{|}~?&+]{1,128}$', '^[a-zA-Z0-9!#$%()*,-./:;@ _{|}~?&+]+$').replace('^[a-zA-Z0-9\\\\\\\\!#$%()*,-./:;@ _{|}~?&+]{1,128}$', '^[a-zA-Z0-9!#$%()*,-./:;@ _{|}~?&+]+$').replace("^[a-zA-Z0-9\\\\\\\\!#$%()*,-./:;@ _{|}~?&+]{1,64}$", '^[a-zA-Z0-9_.:-]+$')
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "any" and validation_rule.split('(')[1] == "bool" in validation_rule:
                new_schema[parent][schema_name][attribute_name] = ({"type" : "select-bool"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                new_schema[parent][schema_name][attribute_name].update({"enum": ['enabled', 'disabled']})
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "enum":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "select"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Find the opening and closing parentheses that enclose the enum values
                start_index = validation_rule.find('(') + 1
                end_index = validation_rule.rfind(')')
                # Extract the contents inside the parentheses
                enum_contents = validation_rule[start_index:end_index]

                # Split the enum_contents by comma to get the individual values
                enum_values_list = [value.strip().strip("'") for value in enum_contents.split(", ")[:-1]]
                new_schema[parent][schema_name][attribute_name].update({"enum": enum_values_list})
                # The last value might be the required flag so check if it starts with 'required='
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "ip":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "ip"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "bool":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "bool"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] ==  "include":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "object"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Split the string by single quotes
                parts = validation_rule.split("'")
                # The second element in the list will be the string between the single quotes
                ref = parts[1]
                new_schema[parent][schema_name][attribute_name]['ref'] = ref
                # Check if there's a required flag part
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] ==  "list" and validation_rule.split('(')[1] ==  "include":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "list"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Split the string by single quotes
                parts = validation_rule.split("'")
                # The second element in the list will be the string between the single quotes
                ref = parts[1]
                new_schema[parent][schema_name][attribute_name]['ref'] = ref
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] ==  "list" and validation_rule.split('(')[1] ==  "regex":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "list-string"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Split the string by single quotes
                parts = validation_rule.split("'")
                # The second element in the list will be the string between the single quotes
                pattern = parts[1]
                start_index = validation_rule.find(']{') + 2
                end_index = validation_rule.rfind('}')
                # Extract the contents inside the parentheses
                pattern_lenth_contents = validation_rule[start_index:end_index]

                new_schema[parent][schema_name][attribute_name]['minLength'] = int(pattern_lenth_contents.split(',')[0])
                new_schema[parent][schema_name][attribute_name]['maxLength'] = int(pattern_lenth_contents.split(',')[1])

                new_schema[parent][schema_name][attribute_name]['pattern'] = pattern.replace('^[a-zA-Z0-9_.:-]{1,64}$', '^[a-zA-Z0-9_.:-]+$').replace('^[a-zA-Z0-9\\\\\\\\!#$%()*,-./:;@ _{|}~?&+]{1,128}$', '^[a-zA-Z0-9!#$%()*,-./:;@ _{|}~?&+]+$').replace('^[a-zA-Z0-9\\\\\\\\!#$%()*,-./:;@ _{|}~?&+]{1,128}$', '^[a-zA-Z0-9!#$%()*,-./:;@ _{|}~?&+]+$').replace("^[a-zA-Z0-9\\\\\\\\!#$%()*,-./:;@ _{|}~?&+]{1,64}$", '^[a-zA-Z0-9_.:-]+$')

                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "int":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "int"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Find the opening and closing parentheses that enclose the enum values
                start_index = validation_rule.find('(') + 1
                end_index = validation_rule.rfind(')')
                # Extract the contents inside the parentheses
                int_contents = validation_rule[start_index:end_index].split(', ')
                if int_contents[0] != 'required=False' and int_contents[0] != '':
                    new_schema[parent][schema_name][attribute_name]['minimum'] = int(int_contents[0].replace('min=', ''))
                    #print(int_contents)
                    if len(int_contents) == 0 and int_contents[1] != 'required=False':
                        new_schema[parent][schema_name][attribute_name]['maximum'] = int(int_contents[1].replace('max=', ''))
                    if len(int_contents) > 1 and int_contents[1] != 'required=False':
                        new_schema[parent][schema_name][attribute_name]['maximum'] = int(int_contents[1].replace('max=', ''))
                    else:
                        new_schema[parent][schema_name][attribute_name]['minimum'] = int(int_contents[0].replace('min=', ''))

                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "mac":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "mac"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                new_schema[parent][schema_name][attribute_name]['pattern'] = "^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$"
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

            if validation_rule.split('(')[0] == "str":
                new_schema[parent][schema_name][attribute_name] = ({"type" : "string"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                # Find the opening and closing parentheses that enclose the enum values
                start_index = validation_rule.find('(') + 1
                end_index = validation_rule.rfind(')')
                # Extract the contents inside the parentheses
                str_contents = validation_rule[start_index:end_index].split(', ')
                if str_contents[0] != 'required=False' and str_contents[0] != '':

                    new_schema[parent][schema_name][attribute_name]['minLength'] = int(str_contents[0].replace('min=', ''))
                    new_schema[parent][schema_name][attribute_name]['maxLength'] = int(str_contents[1].replace('max=', ''))
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required


            if validation_rule.split('(')[0] == "any" and validation_rule.split('(')[1] == "int" in validation_rule:
                new_schema[parent][schema_name][attribute_name] = ({"type" : "oneOf"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                start_index = validation_rule.find('(') + 1
                end_index = validation_rule.rfind(')')

                contents = validation_rule[start_index:end_index]

                int_start_index = contents.find('(') + 1
                int_end_index = contents.rfind(')')
                contents = contents[int_start_index:int_end_index]
                #print(contents)
                int_contents = contents.split('), enum(')[0].split(',')
                new_schema[parent][schema_name][attribute_name].update({'oneOf': []})
                int_oneOf_dict = {'type': 'int'}
                int_oneOf_dict['minimum'] = int(int_contents[0].replace('min=', ''))
                
                if 'max=' in int_contents[1]:
                    int_oneOf_dict['maximum'] = int(int_contents[1].replace('max=', '').replace(')', '').strip())
                new_schema[parent][schema_name][attribute_name]['oneOf'].append(int_oneOf_dict)

                enum_oneOf_dict = {'type': 'enum'}
                try:
                    enum_oneOf = contents.split('), enum(')[1]
                except: 
                    IndexError

                enum_list = [option.strip().strip("'") for option in enum_oneOf.split(", ")]
                #print(enum_list)
                #print(list(enum_list.split(", ")))
                enum_oneOf_dict['enum'] = enum_list

                new_schema[parent][schema_name][attribute_name]['oneOf'].append(enum_oneOf_dict)
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required
            if validation_rule.split('(')[0] == "any" and validation_rule.split('(')[1] == "enum" in validation_rule:
                new_schema[parent][schema_name][attribute_name] = ({"type" : "oneOf"})
                new_schema[parent][schema_name][attribute_name]['title'] = attribute_name.replace("_", " ").title()
                start_index = validation_rule.find('(') + 1
                end_index = validation_rule.rfind(')')

                contents = validation_rule[start_index:end_index]
                int_start_index = contents.find('(') + 1
                int_end_index = contents.rfind(')')
                contents = contents[int_start_index:int_end_index]

                new_schema[parent][schema_name][attribute_name].update({'oneOf': []})
                if 'min=' in contents:
                    int_contents = contents.split('), int(')[1].split(',')
                int_oneOf_dict = {'type': 'int'}
                int_oneOf_dict['minimum'] = int(int_contents[0].replace('min=', ''))

                if 'max=' in int_contents[1]:
                    int_oneOf_dict['maximum'] = int(int_contents[1].replace('max=', '').replace(')', '').strip())
                
                new_schema[parent][schema_name][attribute_name]['oneOf'].append(int_oneOf_dict)

                enum_oneOf_dict = {'type': 'enum'}
                
                enum_start_index = contents.find('any(enum(') + 1
                enum_end_index = contents.rfind(')')
                enum_contents = contents[enum_start_index:enum_end_index]
                
                enum_list = [option.strip().strip("'") for option in enum_contents.split(", ")]

                enum_oneOf_dict['enum'] = enum_list
                new_schema[parent][schema_name][attribute_name]['oneOf'].append(enum_oneOf_dict)
                if "required=False" in validation_rule:
                    required = False
                    new_schema[parent][schema_name][attribute_name]["required"] = required
                else:
                    required = True
                    new_schema[parent][schema_name][attribute_name]["required"] = required

# Ot    her types of validation rules can be added here with additional conditions

# Print or return the new schema as needed
#print(new_schema)
    
#print(json.dumps(new_schema, indent=2))
#print(yaml.dump(new_schema))

customized = {}
for schema_name, attributes in new_schema.items():
    
    if isinstance(attributes, dict):
        customized.update({schema_name : {}})
        for object_name, object_attributes in attributes.items():
            customized[schema_name].update({object_name : {}})
            if isinstance(object_attributes, dict):
                updated_attributes = {}
                for attribute_name, attribute_item in object_attributes.items():
                    updated_attributes.update({attribute_name : {}})
                    if attribute_item.get('type') == 'ip':
                        updated_attributes.update({attribute_name : ({"type" : "ip, cidr"})})
                if updated_attributes:
                    customized[schema_name].update({object_name : updated_attributes})

#print(json.dumps(customized, indent=2))

with open(r'./apic/aac_ndo_custom_template_schema.json', 'w') as file:
    documents = json.dump(customized, file, indent=2)
    
with open(r'./ndo/aac_ndo_schema_additions.yaml', 'w') as file:
    documents = yaml.dump(new_schema, file)
    

with open('./ndo/aac_ndo_schema_additions.yaml', 'r') as file:
    # Create a generator for the documents
    aac_apic_customized = yaml.safe_load(file)

def merge(schema_name, object_name, attribute_name):
    #try:
        for custom_schema_name, custom_attributes in aac_apic_customized[schema_name].items():
            if custom_schema_name == object_name:
                if isinstance(custom_attributes, dict):
                    for update_attribute_name, updated_attribute_value in custom_attributes.items():
                        return custom_attributes

    #except:
    #    KeyError



for schema_name, attributes in new_schema.items():
    if isinstance(attributes, dict):
        for object_name, object_attributes in attributes.items():
            if isinstance(object_attributes, dict):
                for attribute_name, attribute_item in object_attributes.items():
                    updated_object_attribute = merge(schema_name, object_name, attribute_name)
                    if updated_object_attribute:
                        for attribute, attribute_value in updated_object_attribute.items():
                            
                            object_attributes[attribute].update(attribute_value)
                        
                        

with open(r'./ndo/aac_ndo_schema.yaml', 'w') as file:
    documents = yaml.dump(new_schema, file)
#    
with open(r'./ndo/aac_ndo_schema.json', 'w') as file:
    documents = json.dump(new_schema, file, indent=2)
#
#
#for schema_name, attributes in new_schema.items():
#    with open('./ndo/'+schema_name + '.json', 'w') as file:
#        documents = json.dump({schema_name : attributes}, file, indent=2)
