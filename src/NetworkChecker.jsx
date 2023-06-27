import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'yup-phone-lite'

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

    const formik = useFormik({
        initialValues,
        onSubmit : value =>{
            let parsedValue = JSON.stringify(value);
            let processedValue = parsedValue.split(':')[1];
            let updatedValue = processedValue.split('}')[0];
            let finishedValue = updatedValue.substring(1,12);
            console.log(finishedValue)
            if(finishedValue.startsWith('0814')||finishedValue.startsWith('0803')||finishedValue.startsWith('0703')||finishedValue.startsWith('0706')||finishedValue.startsWith('0813')||finishedValue.startsWith('0816')||finishedValue.startsWith('0810')||finishedValue.startsWith('0814')||finishedValue.startsWith('0903')||finishedValue.startsWith('0906')||finishedValue.startsWith('0913')||finishedValue.startsWith('0916')||finishedValue.startsWith('07025')||finishedValue.startsWith('07026')||finishedValue.startsWith('0704')){
               console.log("MTN")
            }
            else if(finishedValue.startsWith('0805')||finishedValue.startsWith('0807')||finishedValue.startsWith('0705')||finishedValue.startsWith('0815')||finishedValue.startsWith('0811')||finishedValue.startsWith('0905')||finishedValue.startsWith('0915')){
                console.log('GLO')
            }
            else if(finishedValue.startsWith('0802')||finishedValue.startsWith('0808')||finishedValue.startsWith('0708')||finishedValue.startsWith('0812')||finishedValue.startsWith('0701')||finishedValue.startsWith('0902')||finishedValue.startsWith('0901')||finishedValue.startsWith('0904')||finishedValue.startsWith('0907')||finishedValue.startsWith('0912')){
                console.log('Airtel')
            }
        },
        validationSchema
    })

  return (
         <>
           <div className="form__wrapper">
            <form action="" onSubmit={formik.handleSubmit}>
            <h1>Network Service Provider Checker</h1>
              <input type="text"
               inputMode='numeric' 
               placeholder='Check your Network Provider'
               name='myInput'
                {...formik.getFieldProps('myInput')}
                />
                {<code>{formik.touched.myInput && formik.errors.myInput}</code>}
                <button type='submit'>Validate</button>
            </form>
                
           </div>
           {/* { inputValue} */}
              
         </>
  )
}

export default NetworkChecker
