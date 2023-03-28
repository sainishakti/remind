const db = require('../models')
const stripe = require('stripe')('sk_test_51LxB4ZSGE9y4ZZD5OVHQFdLL2icezguyyRv2noSAKCsuRWvLwyb4sS9GPSw25HUHGb7vFZZlZpEvmqjQOp39m4n0007VfeJWzM')
const stripePayment =db.stripPayment
const payment = async(req,res)=>{
    try {
        const{userId,firstName,lastName,cardNumber,exp_month,exp_year,cvc,address1,address2,
            postalCode,city,state,phoneNumber,country,amount}=req.body
        if(cardNumber && exp_month && exp_year && cvc && amount){
            let paymentMethod =await stripe.paymentMethods.create({
                type: 'card',
                card:{
                    number:cardNumber,  
                    exp_month:exp_month,
                    exp_year:exp_year,
                    cvc:cvc
                },
            });
            datas = await stripe.paymentIntents.create({
               payment_method:paymentMethod.id,
               amount:(amount*100),
               currency:'inr',
               confirm:true,
               payment_method_types:['card'],
            })
            // const amounts = datas.amount
            // const charges = datas.charges.data
            // const  payment_method_details = charges.map((num)=>num.payment_method_details)
            // const  receipt_url = charges.map((num)=>num.receipt_url)
            const doc = {
                userId:userId,
                firstName:firstName,
                lastName:lastName,
                address1:address1,
                //amount:amount,
                address2:address2,
                postalCode:postalCode,
                city:city,
                state:state,
                phoneNumber:phoneNumber,
                country:country
            }
            const usersData = await stripePayment.create(doc)
        res.send({ "status": "201","success":true, "message": "Payment Create  Successfully",usersData })
    
        }else{
            res.status(401).send({"status": "401","success":false, "message": "All fields are required" })  
        }
        
    } catch (error) {
        console.log("errr",error);
        res.status(401).send({"status": "401","success":false, "message":  "Something went Wrong" })
    }
    }

    module.exports = {
        payment,
    }