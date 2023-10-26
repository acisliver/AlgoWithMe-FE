import React from 'react';
import ProblemListHeader from '../../UI/molecules/Problem/ProblemListHeader'
import ProblemList from '../../UI/molecules/Problem/ProblemList'
import Navbar from '../../UI/molecules/Navigation/Navbar'
import Footer from '../../UI/molecules/Navigation/Footer'


const index = () => 
<div className='min-h-screen w-full flex flex-col'>
    <Navbar/>

    <div className='flex-grow flex flex-col  justify-center'>
        <ProblemListHeader/>
        <ProblemList/>
    </div>
     
    <Footer/>
</div>;
// const index = () => 
// <div className='min-h-screen w-full flex flex-col'>
//     <Navbar/>

//     <div className='flex-grow flex flex-col items-center justify-center'>
//         <ProblemListHeader/>
//         <ProblemList/>
//     </div>
     
//     <Footer/>
// </div>;


export default index;
