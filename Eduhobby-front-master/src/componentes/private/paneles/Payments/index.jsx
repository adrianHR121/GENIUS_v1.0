/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { BuyCourseButton, BuySubscriptionsButtons } from './Buttons'

export default () => {
  return (
    <div>
        <h1 style={{ fontWeight: 'bold'}}>Subs</h1><br/>
        <BuySubscriptionsButtons />

        <h1 style={{ fontWeight: 'bold'}}>Compra Curso</h1><br/>
        <BuyCourseButton courseName={'cash monay'}/>
    </div>
  )
}
