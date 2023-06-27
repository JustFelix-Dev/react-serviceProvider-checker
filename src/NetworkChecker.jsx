import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    myInput: '',
}

const validationSchema = Yup.object().shape({
    myInput:Yup.number().required('Your number is required!')
            //   .min(11,'Number has to be 11 digits')
              .max(11, 'Number has to be 11 digits')

})

const onSubmit= values=>{
    console.log("values",values)
}
const NetworkChecker = () => {
    // const [ inputValue, setInputValue ] = useState('')

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

  return (
         <>
           <div className="form__wrapper">
            <form action="" onSubmit={formik.handleSubmit}>
            <h1>Network Service Provider Checker</h1>
              <input type="number"
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
