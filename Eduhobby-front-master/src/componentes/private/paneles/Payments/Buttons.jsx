/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react'
import getCosts from '../../../../services/payments/getCosts';
import postOrder from '../../../../services/payments/postOrder';
import { BASE_PAYPAL_REDIRECT_URL } from '../../../../services/config';

const usePlaceOrder = () => {
    const [costs, setCosts] = useState([]);
   
    const urlRedirectAfterPlacingOrder = async (cost) => {
       const link = await postOrder(cost, BASE_PAYPAL_REDIRECT_URL);
       window.location.href = link.link;
    }
    useEffect(()=> {
        const getThemCosts = async () => {
            const costs = await getCosts();
            console.log(costs.docs);
            return costs.docs;
        }

        getThemCosts().then((e) => {console.log(e); setCosts(e)}).catch((e) => console.log(e));
    },[]);

   return [costs, urlRedirectAfterPlacingOrder]; 
}

export const BuySubscriptionsButtons = () => { 
    const [costs, urlRedirectAfterPlacingOrder] = usePlaceOrder();
    console.log(costs);
    return (
        <div className="App">
            <div>
                {costs ? costs.filter((cost) => cost.isRecurring).map((cost) => ( 
                        <React.Fragment key={cost._id}> 
                            <div>
                                Sub: {cost.planName}<br />
                                Duracion(meses): {cost.durationMonths}<br />
                                Descripcion: {cost.description}<br />
                                Precio: {cost.price} {cost.currency}<br/>
                                <button onClick={() => urlRedirectAfterPlacingOrder(cost)}>Comprar</button>
                            </div><br />
                        </React.Fragment> 
                 )): <div>Loading costs...</div>}
                
            </div>
        </div>
    ) 
};

export const BuyCourseButton = ({courseName}) => {
    const [costs, urlRedirectAfterPlacingOrder] = usePlaceOrder();
    const cost = costs.filter((cost) => !cost.isReccuring)[0];

    return (
        <div>
            {cost ?  
                <>
                    <div key={cost._id}>
                        Nombre curso: {courseName}<br/>
                        Sub: {cost.planName}<br />
                        Duracion(meses): Unica pago<br />
                        Descripcion: {cost.description}<br />
                        Precio: {cost.price} {cost.currency}<br />
                        <button onClick={() => urlRedirectAfterPlacingOrder(cost)}>Comprar</button>
                    </div><br />
                </> 
             :<div>Loading...</div>
            }
        </div>
    ) 
};
