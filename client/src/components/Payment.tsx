import React, { useState } from "react";
import axios from "axios";
const Payment =()=>{
    const item:any = {
            "_id": "664ee210a648ddd7586be7ef",
             "user": "664b95e15031946bc495ff69",
            "created": "2024-05-23T06:26:30.217Z",
            "__v": 0,
        "totalbill": 383195,
        "products": [
            {
                "_id": "664ee261a648ddd7586be7f6",
                "item": {
                    "_id": "664e2d47b5b2e74ad8750f16",
                    "price": 129999,
                    "coverphoto": "http://res.cloudinary.com/dho1k0k5g/image/upload/v1716399374/Photos/peqkixgkqlgfaekxvuum.jpg",
                    "coverphotoId": "Photos/peqkixgkqlgfaekxvuum",
                    "discount": 2599,
                    "category": {
                        "value": "electronic",
                        "__v": 0
                    },
                    "manufacturour": {
                        "brandname": "Apple",
                        "logo": "http://res.cloudinary.com/dho1k0k5g/image/upload/v1716435490/Photos/xircnwffpgpnzd1v73ah.png"
                    },
                    "publishedAt": "2024-05-22T17:32:58.996Z",
                    "__v": 1,
                    "title": "Apple IMac Pro",
                    "id": "664e2d47b5b2e74ad8750f16"
                },
                "quantity": 3,
                "cartId": "664ee210a648ddd7586be7ef",
                "pricetopay": 125999,
                "totalprice": 377997,
                "__v": 0,
                "id": "664ee261a648ddd7586be7f6"
            },
            {
                "_id": "6651596a23f4e441e25708e7",
                "item": {
                    "_id": "665158f723f4e441e25708d4",
                    "price": 2599,
                    "coverphoto": "http://res.cloudinary.com/dho1k0k5g/image/upload/v1716606663/Photos/eumprvfqi8x6lxd3dyw3.jpg",
                    "coverphotoId": "Photos/eumprvfqi8x6lxd3dyw3",
                    "discount": 0,
                    "category": {
                        "value": "Fashion",
                        "__v": 0
                    },
                    "manufacturour": {
                        "brandname": "Nike",
                        "logo": "http://res.cloudinary.com/dho1k0k5g/image/upload/v1716603663/Photos/zpy5qp1gbfc7kztpn7kl.jpg"
                    },
                    "publishedAt": "2024-05-25T03:06:33.979Z",
                    "__v": 0,
                    "id": "665158f723f4e441e25708d4"
                },
                "quantity": 2,
                "cartId": "664ee210a648ddd7586be7ef",
                "pricetopay": 2599,
                "totalprice": 5198,
                "__v": 0,
                "id": "6651596a23f4e441e25708e7"
            }
        ],
        "id": "664ee210a648ddd7586be7ef"
    }

    const sendItem = async()=>{
        try{
            console.log("hii")
            let res = await axios.post("http://localhost:8000/checkout",{item},{withCredentials:true});
            window.open(res.data.session.url);
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            <button onClick={sendItem}>Payment</button>
        </div>
    )
}
export default Payment