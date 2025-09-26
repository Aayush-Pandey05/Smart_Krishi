import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SoilHealth from './pages/SoilHealth';
import CostCalculator from './pages/CostCalculator';
import IrrigationAdvisor from './pages/IrrigationAdvisor'
import FertilizerGuide from './pages/FertilizerGuide'
import DiseaseDetection from './pages/DiseaseDetection'
import Feature from './pages/Feature'
import MarketDashboard from './pages/MarketDashboard';
import Signup from './pages/SignUp';
import Login from './pages/Login';

const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/soilhealth' element={<SoilHealth/>}/>
        <Route path='/costcal' element={<CostCalculator/>}/>
        <Route path='/irrigation' element={<IrrigationAdvisor/>}/>
        <Route path='/fertilizer' element={<FertilizerGuide/>}/>
        <Route path='/disease' element={<DiseaseDetection/>}/>
        <Route path='/features' element={<Feature/>}/>
        <Route path='/marketdashboard' element={<MarketDashboard/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
