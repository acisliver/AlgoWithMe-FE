import React from 'react';
import ProblemListHeader from '../../UI/molecules/Problem/ProblemListHeader'
import ProblemList from '../../UI/molecules/Problem/ProblemList'
import Navbar from '../../UI/molecules/Navigation/Navbar'
import Footer from '../../UI/molecules/Navigation/Footer'


const index = () => 
<div>
    <Navbar/>
    <ProblemListHeader/>
    <ProblemList/>
    <Footer/>
    
</div>;

export default index;
