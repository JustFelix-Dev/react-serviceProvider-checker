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
    const [ isSubmitting,setIsSubmitting ] = useState(false);
    const imageRef = useRef()
    const fetcher = useFetcher()
    

    const formik = useFormik({
        initialValues,
        onSubmit : async value =>{
            setIsSubmitting(true)
                   await waait()
                   setIsSubmitting(false)
                let parsedValue = JSON.stringify(value);
                let processedValue = parsedValue.split(':')[1];
                let updatedValue = processedValue.split('}')[0];
                let finishedValue = updatedValue.substring(1,12);
                  setMyInput(finishedValue)
                if(finishedValue.startsWith('0814')||finishedValue.startsWith('0803')||finishedValue.startsWith('0703')||finishedValue.startsWith('0706')||finishedValue.startsWith('0813')||finishedValue.startsWith('0816')||finishedValue.startsWith('0810')||finishedValue.startsWith('0814')||finishedValue.startsWith('0903')||finishedValue.startsWith('0906')||finishedValue.startsWith('0913')||finishedValue.startsWith('0916')||finishedValue.startsWith('07025')||finishedValue.startsWith('07026')||finishedValue.startsWith('0704')){
                         setNspName('MTN :')
                        imageRef.current.style.display = 'block';
                        imageRef.current.src = 'images/mtnLogo.png';
                }
                else if(finishedValue.startsWith('0805')||finishedValue.startsWith('0807')||finishedValue.startsWith('0705')||finishedValue.startsWith('0815')||finishedValue.startsWith('0811')||finishedValue.startsWith('0905')||finishedValue.startsWith('0915')){
                          setNspName('GLO :')
                         imageRef.current.style.display = 'block';
                        imageRef.current.src = 'images/gloLogo.jpg';
                }
                else if(finishedValue.startsWith('0802')||finishedValue.startsWith('0808')||finishedValue.startsWith('0708')||finishedValue.startsWith('0812')||finishedValue.startsWith('0701')||finishedValue.startsWith('0902')||finishedValue.startsWith('0901')||finishedValue.startsWith('0904')||finishedValue.startsWith('0907')||finishedValue.startsWith('0912')){
                         setNspName('AIRTEL :')
                        imageRef.current.style.display = 'block';
                        imageRef.current.src = 'images/airtelLogo.jpg';
                }
                else if(finishedValue.startsWith('0809')||finishedValue.startsWith('0818')||finishedValue.startsWith('0817')||finishedValue.startsWith('0909')||finishedValue.startsWith('0908')){
                            setNspName('9mobile :')
                        imageRef.current.style.display = 'block';
                        imageRef.current.src = 'images/9mobileLogo.png';
                }
                else{

                }
           
        },
        validationSchema
    })

  return (
         <>
             <div className="container">
           <div className="form__wrapper">
            <form action="" onSubmit={formik.handleSubmit}>
           <marquee behavior="alternate" direction="left"><h2>Network Service Provider Checker</h2></marquee> 
              <input type="text"
               inputMode='numeric' 
               placeholder='Check your Network Provider'
               name='myInput'
                {...formik.getFieldProps('myInput')}
                />
                {<code>{formik.touched.myInput && formik.errors.myInput}</code>}
                <button type='submit'> {
                        isSubmitting ? <span>Submitting...</span> : <span>Validate</span>
                }</button>
            </form>
           </div>

            <div className="display__image">
                {
                    isSubmitting ? ( <div class="hourglassBackground">
                    <div class="hourglassContainer">
                      <div class="hourglassCurves"></div>
                      <div class="hourglassCapTop"></div>
                      <div class="hourglassGlassTop"></div>
                      <div class="hourglassSand"></div>
                      <div class="hourglassSandStream"></div>
                      <div class="hourglassCapBottom"></div>
                      <div class="hourglassGlass"></div>
                    </div>
                  </div>):(
                     <img src={''} ref= {imageRef} style={{borderRadius:"9px"}} className='display__Image' alt='serviceProvider_Image' height={150} width={150} />
                  )
                }
               
            </div>   
             <div className="output_text">
                         {nspName}  {myInput} 
                </div>           
             </div>
         </>
  )
}

export default NetworkChecker
