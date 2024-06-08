type Torder={
    date:Date,
    id:string,
    orderItems:OrderItems[],
    paymentsessionId:string,
    paymentstatus:string,
    shippingAddress:{
        city:string,
        country:string,
        line1:string,
        line2:string,
        postal_code:string,
        state:string
    },
    deliveryDate:Date,
    rejectdata:Date,
    status:string,
    totalbill:number,
    user:string
}
type OrderItems={
    id:string,
    item:{
        id:string,
        coverphoto:string,
        discount:number,
        price:number,
        title:string
    },
    orderId:string,
    pricetopay:number,
    quantity:number,
    totalprice:number
}
export type {
    Torder
}