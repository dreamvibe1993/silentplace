import React, {Component} from 'react';
import classes from './CheckForm.module.css'
import DataInput from '../DataInput/DataInput'
import Spinner from '../Spinner/Spinner'
import { v4 as uuidv4 } from 'uuid';


class CheckForm extends Component {
    state={
        checkVisibility: false,
        checkData: 'К сожалению, по вашему запросу ничего не найдено. Но вы можете быть первым! Оставьте ваш отзыв ниже :)',
        averageNumber: 0
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({checkVisibility: true})

        let alternative = this.props.response.suggestions.filter((i, index) => {
            return i.value === this.props.inputValue
        })
        this.setState({checkData: alternative})
        let averageCollection = alternative.map(i => +i.mark.match(/\d+/)[0]);
        let averageNumber = averageCollection.reduce((a, b) => a + b, 0) / averageCollection.length;
        this.setState({averageNumber: averageNumber})

        // let a = [] 
        // for (let key in this.props.response.suggestions) {
        //     let respKey = this.props.response.suggestions[key];
        //     let inptValue = this.props.inputValue
        //     if (respKey.value === inptValue) {
        //         a.push({comment: respKey.comment, mark: respKey.mark})
        //     }
        // }
        // console.log('a', a)
        
        console.log('alternative', alternative)

        // this.setState({checkData: a})
        // let averageCollection = a.map(i => +i.mark.match(/\d+/)[0]);
        // let averageNumber = averageCollection.reduce((a, b) => a + b, 0) / averageCollection.length;
        // this.setState({averageNumber: averageNumber})
    }

    render () {
        let checkResp = this.state.checkVisibility 
        ? <div className={classes.CheckFormOutput}>
            <div>Средний балл: {this.state.averageNumber}</div>
            {this.state.checkData.map(i => {
                return (<div key={uuidv4()}>
                    
                    <div>Комментарий: {i.comment}</div>
                    <div>Слышимость: {i.mark}</div>
                </div>
                )
            })}
            </div>
        : null;
        let dataInputField = this.props.keys 
        ? ( <div className={classes.RestrictWidth}>
            <DataInput 
            setMainInputs={this.props.setMainInputs} 
            setMainInputsId='check'
            handleInputsInput={this.props.setMainInputs}
            streetSuggested={this.props.keys}
            class={classes.CheckFormSearch}
            />
            <input className={classes.CheckFormSubmit} onClick={this.formSubmitHandler} type="submit" value="Найти"/>
            </div>
            )
        : <Spinner />
        return (
        <div className={classes.CheckFormContainer}>
            <form className={classes.CheckFormInput} onKeyPress={this.props.preventSubmit}>
                {dataInputField}
            </form>
                {checkResp}
        </div>
        )   
    }
} 
export default CheckForm;