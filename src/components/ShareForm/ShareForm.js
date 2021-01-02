import React, {Component} from 'react';
import axios from '../../axios'
import Form from './Form/Form'
import Spinner from '../Spinner/Spinner'

class ShareForm extends Component {
    state = {
        commentVisibility: false,
        formAreaVisibility: true,
        commentValue: '',
        radio: {
            messages: {
                one: '1 балл. Абсолютно ничего не слышно. ',
                two: '2 балла. Что-то слышно только если хорошо прислушаться.',
                three: '3 балла. Слышна только громкая музыка. Спать можно если у вас тихие соседи.',
                four: '4 балла. Слышна даже тихая музыка. Можете забыть о спокойном сне.',
                five: '5 баллов. Отчетливо слышны разговоры. Можете забыть о покое в любое время.'
            },
            radioValue: null,
            theLevelText: null
        },
        commentHeader: 'Оставить комментарий',
        streetSuggestions: null,
        thisValue: '',
        checkSubmitting: 'init',
    }
    componentDidMount() {
        this.dataGetter('')
    }
    dataSetter = (value) => {
        this.formSubmitHandler(null, value)
    }
    
    dataGetter = (newValue) => {
        var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        var token = "66b0e1924eea968c7fbf4d3fdd1a2f264d446267";
        var query = `${newValue}`;
        
        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({
                query: query,
                locations: [{
                    kladr_id: "6600000100000"
                }]
            })
        }

        fetch(url, options)
        .then(response => response.json())
        .then(result => this.setState({streetSuggestions: result}))
    }
    inputValueHandler = (id, event, newValue, ) => {
        if (id === 'textarea') {
            let value = event.target.value;
            this.setState({commentValue: value});
        }
        if (id === 'radio') {
            let value = event.target.value;
            this.setState({radioValue: value, 
                theLevelText: this.state.radio.messages[value],
            });
        }
        if (id === 'input') {
            this.dataGetter(newValue);
            if (newValue !== '') {
                this.formSubmitHandler(null, newValue)
            } else {
                this.setState({checkSubmitting: false, thisValue: ''})
            }
            
        }
    }
    formSubmitHandler = (event, newValue) => {
        let currentValue = newValue,
        valueCheck = this.state.thisValue,
        [city, str, prkt, build] = [" д ", " ул ", " пр-кт ", "Екатеринбург"],
        fleshRoyal =  (valueCheck.includes(city) && (valueCheck.includes(str) || valueCheck.includes(prkt)) && valueCheck.includes(build));

        let check = (event && fleshRoyal && this.state.theLevelText) ? true : false;
        if (event && !this.state.theLevelText) {this.setState({theLevelText: false})}
        if (!fleshRoyal) {this.setState({checkSubmitting: false})}
        if (newValue && !event) {
            this.setState({thisValue: currentValue})
            this.setState({checkSubmitting: true})
        }
        if (event && check) {
            event.preventDefault();
            this.setState({formAreaVisibility: 'pending'});
            let data = {
                suggestions: [
                        {
                        value: this.state.thisValue,
                        comment: this.state.commentValue,
                        mark: this.state.theLevelText
                    }
                ],
            }
            axios.post('/slysh.json', data)
            .then(response => {
                setTimeout(() => {
                    this.setState({formAreaVisibility: true})
                }, 2500)
                this.setState({formAreaVisibility: false});
                this.props.retrigger();
                this.setState({thisValue: ''})
            })
            .catch(error => {
                this.setState({formAreaVisibility: 'pending'});
            });
            this.setState({checkSubmitting: 'init', radioValue: null, theLevelText: null, thisValue: ''})
        }
    }


    commentAreaSwitcher = () => {
        this.setState({commentVisibility: !this.state.commentVisibility})
        this.state.commentVisibility === false ? this.setState({commentHeader: 'Скрыть поле комментария'}) 
        : this.setState({commentHeader: 'Оставить комментарий'});
    }
    render () {
        let formArea = this.state.formAreaVisibility === true
        ? <Form
        formAreaVisibility={this.state.formAreaVisibility}
        radioButtonsObj={this.state.radio.messages}
        streetSuggestions={this.state.streetSuggestions}
        handleInputsInput={(newValue) => this.inputValueHandler('input', null, newValue)}
        handleInputsRadio={(event) => this.inputValueHandler('radio', event)}
        handleInputsText={(event) => this.inputValueHandler('textarea', event)}
        handleSubmit={this.formSubmitHandler}
        switchComment={this.commentAreaSwitcher}
        commentAreaProp={this.state.commentVisibility}
        commentHeader={this.state.commentHeader}
        setLocalShareData={(value) => this.dataSetter(value)}
        preventSubmit={this.props.preventSubmit}
        validValue={this.state.checkSubmitting}
        validRadio={this.state.theLevelText}
        classesHandler={this.props.classesHandler}

        /> 
        : this.state.formAreaVisibility === 'pending' ? <Spinner />
        : <div>Ваш отзыв отправлен, спасибо!</div>



        return formArea;
    }
}
export default ShareForm;