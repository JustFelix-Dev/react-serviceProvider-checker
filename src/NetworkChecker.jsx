import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { waait } from './helper'
import { BsFillTelephoneForwardFill } from 'react-icons/bs';

const initialValues = {
    myInput: '',
}

const validationSchema = Yup.object().shape({
    myInput:Yup.string().phone('NG','Please enter a valid phone Number')
                        .min(9,'Complete your 10 digits')
                        .max(10,'More than 10 digits!')
                        .required('Enter Your 10 digits')

})


const NetworkChecker = () => {

    const [ myInput,setMyInput ] = useState('');
    const [ nspName,setNspName] = useState('');
    const [ isLoading,setIsLoading ] = useState(false);
    const [ color , setColor ] = useState('');
    const [ mySrc,setMySrc ] = useState('');
    const [ notFound,setNotFound ] = useState('');
    const [ isHighlighted, setIsHighlighted ] = useState(false);
    const imageRef = useRef();


          
    const handleClick=async(value)=>{
                setIsHighlighted(false)
                  setNspName('')
                  setMyInput('')
                setIsLoading(true)
                await waait()
                let parsedValue = JSON.stringify(value);
                let processedValue = parsedValue.split(':')[1];
                let updatedValue = processedValue.split('}')[0];
                let finishedValue = updatedValue.substring(1,11);
                  setMyInput(finishedValue)
                if(finishedValue.startsWith('814')||finishedValue.startsWith('803')||finishedValue.startsWith('703')||finishedValue.startsWith('706')||finishedValue.startsWith('813')||finishedValue.startsWith('816')||finishedValue.startsWith('810')||finishedValue.startsWith('814')||finishedValue.startsWith('903')||finishedValue.startsWith('906')||finishedValue.startsWith('913')||finishedValue.startsWith('916')||finishedValue.startsWith('7025')||finishedValue.startsWith('7026')||finishedValue.startsWith('704')){
                         setIsLoading(false)
                         setIsHighlighted(true)
                         setNspName('MTN : 0')
                         setColor('gold')
                         setMySrc('images/mtnLogo.png')
                         setNotFound('')
                }
                else if(finishedValue.startsWith('805')||finishedValue.startsWith('807')||finishedValue.startsWith('705')||finishedValue.startsWith('815')||finishedValue.startsWith('811')||finishedValue.startsWith('905')||finishedValue.startsWith('915')){
                        setIsLoading(false)
                        setIsHighlighted(true)
                        setColor('green')
                        setNspName('GLO : 0')
                        setMySrc('images/gloLogo.jpg')
                        setNotFound('')

                }
                else if(finishedValue.startsWith('802')||finishedValue.startsWith('808')||finishedValue.startsWith('708')||finishedValue.startsWith('812')||finishedValue.startsWith('701')||finishedValue.startsWith('902')||finishedValue.startsWith('901')||finishedValue.startsWith('904')||finishedValue.startsWith('907')||finishedValue.startsWith('912')){
                        setIsLoading(false)
                        setIsHighlighted(true)
                        setNspName('AIRTEL : 0')
                        setColor('red')
                        setMySrc('images/airtelLogo.jpg')
                        setNotFound('')

                }
                else if(finishedValue.startsWith('809')||finishedValue.startsWith('818')||finishedValue.startsWith('817')||finishedValue.startsWith('909')||finishedValue.startsWith('908')){
                            setIsLoading(false)
                            setIsHighlighted(true)
                            setColor('green')
                            setNspName('9mobile : 0')
                            setMySrc('images/9mobileLogo.png')
                            setNotFound('')

                }
                else{
                        setIsLoading(false)
                        setNspName('Not Found : 0')
                        setColor('#333')
                        setNotFound("Sorry, Number not found!")
                        setMySrc('images/unknown.png')
                }
        
    }

    const formik = useFormik({
        initialValues,
        onSubmit:handleClick,
        validationSchema
    })

  return (
         <>
             <div className="container">
           <div className="form__wrapper">
            <form action="" onSubmit={formik.handleSubmit}>
           <div className="title"><h2> Service Provider Checker</h2><BsFillTelephoneForwardFill/></div>
               <div className="inputs">
               <div className="ui-wrapper">
                <input checked="" id="Nigeria" name="flag" type="radio"/>
                <input className="dropdown-checkbox" name="dropdown" id="dropdown" type="checkbox"/>
                <label className="dropdown-container" htmlFor="dropdown"></label>
                <div className="input-wrapper">
                    <legend>
                        <label htmlFor="phonenumber">
                        Phone Number*
                        </label>
                    </legend>
                    <div className="textfield">
                        <input pattern="\d+" maxLength="10" inputMode='numeric'
                          autoComplete='off'
                         id="phonenumber" type="text"
                         name='myInput'
                         {...formik.getFieldProps('myInput')}/>
                    </div>
                </div>
                <div className="select-wrapper">
                    <ul>
                        <li className="Nigeria"><label htmlFor="Nigeria"><span>NG</span>Nigeria (+234)</label></li>
                    </ul>
                </div>
                </div>
                <button type='submit'> {
                    isLoading ? (<div class="spinner">
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                </div>) : <span>Validate</span>
                }</button>
               </div>
                {<span className='invalid'>{formik.touched.myInput && formik.errors.myInput}</span>}
            </form>
           </div>
            <div className="display__image">
                {
                    isLoading ? (<div class="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    </div>):(
                     <img src={mySrc} ref= {imageRef} style={{borderRadius:"9px",display: isHighlighted ? 'block':'none'}} className='display__Image' alt='serviceProvider_Image' height={150} width={150} />
                  )
                }
            </div>   
             <div className="output_text" style={{display: isHighlighted ? 'block':'none',"--accent":color, color: color === 'gold' ? 'black':'white'}}>
                         {nspName}{myInput} <br/>
                         {notFound}
                </div>  
                <footer>
                    <span className='footer'>Powered by ❤ <a target='blank' href="https://www.linkedin.com/in/justfelixowolabi">Just-FelixDev</a></span>
                </footer>         
             </div>
         </>
  )
}

export default NetworkChecker
