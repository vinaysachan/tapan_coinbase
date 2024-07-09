import { useState, useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import logo from './../assets/img/consumer_wordmark.svg';
import { Link, redirect, useNavigate } from 'react-router-dom';

function AppLayout({ children }) {

    const tawkMessengerRef          =   useRef();
    const url = "#"
    return (<>
    <div className='container-fluid'>
            <header className="row">
                <nav className="navbar navbar-expand-lg  p15">
                    <div className="container">
                        <Link to={url} className="navbar-brand" >
                            <img src={logo} alt="Logo" width="100" style={{}}  className="d-inline-block align-text-top" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end header_menu" id="navbarNavDropdown">
                            <ul className="nav navbar-nav ">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to={url} role="button" data-bs-toggle="dropdown" aria-expanded="false">Products</Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#">Buy/Sell Cryptocurrency</Link></li>
                                        <li><Link className="dropdown-item" to="#">Coinbase Pro</Link></li>
                                        <li><Link className="dropdown-item" to="#">Coinbase Prime</Link></li>
                                        <li><Link className="dropdown-item" to="#">Developer Platform</Link></li>
                                        <li><Link className="dropdown-item" to="#">Coinbase Commerce</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={url}>Help</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={url}>Prices</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={url}>Sign In</Link>
                                </li>
                                <li className="nav-item pe0 me0">
                                    <Link className="nav-link border border-1 fs18 px22" to={url}>Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='row'>
                    <div className='col-sm-12 text-center'>
                        <h1 className='h3 mt60'>Sign in to Coinbase</h1>
                    </div>
                </div>
            </header>
        </div>
        {children}
        <div className='container'>
            <div className='row'>
                <div className='mt10 text-center'>
                    <Link href="#" className='text-white text-decoration-none'>Forgot Password?</Link>
                    <Link href="#" className='text-white text-decoration-none ms20'> Don't have an account? </Link>
                    <Link href="#" className='text-white text-decoration-none ms20'> Privacy policy</Link>
                    <div className='text-center py10'>
                        <Link href="#" className='text-white text-decoration-none ms20'> Have an issue with two factor authentication ?</Link>
                    </div>
                </div>
            </div>
        </div>
        <TawkMessengerReact
            propertyId="667ef8d49d7f358570d499cf"
            widgetId="1i1fvo0j1"
            ref={tawkMessengerRef}
        />
    </>)
}

export default AppLayout
