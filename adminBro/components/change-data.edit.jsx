import React, { useState } from 'react'
import { Label, Box, TextArea, Section, Input, Icon, Button } from 'admin-bro'
import _ from 'lodash'

const Edit = ({ property, onChange, record }) => {
  const fields = _.pickBy(record.params, (val, key) => key.indexOf('data') !== -1)
  const [newSection, setNewSection] = useState('')

  const handleDataChange = (dataKey, dataValue) => {
      onChange(`${property.name}.${dataKey}`, dataValue)
  }

  const editors = Object.entries(fields).map(([key, value]) => {
      const cleanedKey = key.replace('data.', '')
      return (
        <Box marginBottom="xxl" key={cleanedKey}>
            <Label>{cleanedKey}</Label>
            <TextArea 
                onChange={(e) => {
                    e.preventDefault()
                    handleDataChange(cleanedKey, e.target.value)
                }}
                value={value}
            />
        </Box>
      )
  })
  return (
      <Section marginBottom="xxl">
        <Label>Данные</Label>
        {editors}
        <Section>
            <Label>Новый раздел</Label> 
            <Input 
              onChange={(e) => {setNewSection(e.target.value)}}
              value={newSection}
            />
            <Button
                mr="default"
                variant="text" 
                size="sm"
                onClick={(e) => {
                    e.preventDefault()
                    handleDataChange(newSection, '')
                }}
            >
                <Icon icon="Add" />
                Create new item
            </Button>
        </Section>
      </Section>
  )
}

export default Edit