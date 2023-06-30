import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { Form, useFetcher } from 'react-router-dom'
import { waait } from './helper'

const initialValues = {
    myInput: '',
}

const validationSchema = Yup.object().shape({
    myInput:Yup.string().phone('NG','Please enter a valid phone Number')
                        .min(10,'Complete your 11 digits')
                        .max(11,'More than 11 digits!')
               .required('Enter Your 11 digits')

})


const NetworkChecker = () => {
    const [ myInput,setMyInput ] = useState('');
    const [ nspName,setNspName] = useState('');
    const [ isLoading,setIsLoading ] = useState(false);
    const [ mySrc,setMySrc ] = useState('');
    const [ notFound,setNotFound ] = useState('');
    const [isHighlighted, setIsHighlighted] = useState(false);
    const imageRef = useRef()
          
    const handleClick=async(value)=>{
                setIsLoading(true)
                await waait()
                let parsedValue = JSON.stringify(value);
                let processedValue = parsedValue.split(':')[1];
                let updatedValue = processedValue.split('}')[0];
                let finishedValue = updatedValue.substring(1,12);
                  setMyInput(finishedValue)
                if(finishedValue.startsWith('0814')||finishedValue.startsWith('0803')||finishedValue.startsWith('0703')||finishedValue.startsWith('0706')||finishedValue.startsWith('0813')||finishedValue.startsWith('0816')||finishedValue.startsWith('0810')||finishedValue.startsWith('0814')||finishedValue.startsWith('0903')||finishedValue.startsWith('0906')||finishedValue.startsWith('0913')||finishedValue.startsWith('0916')||finishedValue.startsWith('07025')||finishedValue.startsWith('07026')||finishedValue.startsWith('0704')){
                         setIsLoading(false)
                         setIsHighlighted(true)
                         setNspName('MTN :')
                         setMySrc('images/mtnLogo.png')
                         setNotFound('')
                }
                else if(finishedValue.startsWith('0805')||finishedValue.startsWith('0807')||finishedValue.startsWith('0705')||finishedValue.startsWith('0815')||finishedValue.startsWith('0811')||finishedValue.startsWith('0905')||finishedValue.startsWith('0915')){
                        setIsLoading(false)
                        setIsHighlighted(true)
                        setNspName('GLO :')
                        setMySrc('images/gloLogo.jpg')
                        setNotFound('')

                }
                else if(finishedValue.startsWith('0802')||finishedValue.startsWith('0808')||finishedValue.startsWith('0708')||finishedValue.startsWith('0812')||finishedValue.startsWith('0701')||finishedValue.startsWith('0902')||finishedValue.startsWith('0901')||finishedValue.startsWith('0904')||finishedValue.startsWith('0907')||finishedValue.startsWith('0912')){
                        setIsLoading(false)
                        setIsHighlighted(true)
                        setNspName('AIRTEL :')
                        setMySrc('images/airtelLogo.jpg')
                        setNotFound('')

                }
                else if(finishedValue.startsWith('0809')||finishedValue.startsWith('0818')||finishedValue.startsWith('0817')||finishedValue.startsWith('0909')||finishedValue.startsWith('0908')){
                            setIsLoading(false)
                            setIsHighlighted(true)
                            setNspName('9mobile :')
                            setMySrc('images/9mobileLogo.png')
                            setNotFound('')

                }
                else{
                        setIsLoading(false)
                        setNspName('Not Found :')
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
           <marquee behavior="alternate" direction="left"><h2> Service Provider Checker</h2></marquee> 
              <input type="text"
               inputMode='numeric' 
               placeholder='Check your Network Provider'
               name='myInput'
                {...formik.getFieldProps('myInput')}
                />
                {<code>{formik.touched.myInput && formik.errors.myInput}</code>}
                <button type='submit'> {
                        isLoading ? <span>Submitting...</span> : <span>Validate</span>
                }</button>
            </form>
           </div>

            <div className="display__image">
                {
                    isLoading ? ( <div className="hourglassBackground">
                    <div className="hourglassContainer">
                      <div className="hourglassCurves"></div>
                      <div className="hourglassCapTop"></div>
                      <div className="hourglassGlassTop"></div>
                      <div className="hourglassSand"></div>
                      <div className="hourglassSandStream"></div>
                      <div className="hourglassCapBottom"></div>
                      <div className="hourglassGlass"></div>
                    </div>
                  </div>):(
                     <img src={mySrc} ref= {imageRef} style={{borderRadius:"9px",display: isHighlighted ? 'block':'none'}} className='display__Image' alt='serviceProvider_Image' height={150} width={150} />
                  )
                }
               
            </div>   
             <div className="output_text">
                         {nspName}  {myInput} <br/>
                         {notFound}
                </div>           
             </div>
         </>
  )
}

export default NetworkChecker
