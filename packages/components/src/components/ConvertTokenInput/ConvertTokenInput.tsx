import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Button,
  InputProps,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Web3 from 'web3';

export interface ConvertTokenInputProps {
  /**
   * The value to be converted
   */
  value: string;
}

// A number input component with built-in conversion feature from wei <-> ether
export const ConvertTokenInput: React.FC<ConvertTokenInputProps & InputProps> = ({
  value,
  ...props
}) => {
  const [currentUnit, setCurrentUnit] = useState('ether');
  const [targetUnit, setTargetUnit] = useState('wei');
  const [val, setVal] = useState(value);

  // The convert() function converts the current value into the unit selected by the user
  const convert = () => {
    if (targetUnit === 'wei') {
      setCurrentUnit('wei');
      setTargetUnit('ether');
      setVal(Web3.utils.toWei(val));
    } else if (targetUnit === 'ether') {
      setCurrentUnit('ether');
      setTargetUnit('wei');
      setVal(Web3.utils.fromWei(val));
    }
  };

  return (
    <InputGroup>
      <InputLeftAddon children={currentUnit} />
      <Input
        placeholder='Enter value'
        value={val}
        onChange={(e) => setVal(e.target.value)}
        {...props}
      />
      <InputRightElement width='5rem'>
        <Button h='1.75rem' size='sm' onClick={convert}>
          To {targetUnit}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};