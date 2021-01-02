import React, {Component} from 'react';
import CheckForm from '../components/CheckForm/CheckForm'
import ShareForm from '../components/ShareForm/ShareForm'
import axios from '../axios';
import {NavLink} from 'react-router-dom'


//imgs
import homeLogo from '../img/home_logo.png'
import happy from '../img/happy.png'
import lesshappy from '../img/less_happy.png'
import sad from '../img/sad.png'
import surprised from '../img/surprised.png'
import devil from '../img/devil.png'
import classes from './Page.module.css';
//imgs

class Page extends Component {
    state={
        tip: false,
        responseData: null,
        inputValueCheckForm: '',
        responseKeys: null,
        shareFormVisibility: false,
        checkFormVisibility: false,
        classForPolly: classes.HeaderCheckFormActive,
        checkInputVisibility: false,
        tipVisibility: false
    }
    componentDidMount () {
       this.retriggerDBDataReq()
    }
    mainStateInputValueSetter = (value) => {
        this.setState({inputValueCheckForm: value})
    }


    submitPreventHandler = (event) => {
        let key = event.charCode || event.keyCode || 0;     
        if (key === 13) {
            event.preventDefault();
        }
    }
    retriggerDBDataReq = () => {
        axios.get('https://react-my-burger-36d25-default-rtdb.firebaseio.com/slysh.json')
        .then(response => {
            let temp = response.data;
            let objKeys = Object.keys(temp);
            let obj = {suggestions: objKeys.map(i => temp[i]['suggestions'][0])}
            const uniqueArray = obj.suggestions.filter((value,index) => {
                return index === obj.suggestions.findIndex(obj => {
                    return JSON.stringify(obj.value) === JSON.stringify(value.value);
                });
            });
            let keys = {suggestions: uniqueArray.map(i => {
                return { value: i.value }
            })}
            this.setState({responseData: obj});
            this.setState({responseKeys: keys})
        })
        .catch(error => {
            this.setState({error: true})
        });
    }
    componentVisibilityHandler = (value, id) => {
        if (this.state.checkFormVisibility === false) {
            this.setState({inputValueCheckForm: ''})
        }
        if (id === 'tip') {
            this.tipVisibilityHandler()
        }
        if (id === 'check') {
            this.inputVisibilityHandler()
        } else {
            
        }
        this.setState(value)
       
    }
    classesHandler = (value) => {
        this.setState({classForPolly: value})
    }
    inputVisibilityHandler = () => {
        this.setState({checkFormVisibility: !this.state.checkFormVisibility})
        setTimeout(() => {this.setState({checkInputVisibility: !this.state.checkInputVisibility})}, 250)
    }
    tipVisibilityHandler = () => {
        this.setState({tip: !this.state.tip})
        setTimeout(() => {this.setState({tipVisibility: !this.state.tipVisibility})}, 350)
    }
    render () {


        let tipList = this.state.tipVisibility ? (
            <ul>
            <li><h3>Мы предлагаем вам оценить слышимость в доме по пятибалльной шкале:</h3></li>
            <li> <img alt='happy' src={lesshappy}/> 1 балл. Абсолютно ничего не слышно.</li>
            <li> <img alt='lesshappy' src={happy}/> 2 балла. Что-то слышно только если хорошо прислушаться.</li>
            <li> <img alt='sad' src={surprised}/> 3 балла. Слышна только громкая музыка. Спать можно если у вас тихие соседи.</li>
            <li> <img alt='surprised' src={sad}/> 4 балла. Слышна даже тихая музыка. Можете забыть о спокойном сне.</li>
            <li> <img alt='devil' src={devil}/> 5 баллов. Отчетливо слышны разговоры. Можете забыть о покое в любое время.</li>
            </ul>   
        ) : null;

        let tip = this.state.tip ? (
            <div className={classes.TipOpened}>
                {tipList}
            </div>
            ) : <div className={classes.TipClosed}></div>;

        let checkInput = this.state.checkInputVisibility ? (
            <CheckForm 
            inputValue={this.state.inputValueCheckForm}
            response={this.state.responseData} 
            keys={this.state.responseKeys}
            preventSubmit={this.submitPreventHandler}
            setMainInputs={this.mainStateInputValueSetter}
            classesHandler={this.classesHandler}
            />  
        ) : null;


        let shareForm = this.state.shareFormVisibility 
        ? (<div className={classes.HeaderShareFormActive}>
                <h2  
                onClick={() => this.componentVisibilityHandler({shareFormVisibility: !this.state.shareFormVisibility})}
                >ПОСТАВИТЬ ОЦЕНКУ</h2>
                <ShareForm 
                preventSubmit={this.submitPreventHandler} 
                retrigger={this.retriggerDBDataReq}
                /> </div>) 
        : (<div className={classes.HeaderShareFormPassive}>
                <h2  
                onClick={() => this.componentVisibilityHandler({shareFormVisibility: !this.state.shareFormVisibility})}
                >ПОСТАВИТЬ ОЦЕНКУ</h2>
            </div>);

        let checkForm = this.state.checkFormVisibility 
        ?   (<div className={this.state.classForPolly}>
                <h2  
                onClick={() => this.componentVisibilityHandler(null, 'check')}
                >ПРОВЕРИТЬ СЛЫШИМОСТЬ</h2>
                {checkInput}
            </div>)
        :   (<div className={classes.HeaderCheckFormPassive}>
                <h2  
                onClick={() => this.componentVisibilityHandler(null, 'check')}
                >ПРОВЕРИТЬ СЛЫШИМОСТЬ</h2>
             </div>);
        

        return (
            <div className={classes.Container}>
                <header>
                    <h1><img alt='house' src={homeLogo}></img> ТихийДом.ру</h1>
                    <p>Хотите переехать, но переживаете,
                        что попадутся <strong>шумные соседи?</strong> Проверьте отзывы жильцов о слышимости
                        вашего нового места проживания или <strong>поставьте
                        вашу оценку </strong>слышимости в вашем доме! 
                        Все данные анонимны: <strong>вам не нужно указывать ваше имя
                        или квартиру,</strong> достаточно указать <strong>лишь адрес дома</strong>.
                    </p>

                    <p className={classes.TipSwitcher} 
                    onClick={() => this.componentVisibilityHandler(null, 'tip')}
                    ><h3>Подробнее об оценках</h3></p>
                    {tip}
                </header>


                    {checkForm}
                    
                    {shareForm}
                <footer>
                    <NavLink 
                    to="/about"
                    >О проекте</NavLink>
                    <NavLink to="/#">Пожертвования</NavLink>
                    <NavLink to="/offer">Публичная оферта</NavLink>
                </footer>
                <p className={classes.FingerPrint}>Made by George Apraksine ©</p>
            </div>
        )
    }
}

export default Page;