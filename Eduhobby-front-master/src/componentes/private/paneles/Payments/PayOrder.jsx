/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import postPayment from '../../../../services/payments/getPayment'

export default () => {
  const [tId, setTId] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenId = searchParams.get('token');
    console.log(tokenId);
    setTId(tokenId)
    
    const makePayment = async () => {
      try {
        const response = await postPayment(tokenId);
        const resposeJson = await response.json();
        console.log(resposeJson);  
        return resposeJson;
      } catch (error) {
        return error;
      }
      
    }

    makePayment().then((e) => console.log(e)).catch((e) => console.log(e))
  }, []);

  return (
    <div>
      <div>{tId}</div><br />
      <div>Payment successful</div>
    </div>
  )
}
