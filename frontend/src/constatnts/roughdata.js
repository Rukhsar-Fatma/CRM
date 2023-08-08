const rough_columns = [
    { dataField: "id", text: "id", sort: true },
    { dataField: "user_name", text: "User Name", sort: true },
    { dataField: "product", text: "Product", sort: true },
    { dataField: "price", text: "Price", sort: true },
    { dataField: "action", text: "Actions", formatter: this.actionLable, sort: false }
]
const rough_data = [{id:1,user_name:"Hemant",product:"Photshop",price:"21$"},{id:2,user_name:"Shubham",product:"Photshop",price:"21$"},{id:3,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:4,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:5,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:6,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:7,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:8,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:9,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:10,user_name:"Shuvo",product:"Photshop",price:"21$"},{id:11,user_name:"Shuvo",product:"Photshop",price:"21$"}]

export default { rough_data, rough_columns };
