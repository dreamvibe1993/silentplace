import React, {Component} from 'react';
import classes from './CheckForm.module.css'
import DataInput from '../DataInput/DataInput'
import Spinner from '../Spinner/Spinner'
import { v4 as uuidv4 } from 'uuid';


class CheckForm extends Component {
    state={
        checkVisibility: false,
        checkData: ['К сожалению, по вашему запросу ничего не найдено. Но вы можете быть первым! Оставьте ваш отзыв ниже :)'],
        averageNumber: 0,
        commentVisibility: false
    }

    formSubmitHandler = (event, id) => {
        event.preventDefault();
        if (this.props.inputValue === '') {
            return
        } else {
            if (id === 'up') {
                this.props.classesHandler(classes.HeaderCheckFormListOpened, 'check')
            }
            if (this.state.commentVisibility) {
                this.props.classesHandler(classes.HeaderCheckFormListHeaderOpened, 'check')
            }
        }

        this.setState({checkVisibility: true})
        let alternative = this.props.response.suggestions.filter(i => {
            return i.value === this.props.inputValue
        })
        this.setState({checkData: alternative})
        let averageCollection = alternative.filter(i => i.mark !== undefined).map(i => +i.mark.match(/\d+/)[0]);
        let averageNumber = averageCollection.reduce((a, b) => a + b, 0) / averageCollection.length;
        this.setState({averageNumber: averageNumber})
    }

    switchVisibilityHandler = (value, id) => {
        this.setState(value)
        if (id === "up") {
            this.props.classesHandler(classes.HeaderCheckFormListHeaderOpened)
        }
        if (id === "down") {
            this.props.classesHandler(classes.HeaderCheckFormListOpened)
        }

    } 

    render () {
        let commentSection = this.state.commentVisibility ? (this.state.checkData.find(i => i.comment.trim() !== '') ? (
            <div className={classes.CommentSection}><h2>Комментарии пользователей: </h2>
                {this.state.checkData.filter(i => i.comment.trim() !== '').map(i => {
                    return (<div className={classes.Comment} key={uuidv4()}>
                        {i.comment ? <div>{i.comment}</div> : null}
                    </div>)})}
            </div>
        ) : <div>По данному адресу, комментарии, к сожалению, отсутствуют.</div>) : null;

        let checkResp = this.state.checkVisibility //127px, 522px
        ? <div className={classes.CheckFormOutput}>
            <div className={classes.CheckFormOutputHeader}>
                <h2>Средний балл: <strong>{this.state.averageNumber.toFixed(1)}</strong></h2>
                {this.state.commentVisibility 
                ? <h3 className={classes.CheckFormOutputHeaderSwitcher} onClick={() => this.switchVisibilityHandler({commentVisibility: !this.state.commentVisibility}, 'down')}
                >Скрыть комментарии пользователей</h3> 
                : <h3 className={classes.CheckFormOutputHeaderSwitcher} onClick={() => this.switchVisibilityHandler({commentVisibility: !this.state.commentVisibility}, 'up')}
                >Показать комментарии пользователей</h3>} 
            </div>
                
                {commentSection}
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
            <input className={classes.CheckFormSubmit} 
            onClick={(event) => this.formSubmitHandler(event, 'up')} 
            type="submit" value="Найти"/>
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