import React, {useMemo} from "react";
import DataListInput from "react-datalist-input";
import { v4 as uuidv4 } from 'uuid';
import classes from './DataInput.module.css'
 
const DataInput = (props) => {

  const onSelect = (selectedItem) => {
    if (props.setMainInputsId === 'share') {
      if (selectedItem.label.includes('/')) {
        let newSelectedItem = selectedItem.label.replace('/', ' к ')
        props.setLocalShareData(newSelectedItem)
      } else {
        props.setLocalShareData(selectedItem.label)
      }
    } 
    if (props.setMainInputsId === 'check') {
      props.setMainInputs(selectedItem.label)
    }
  };
  const items = useMemo(
    () =>
        props.streetSuggested.suggestions.map(oneItem => ({
            label: oneItem.value,
            key: uuidv4()
        })),
    [props.streetSuggested]
  );
  const match = (currentInput, item) => {
    let itemLabel = item.label.toLowerCase().replace(/[.,%]/g, ''),
    CIArr = currentInput.toLowerCase().replace(/[.,%]/g, '')
    if (currentInput.includes(' ')) {
      CIArr = CIArr.split(' ') || CIArr.split('/')
      itemLabel = itemLabel.split(' ') || itemLabel.split('/')
      return itemLabel[itemLabel.length-1].includes(CIArr[CIArr.length-1]);
    } else {
      return itemLabel.includes(currentInput.toLowerCase());
    }
  }
  let errorState = props.streetSuggested ? (
    <DataListInput
    dropDownLength={5}
    inputClassName={props.class}
    match={match}
    onInput={props.handleInputsInput}
    placeholder="ВВЕДИТЕ АДРЕС"
    items={items}
    onSelect={onSelect}
    itemClassName={classes.Item}
  />
  ) : <div>Извините, что-то пошло не так.</div>
  return errorState

};

export default DataInput;