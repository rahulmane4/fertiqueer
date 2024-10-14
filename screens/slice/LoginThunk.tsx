//Nơi định nghĩa ra những cái bất đồng bộ (Call API):

import { createAsyncThunk } from "@reduxjs/toolkit";

export const Login = createAsyncThunk(
    //Name:
    'login/signin', //Đặt gì cũng được;
    //Function:
    async(params)=>{
        //Request URL: API Swagger API
        let response = await fetch('https://shop.cyberlearn.vn/api/Users/signin',{
            //Phuơng thức:
            method: 'POST',
            //Header: Kiểu keyvalue
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            //Raw body:
            /**
             * Đây là Object:
             {
                    "email": "nguyentest@gmail.com",
                    "password": "abc1234"
                }
             */
            //Biến object thành chuỗi
          
            body:   JSON.stringify({
                "email": "nguyentest@gmail.com",
                "password": "abc1234"
            })
        })
        //Sau khi xong-> Lấy JSON:
        let json = await response.json()
        //return json:
        return json.content.accessToken
    }
)