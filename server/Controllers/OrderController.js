const {Order, OrderItem} = require('../models/OrderModel');
const Brand = require('../models/brand');
const category = require('../models/category');
const AppError = require('../utils/AppError')
const checkasync = require('./CheckAync')


exports.getMyOrders =checkasync(async(req,res,next)=>{
        if(!req.user) return next(new AppError('please login',401));
        let status = req.query.status
        let query = [{user:req.user._id}]
        if(status) query.push({status:status});
        let myOrders = await Order.find({$and:query}).populate('orderItems').sort("-date");
        res.status(200).json({
            status:'success',
            orders:myOrders
        })
})
exports.getOrderById = checkasync(async(req,res,next)=>{
        let order = await Order.findById(req.params.id).populate('orderItems')
        res.status(200).json({
            status:'success',
            orders:order
        })
})
exports.getAllOrder = checkasync(async(req,res,next)=>{
        if(req.user.role !== "admin"){
            return next(new AppError("you don't have permission to do this",401))
        }
        const {type} = req.query
        let Orders;
        switch(type){
            case 'delivered':
                Orders = await Order.find({status:"delivered"}).sort("date");
                break;
            case 'accept':
                Orders = await Order.find({status:"accept"}).sort("date");
                break;
            case 'rejected':
                Orders  = await Order.find({status:"rejected"}).sort("date");
                break;
            default:
                Orders = await Order.find().sort("date");
        }
        let query;
        if(type){
            query ={status:type}
        }else{
            query = {}
        }
        res.status(200).json({
            status:'success',
            results:await Order.countDocuments(query),
            orders:Orders
        })
})
exports.updateStatus = checkasync(async(req,res,next)=>{
    if(req.user.role !== "admin"){
        return next(new AppError("you don't have permission to do this",401))
    }
    const {status} = req.query
    let order = await Order.findById(req.params.id);
    switch(status){
        case 'rejected':
            order.status = 'rejected';
            order.rejectdata = Date.now();
            break;
        case 'delivered':
            order.status = 'delivered';
            order.deliveryDate = Date.now();
            break;
        default:
    }    
    await order.save()
    res.status(200).json({
        status:'success'
    })
})

exports.getStaticsOfOrder = checkasync(async(req,res,next)=>{
        //this year sales
        const {year} = req.query
        const {bytype} = req.query
        let yearTotal = await Order.aggregate([
            {
                $match:{
                    date:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:"",
                    totalSalesbyMoney:{$sum:"$totalbill"},
                    totalSalesbynumber:{$sum:1}
                }
            }
        ])
        let yearStatics = await Order.aggregate([
            {
                $match:{
                    date:{
                        $gte:new Date(`${year}-01-01`),
                        $lte:new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group:{
                    _id:{$month:"$date"},
                    totalSalesbyMoney:{$sum:"$totalbill"},
                    totalSalesbynumber:{$sum:1}
                }
            }
        ])
       
        
        res.status(200).json({
            status:'success',
            totalShareofYear:yearTotal,
            yearState:yearStatics,
        })
    }
)
exports.getStaticsofProps = checkasync(async(req,res,next)=>{
    const {bytype} = req.query
    const {year} = req.query
    let yearTotal = await OrderItem.aggregate([
        {
            $match:{
                date:{
                    $gte:new Date(`${year}-01-01`),
                    $lte:new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group:{
                _id:"",
                totalSalesbyMoney:{$sum:"$totalprice"},
                totalSalesbynumber:{$sum:"$quantity"}
            }
        }
    ])
   
    let ByProps=[]
    switch(bytype){
        case 'category':
            ByProps = await OrderItem.aggregate([
                {
                    $lookup:{
                        from:"items",
                        localField:"item",
                        foreignField:"_id",
                        as:"item"
                    }
                },
                {
                    $unwind:{
                        path:"$item"
                    }
                },
                {
                    $match:{
                        date:{
                            $gte:new Date(`${year}-01-01`),
                            $lte:new Date(`${year}-12-31`)
                        }
                    }
                },
                {
                    $group:{
                        _id:"$item.category",
                        totalSalesbyMoney:{$sum:"$totalprice"},
                        totalSalesbynumber:{$sum:"$quantity"},
                    }
                },
                {
                    $addFields:{
                        shareByNumber:{$trunc:[{$multiply:[{$divide:["$totalSalesbynumber",yearTotal[0].totalSalesbynumber]},100]},2]},
                        shareBymoney:{$trunc:[{$multiply:[{$divide:["$totalSalesbyMoney",yearTotal[0].totalSalesbyMoney]},100]},2]}
                    }
                }
            ])
            for(let ele of ByProps){
                let cate = await category.findById(ele._id)
                ele.category = cate.value
            }
            break;
        case 'brand':
            ByProps = await OrderItem.aggregate([
                {
                    $match:{
                        date:{
                            $gte:new Date(`${year}-01-01`),
                            $lte:new Date(`${year}-12-31`)
                        }
                    }
                },
                {
                    $lookup:{
                        from:"items",
                        localField:"item",
                        foreignField:"_id",
                        as:"item"
                    }
                },
                {
                    $unwind:{
                        path:"$item"
                    }
                },
                {
                    $group:{
                        _id:"$item.manufacturour",
                        totalSalesbyMoney:{$sum:"$totalprice"},
                        totalSalesbynumber:{$sum:"$quantity"},
                    }
                },
                {
                    $addFields:{
                        shareByNumber:{$trunc:[{$multiply:[{$divide:["$totalSalesbynumber",yearTotal[0].totalSalesbynumber]},100]},2]},
                        shareBymoney:{$trunc:[{$multiply:[{$divide:["$totalSalesbyMoney",yearTotal[0].totalSalesbyMoney]},100]},2]}
                    }
                }
            ])
            for(let ele of ByProps){
                let cate = await Brand.findById(ele._id)
                ele.brand = cate.brandname
            }
            break;
            default:
                ByProps = []
    }
    res.status(200).json({
        status:'success',
        pie:ByProps
    })
})
exports.TopSelling = checkasync(async(req,res,next)=>{
    const {year} = req.query
    const limit = req.query.limit
    let topselling_items = await OrderItem.aggregate([
        {
            $match:{
                date:{
                    $gte:new Date(`${year}-01-01`),
                    $lte:new Date(`${year}-12-31`)
                }
            }
        },
        {
            $lookup:{
                from:"items",
                localField:"item",
                foreignField:"_id",
                as:"item"
            }
        },
        {
            $unwind:{
                path:"$item"
            }
        },{
            $group:{
                _id:"$item._id",
                totalsales:{$sum:"$quantity"},
                item:{$push:{title:"$item.title",photo:"$item.coverphoto",id:"$item.id"}}
            }
        },
        {
            $sort:{
                    "totalsales":-1
            }
        },{
            $limit: Number.parseInt(limit) || 1
        }
    ])
    res.status(200).json({
        status:'success',
        mostselling:topselling_items
    })
})