import React from 'react';
import classes from './Form.module.css'
import DataInput from '../../DataInput/DataInput'
import Spinner from '../../Spinner/Spinner'

const form = (props) => {
    let radioButtons = Object.keys(props.radioButtonsObj)
    let commentArea = props.commentAreaProp ? <textarea 
    onChange={props.handleInputsText} 
    className={classes.ShareFormComment} placeholder="ОСТАВЬТЕ КОММЕНТАРИЙ" />
    : null;

    let [init, inputWarning, radioWarning, both] = [<p>Начните вводить адрес и выберите нужный из списка ниже:</p>,
    <p className={classes.Warning}>Пожалуйста, выберите полный адрес из списка.</p>,
    <p className={classes.Warning}>Пожалуйста поставьте оценку. </p>,
    <p className={classes.Warning}>Пожалуйста, выберите полный адрес из списка и выберите оценку.</p>]
    
    let [inputNoWarningClass, inputWarningClass] = [classes.ShareFormSearch, classes.ShareFormWarning]
    let [message, inputClass] = 
      (props.validRadio === undefined || props.validRadio !== false) && (props.validValue === 'init' || props.validValue === true) ? [init, inputNoWarningClass]
    : props.validRadio !== false && props.validValue === false ? [inputWarning, inputWarningClass]
    : props.validRadio === false && props.validValue === true ? [radioWarning, inputNoWarningClass]
    : !props.validValue && !props.validRadio ? [both, inputWarningClass]
    : [init, inputNoWarningClass]


    let dataInputArea = props.streetSuggestions !== null ? (
        <form onKeyPress={props.preventSubmit} className={classes.ShareFormContainer}>
        {message}
        <div className={classes.ShareFormInput}>
        <DataInput
        handleInputsInput={props.handleInputsInput} 
        streetSuggested={props.streetSuggestions}
        setMainInputsId='share'
        class={inputClass}
        setLocalShareData={props.setLocalShareData}
        />
        </div>
        <div className={classes.ShareFormRadiobuttons}>
            <div className={classes.RadioButtonsWidth}>
            <p>Выберите оценку:</p>
            {radioButtons.map((i, index) => {
                return (<p key={i+index}>
                    <input name="evaluate" type="radio" value={i} id={"mark" + index} onChange={props.handleInputsRadio}/>
                    <label for={"mark" + index}>{index+1}</label>
                    </p>)
            })}
            </div>
            </div>
            <h3 onClick={props.switchComment} className={classes.LeaveAComment}>{props.commentHeader}</h3>
            {commentArea}
            <input onClick={props.handleSubmit} className={classes.ShareFormSubmit} type="button" value="ОТПРАВИТЬ" />
        </form>
    ) : <div className={classes.ShareFormContainer}><Spinner /></div>
    
    return dataInputArea;
}
export default form;