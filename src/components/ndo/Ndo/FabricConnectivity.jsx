import React, { useState } from 'react';
import { Tabs, Tab, Card, Form } from 'react-bootstrap';
import _, { get } from 'lodash'
import Badge from '@mui/material/Badge';
import ErrorIcon from '@mui/icons-material/Error';

import ObjectFunctions from '../ObjectFunctions'
import schema from '../../../schemas/aac_ndo_schema.json'

import FcBgp from './FcBgp'
const  FabricConnectivity = ({ control, register, errors, name, getValues, setValue, watch, setError, clearErrors }) => {

  
  
  return (
    <div>
      
          <FcBgp
              control={control}
              name={`${name}.bgp`}
              register={register}
              errors={errors}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />

    </div>
  )
}

export default FabricConnectivity;

